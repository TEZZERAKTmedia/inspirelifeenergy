import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AcceptPrivacyTerms.css";

const AcceptPrivacyTerms = () => {
  const navigate = useNavigate();
  const bottomRef = useRef(null);

  const [bottomReached, setBottomReached] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setBottomReached(true);
        }
      },
      { threshold: 1.0 }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) observer.unobserve(bottomRef.current);
    };
  }, []);

  const handleContinue = () => {
    // after acceptance, redirect to booking form
    navigate("/booking");
  };

  return (
    <div className="accept-privacy-container">
      <h2>Privacy Policy & Terms of Service</h2>
      <div className="privacy-terms-scrollable">
        <p>
          {/* Insert your entire policy or import from a component */}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit...
        </p>
        {/* ... more paragraphs ... */}
        <div ref={bottomRef} style={{ height: "1px" }}></div>
      </div>

      <button
        disabled={!bottomReached}
        onClick={handleContinue}
        className="privacy-accept-button"
      >
        {bottomReached ? "I Accept, Continue" : "Scroll to Bottom to Continue"}
      </button>
    </div>
  );
};

export default AcceptPrivacyTerms;
