const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Cart = require('../../models/cart');
const Product = require('../../models/product');
const sequelize = require('../../config/database');
const { buildStripeLineItems } = require('./shared');

const createProductCheckoutSession = async (req, res) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: "Unauthorized: User not found." });
  }

  const transaction = await sequelize.transaction();
  const userId = req.user.id;

  try {
    // 🛒 Fetch cart items with product info
    const cartItems = await Cart.findAll({
      where: { userId },
      include: [{
        model: Product,
        as: 'product',
        attributes: ['id', 'name', 'price', 'thumbnail', 'quantity'],
      }],
      lock: transaction.LOCK.UPDATE,
      transaction,
    });

    if (!cartItems.length) {
      await transaction.rollback();
      return res.status(400).json({ message: 'No items in cart' });
    }

    // 🧼 Process cart and validate
    const validCartItems = await Promise.all(
      cartItems.map(async (item) => {
        const product = item.product;

        if (!product || !product.id) return null;

        // ✅ Check stock
        const dbProduct = await Product.findByPk(product.id, { transaction });
        if (!dbProduct || item.quantity > dbProduct.quantity) return null;

        return {
          productId: product.id,
          name: product.name,
          price: product.price,
          thumbnail: product.thumbnail,
          quantity: item.quantity,
        };
      })
    ).then(items => items.filter(Boolean));

    if (!validCartItems.length) {
      await transaction.rollback();
      return res.status(400).json({ message: 'Error processing cart items' });
    }

    // 🧾 Build Stripe line items
    const lineItems = buildStripeLineItems(validCartItems);

    // 🧾 Create Stripe session
    const expiresAt = Math.floor(Date.now() / 1000) + 5 * 60;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      expires_at: expiresAt,
      success_url: `${process.env.USER_FRONTEND}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.USER_FRONTEND}/cancel`,
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['US'],
      },
      metadata: {
        type: 'product',
        userId: `${userId}`,
        productIds: validCartItems.map((item) => item.productId).join(','),
      },
    });

    await transaction.commit();

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    await transaction.rollback();
    console.error('❌ Product checkout error:', error);
    res.status(500).json({ message: 'Failed to create product checkout session', error: error.message });
  }
};

module.exports = { createProductCheckoutSession };
