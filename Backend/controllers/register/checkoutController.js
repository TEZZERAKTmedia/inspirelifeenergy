// controllers/registerCheckoutController.js
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// Suppose we have a "Class" model for one-time register purchases
const Class = require('../../models/classes');

const createRegisterOneTimeCheckout = async (req, res) => {
  try {
    const { classId } = req.body;
    // Lookup the class (one-time purchase item)
    const classItem = await Class.findByPk(classId);
    if (!classItem) {
      return res.status(404).json({ error: 'Class not found' });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: classItem.name },
            unit_amount: parseInt(classItem.price * 100), 
          },
          quantity: 1,
        },
      ],
      success_url: 'https://yourdomain.com/register-success',
      cancel_url: 'https://yourdomain.com/register-cancel',
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe Error (Register One-Time):', err);
    res.status(500).json({ error: 'Could not create one-time checkout session.' });
  }
};

const createRegisterSubscriptionCheckout = async (req, res) => {
  try {
    const { subscriptionPlanId } = req.body;
    // Maybe you store subscription plan info in DB or environment variable
    // For this example, let's assume a single price ID from Stripe
    const planPriceId = 'price_XXXXXXXX'; // from your Stripe dashboard

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: planPriceId, quantity: 1 }],
      success_url: 'https://yourdomain.com/register-sub-success',
      cancel_url: 'https://yourdomain.com/register-sub-cancel',
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe Error (Register Subscription):', err);
    res.status(500).json({ error: 'Could not create subscription checkout session.' });
  }
};

module.exports = {
    createRegisterOneTimeCheckout,
    createRegisterSubscriptionCheckout
}