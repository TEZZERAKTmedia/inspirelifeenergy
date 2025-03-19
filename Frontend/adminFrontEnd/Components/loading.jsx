// src/components/LoadingPage.js
import React from 'react';
import loadingAnimation from '../assets/loading.gif';
import '../Componentcss/loading-page.css';

const LoadingPage = () => {
  return (
    <div className='loading-overlay'>
    <div className="loading-page"  >
      <div className='loading-section'>
      <img className="animation" src={loadingAnimation} alt="Loading animation" />
      <p>Loading, please wait...</p>
      </div>
    </div>
    </div>
  );
};

export default LoadingPage;
