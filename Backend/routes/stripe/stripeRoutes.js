const express = require('express');
const router = express.Router();

const { refundPayment} = require('../../controllers/stripe/refund');
const {createSubscriptionCheckoutSession} = require('../../controllers/stripe/subscriptionCheckout');
const { createProductCheckoutSession} = require('../../controllers/stripe/productCheckout');
const { createClassCheckoutSession} = require('../../controllers/stripe/classCheckout');

// 💳 One-time product purchase
router.post('/checkout/product', createProductCheckoutSession);

// 📅 One-time class booking
router.post('/checkout/class', createClassCheckoutSession);

// 🔁 Subscription
router.post('/checkout/subscription', createSubscriptionCheckoutSession);

// 💸 Refund
router.post('/refund', refundPayment);

// 📜 Stripe event logs (optional)


module.exports = router;
