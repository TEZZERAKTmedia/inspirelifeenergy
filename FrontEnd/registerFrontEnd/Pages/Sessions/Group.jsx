import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import groupImage from '../../assets/group.webp';
import './Sessions.css';

const GroupTeam = () => {
  return (
    <motion.div
      className="session-detail-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Hero / Header Section */}
      <div className="session-hero">
        <img src={groupImage} alt="Group & Team Session" className="session-hero-image" />
        <h1 className="session-hero-title">Group & Team Sessions</h1>
        <div className='button-border'>
        <Link to="/booking?session=group" className="book-now-btn">Reserve a Group Session</Link>
        </div>
        
      </div>

      {/* Main Content */}
      <div className="session-content">
        <p>
          Perfect for team-building events, retreats, or community gatherings,
          our Group & Team Yoga Sessions help establish unity through movement
          and mindfulness. Strengthen the bond among participants while everyone
          enjoys a rejuvenating collective experience.
        </p>
        <ul>
          <li>Ideal for corporate groups, sports teams, and social clubs</li>
          <li>Customizable themes (e.g., stress relief, resilience, creativity)</li>
          <li>Can be held at your location or virtually</li>
          <li>Fosters collaboration, motivation, and team spirit</li>
        </ul>
        
        <h3>Building Stronger Teams, One Pose at a Time</h3>
        <p>
          Empower your group to develop new communication skills and interpersonal 
          trust. Experience yoga’s calming effects together, discovering a collective 
          sense of balance and rejuvenation.
        </p>

        
      </div>
    </motion.div>
  );
};

export default GroupTeam;
