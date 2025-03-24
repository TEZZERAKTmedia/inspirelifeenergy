import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { registerApi } from '../../config/axios';
import './Home.css';
import ClassesList from '../Sessions/Classes';

/* Import images */
import heroImage from '../../assets/inspired-life.webp';
import dirtImage from '../../assets/dirt.webp'
;import oneOnOneImage from '../../assets/one-on-one.webp';
import couplesImage from '../../assets/couples.webp';
import groupImage from '../../assets/group.webp';

/* Other components */
import SocialLinks from '../../Components/navbar/socialLinks';

const Home = () => {
  const [availableSessions, setAvailableSessions] = useState([]);
  const [upcomingEvent, setUpcomingEvent] = useState(null);

  // Framer Motion hooks for scroll-based fade-out
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    fetchAvailableSessions();
    fetchUpcomingEvent();
  }, []);

  const fetchAvailableSessions = async () => {
    try {
      const response = await registerApi.get('/sessions/available');
      setAvailableSessions(response.data);
    } catch (error) {
      console.error('Error fetching available sessions:', error);
    }
  };

  const fetchUpcomingEvent = async () => {
    try {
      const response = await registerApi.get('/events/upcoming');
      setUpcomingEvent(response.data);
    } catch (error) {
      console.error('Error fetching upcoming event:', error);
    }
  };

  return (
    <div className="home-container">
      {/* Hero Image + Overlay */}
      <div className="top-image-container">
        <img src={heroImage} className="inspired-image" alt="Inspired Life" />
        <motion.div
          className="hero-overlay-content"
          style={{ opacity: heroOpacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="hero-overlay-title">Living life inspired…</h1>
          <p className="hero-overlay-text">
            We believe the power to live a fulfilling and healthy life is within you.
            Our mission is to enhance the quality of life of individuals and communities.
          </p>
          <div className='button-border'>
          <Link to="/sessions" className="hero-btn">Book a Session</Link>
          </div>
          
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <ClassesList />
        {/* Sessions Section */}
        <motion.section
          className="sessions-types-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="section-title">Explore Our Sessions</h2>
          <div className="session-types-container">
            <div className="session-type">
              <img
                src={oneOnOneImage}
                alt="One-on-One Sessions"
                className="session-type-image"
              />
              <h3>One-on-One Sessions</h3>
              <p>
                Personalized yoga sessions tailored exclusively for you, 
                offering individual guidance and focused attention to enhance your practice.
              </p>
              <div className='button-border'>
              <Link to="/sessions/oneonone" className="session-btn">Learn More</Link>
              </div>
            </div>

            <div className="session-type">
              <img
                src={couplesImage}
                alt="Couples Sessions"
                className="session-type-image"
              />
              <h3>Couples Sessions</h3>
              <p>
                Shared yoga experiences designed for two, perfect for partners or friends 
                aiming to deepen connection through mindful movement.
              </p>
              <div className='button-border'>
              <Link to="/sessions/couples" className="session-btn">Learn More</Link>
              </div>
              
            </div>

            <div className="session-type">
              <img
                src={groupImage}
                alt="Group & Team Sessions"
                className="session-type-image"
              />
              <h3>Group & Team Sessions</h3>
              <p>
                Engaging group yoga classes perfect for teams, events, and communities looking 
                to grow stronger together physically and mentally.
              </p>
              <div className='button-border'>
              <Link to="/sessions/group" className="session-btn">Learn More</Link>
              </div>
              
            </div>
          </div>
          <p>No matter your experience, every lesson is designed for your unique needs.</p>
          <div className="button-border">
          <Link to="/booking" className="session-btn">
            Explore Sessions
          </Link>
          </div>
        </motion.section>

        {/* Example Additional Section */}
        <motion.section className="sessions-types-section">
          <h2>Embrace Groundedness, Cultivate Healing</h2>
          <img
                src={dirtImage}
                alt="human-holding-dirt"
                className="session-type-image-dirt"
              />
          <p>
            Just as the earth nurtures life from humble soil, grounding ourselves reconnects 
            us to our true nature and inner strength. At Inspired Life, we believe in the 
            transformative power of grounding practices to foster deep healing, invigorate 
            energy, and restore balance.
          </p>
          <h3>Grounded. Energized. Healed.</h3>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          className="contact-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="section-title">Stay Connected</h2>
          <p className="contact-description">
            Join our community and get updates on upcoming sessions.
          </p>
          <SocialLinks />
        </motion.section>
      </div>
    </div>
  );
};

export default Home;
