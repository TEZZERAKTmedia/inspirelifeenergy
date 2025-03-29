const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const refundPayment = async (req, res) => {
  const { paymentIntentId } = req.body;

  if (!paymentIntentId) {
    return res.status(400).json({ message: 'Missing paymentIntentId' });
  }

  try {
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
    });

    res.status(200).json({
      message: 'Refund processed successfully',
      refund,
    });
  } catch (error) {
    console.error('❌ Error processing refund:', error);
    res.status(500).json({
      message: 'Failed to process refund',
      error: error.message,
    });
  }
};

module.exports = { refundPayment };
