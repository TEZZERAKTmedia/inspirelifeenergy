import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import oneOnOneImage from '../../assets/one-on-one.webp';
import './Sessions.css';

const OneOnOne = () => {
  return (
    <motion.div 
      className="session-detail-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Hero / Header Section */}
      <div className="session-hero">
        <img src={oneOnOneImage} alt="One-on-One Session" className="session-hero-image" />
        <h1 className="session-hero-title">One-on-One Sessions</h1>
        <Link to="/booking?session=oneOnOne" className="book-now-btn">Book Your One-on-One</Link>
      </div>

      {/* Main Content */}
      <div className="session-content">
        <p>
          Our One-on-One Yoga Sessions are designed to provide individualized guidance,
          helping you deepen your practice at a comfortable pace. Whether you’re 
          a beginner seeking personalized attention or an experienced yogi 
          wanting to refine specific poses, these sessions can be customized 
          to meet your unique needs.
        </p>
        <ul>
          <li>Focused attention on your goals and posture corrections</li>
          <li>Flexible scheduling for busy lifestyles</li>
          <li>In-person availability in Grand Junction, CO</li>
          <li>Virtual sessions for those at a distance</li>
        </ul>
        
        <h3>Benefits of One-on-One Sessions</h3>
        <p>
          Experience a deeper level of awareness and growth with each session.
          Enjoy the personalized approach that fosters confidence, proper alignment,
          and an environment of calm reflection.
        </p>

        
      </div>
    </motion.div>
  );
};

export default OneOnOne;
