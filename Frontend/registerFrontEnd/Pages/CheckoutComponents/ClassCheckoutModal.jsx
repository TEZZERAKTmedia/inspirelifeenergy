import React from 'react';
import { useCheckout } from '../Context/checkoutContext';
import { motion } from 'framer-motion';
import './Modal.css';

const ClassCheckoutModal = ({ isOpen, onClose, checkoutData }) => {
  const { createCheckoutSession } = useCheckout();

  const handleCheckout = async () => {
    try {
      const sessionData = await createCheckoutSession('class', checkoutData);
      console.log("Class checkout session created:", sessionData);
      // Optionally redirect or handle session data here
      onClose();
    } catch (error) {
      console.error("Error processing class checkout:", error);
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
        <h2>Continue to Class Checkout</h2>
        <p>Please review your class details before proceeding.</p>
        <button onClick={handleCheckout}>Continue to Checkout</button>
        <button onClick={onClose}>Cancel</button>
      </motion.div>
    </div>
  );
};

export default ClassCheckoutModal;
