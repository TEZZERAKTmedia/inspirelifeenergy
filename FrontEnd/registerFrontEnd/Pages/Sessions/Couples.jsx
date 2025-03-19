import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import couplesImage from '../../assets/couples.webp';
import './Sessions.css';

const Couples = () => {
  return (
    <motion.div 
      className="session-detail-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Hero / Header Section */}
      <div className="session-hero">
        <img src={couplesImage} alt="Couples Session" className="session-hero-image" />
        <h1 className="session-hero-title">Couples Sessions</h1>
        <Link to="/booking?session=couples" className="book-now-btn">Book Your Couples Session</Link>
      </div>

      {/* Main Content */}
      <div className="session-content">
        <p>
          Our Couples Yoga Sessions are a wonderful way to connect with your partner
          or friend on a deeper level. These sessions foster trust, communication, and 
          mutual support, creating a shared experience that strengthens both body and bond.
        </p>
        <ul>
          <li>Guided partner poses and synchronized flows</li>
          <li>Reinforce emotional intimacy and physical harmony</li>
          <li>Suitable for all skill levels</li>
          <li>In-person and virtual options available</li>
        </ul>
        
        <h3>Grow Together, Flow Together</h3>
        <p>
          Experience a meaningful yoga journey side-by-side. Learn breathing techniques 
          and poses that highlight unity, trust, and patience, enhancing your relationship 
          on and off the mat.
        </p>

       
      </div>
    </motion.div>
  );
};

export default Couples;
