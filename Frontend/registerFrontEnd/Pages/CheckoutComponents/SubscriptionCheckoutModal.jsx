import React from 'react';
import { useCheckout } from '../Context/checkoutContext';
import { motion } from 'framer-motion';
import './Modal.css';

const SubscriptionCheckoutModal = ({ isOpen, onClose, checkoutData }) => {
  const { createCheckoutSession } = useCheckout();

  const handleCheckout = async () => {
    try {
      const sessionData = await createCheckoutSession('subscription', checkoutData);
      console.log("Subscription checkout session created:", sessionData);
      // Optionally redirect or handle session data here
      onClose();
    } catch (error) {
      console.error("Error processing subscription checkout:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="checkout-modal-overlay">
      <motion.div 
        className="checkout-modal-content"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <h2>Continue to Subscription Checkout</h2>
        <p>Please review your subscription details before proceeding.</p>
        <button onClick={handleCheckout}>Continue to Checkout</button>
        <button onClick={onClose}>Cancel</button>
      </motion.div>
    </div>
  );
};

export default SubscriptionCheckoutModal;
