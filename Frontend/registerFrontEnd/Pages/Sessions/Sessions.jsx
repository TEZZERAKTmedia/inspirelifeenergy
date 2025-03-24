import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import oneOnOneImage from '../../assets/one-on-one.webp';
import couplesImage from '../../assets/couples.webp';
import groupImage from '../../assets/group.webp';
import Classes  from './Classes';
import './sessions-menu.css'; // Updated CSS import for clarity

const Sessions = () => {
  // Each card animation settings
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <motion.div 
      className="yoga-sessions-page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <section className="yoga-sessions-hero">
        <h1 className="yoga-sessions-hero-title">Our Yoga Sessions</h1>
        <p className="yoga-sessions-hero-subtitle">
          Choose the perfect session to match your goals & lifestyle
        </p>
      </section>
      <Classes />

      <motion.section
        className="yoga-sessions-types-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h2 className="yoga-section-title">Explore Our Sessions</h2>

        <div className="yoga-session-types-container">
          {/* One-on-One Card */}
          <motion.div
            className="yoga-session-type"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <img
              src={oneOnOneImage}
              alt="One-on-One Sessions"
              className="yoga-session-type-image"
            />
            <h3>One-on-One Sessions</h3>
            <p>
              Personalized yoga sessions tailored exclusively for you,
              offering individual guidance and focused attention to enhance your practice.
            </p>
            <p className="yoga-session-location-highlight">
              <strong>Located in Grand Junction, CO?</strong> We also offer convenient in-person sessions!
            </p>
            <Link to="/sessions/oneonone" className="yoga-session-btn">
              Learn More
            </Link>
          </motion.div>

          {/* Couples Card */}
          <motion.div
            className="yoga-session-type"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <img
              src={couplesImage}
              alt="Couples Sessions"
              className="yoga-session-type-image"
            />
            <h3>Couples Sessions</h3>
            <p>
              Shared yoga experiences designed for two, perfect for partners or friends
              aiming to deepen connection through mindful movement.
            </p>
            <Link to="/sessions/couples" className="yoga-session-btn">
              Learn More
            </Link>
          </motion.div>

          {/* Group & Team Card */}
          <motion.div
            className="yoga-session-type"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <img
              src={groupImage}
              alt="Group & Team Sessions"
              className="yoga-session-type-image"
            />
            <h3>Group & Team Sessions</h3>
            <p>
              Engaging group yoga classes perfect for teams, events, and communities
              looking to grow stronger together physically and mentally.
            </p>
            <Link to="/sessions/group" className="yoga-session-btn">
              Learn More
            </Link>
          </motion.div>
        </div>

        <p className="yoga-session-note">
          No matter your experience, every lesson is designed for your unique needs.
        </p>
       
      </motion.section>
    </motion.div>
  );
};

export default Sessions;
