import React from 'react';
import { useCheckout } from '../Context/checkoutContext';
import { motion } from 'framer-motion';
import './Modal.css'; // Include your modal styling

const ProductCheckoutModal = ({ isOpen, onClose, checkoutData }) => {
  const { createCheckoutSession } = useCheckout();

  const handleCheckout = async () => {
    try {
      const sessionData = await createCheckoutSession('product', checkoutData);
      console.log("Product checkout session created:", sessionData);
      // You can also redirect the user here if needed
      onClose();
    } catch (error) {
      console.error("Error processing product checkout:", error);
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
        <h2>Continue to Product Checkout</h2>
        <p>Please review your order details before proceeding.</p>
        <button onClick={handleCheckout}>Continue to Checkout</button>
        <button onClick={onClose}>Cancel</button>
      </motion.div>
    </div>
  );
};

export default ProductCheckoutModal;
