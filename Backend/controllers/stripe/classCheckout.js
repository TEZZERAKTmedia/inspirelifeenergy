const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { buildStripeLineItems } = require('./shared');

const createClassCheckoutSession = async (req, res) => {
  const { classId, className, classPrice, userId } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: buildStripeLineItems([
        { name: className, price: classPrice, thumbnail: '', quantity: 1 }
      ]),
      success_url: `${process.env.USER_FRONTEND}/class-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.USER_FRONTEND}/class-cancel`,
      metadata: {
        type: 'class',
        classId,
        userId,
      },
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating class checkout:", error);
    res.status(500).json({ message: 'Failed to create class checkout session', error: error.message });
  }
};

module.exports = { createClassCheckoutSession };
