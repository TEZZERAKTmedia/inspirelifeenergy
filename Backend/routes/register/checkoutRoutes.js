// routes/registerCheckoutRoutes.js
const express = require('express');
const router = express.Router();
const {
  createRegisterOneTimeCheckout,
  createRegisterSubscriptionCheckout,
} = require('../../controllers/register/checkoutController');

// One-time purchase route
router.post('/create-register-onetime-checkout', createRegisterOneTimeCheckout);

// Subscription route
router.post('/create-register-subscription-checkout', createRegisterSubscriptionCheckout);

module.exports = router;
