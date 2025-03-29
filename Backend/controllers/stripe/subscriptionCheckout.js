const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createSubscriptionCheckoutSession = async (req, res) => {
  const { priceId, userId } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.USER_FRONTEND}/sub-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.USER_FRONTEND}/sub-cancel`,
      metadata: {
        type: 'subscription',
        userId,
      },
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating subscription checkout:", error);
    res.status(500).json({ message: 'Failed to create subscription checkout session', error: error.message });
  }
};

module.exports = { createSubscriptionCheckoutSession };
