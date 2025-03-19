import React, { useState } from "react";
import { Link } from "react-router-dom";
import PrivacyPolicy from "../../../Components/Privacy&Terms/privacyPolicy";
import TermsOfService from "../../../Components/Privacy&Terms/termsOfService";
import { registerApi } from "../../../config/axios";
import "./booking-form.css";

const BookingFormWithPolicies = () => {
  // Booking Form Fields
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sessionType, setSessionType] = useState("");

  // States for toggles
  const [isPolicyChecked, setIsPolicyChecked] = useState(false);
  const [isToSChecked, setIsToSChecked] = useState(false);

  // States for modals
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const [isToSModalOpen, setIsToSModalOpen] = useState(false);

  // Track if user scrolled to bottom in each modal
  const [isPolicyScrolledToBottom, setIsPolicyScrolledToBottom] = useState(false);
  const [isToSScrolledToBottom, setIsToSScrolledToBottom] = useState(false);

  // For potential error display
  const [error, setError] = useState(null);

  // -- Booking form submit logic --
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!isPolicyChecked || !isToSChecked) {
      setError("You must agree to both Privacy Policy and Terms of Service first.");
      return;
    }

    // You can do your actual booking logic or API calls here
    try {
      // Example: call an API endpoint
      console.log("Submitting booking with:", { email, name, phone, sessionType });
      // await registerApi.post("/some-booking-endpoint", { email, name, phone, sessionType });
      alert("Booking submitted successfully!");
    } catch (err) {
      setError("Failed to submit booking form.");
    }
  };

  // Toggle handler for privacy policy
  const handlePolicyToggle = () => {
    if (isPolicyChecked) {
      // If toggled off after being on, set to false
      setIsPolicyChecked(false);
    } else {
      // If toggled on from off, open modal
      setIsPolicyModalOpen(true);
      setIsPolicyScrolledToBottom(false);
    }
  };

  // Toggle handler for terms of service
  const handleToSToggle = () => {
    if (isToSChecked) {
      setIsToSChecked(false);
    } else {
      setIsToSModalOpen(true);
      setIsToSScrolledToBottom(false);
    }
  };

  // If user clicks "Agree" on modals
  const handleAgreePolicy = () => {
    setIsPolicyChecked(true);
    setIsPolicyModalOpen(false);
  };
  const handleAgreeToS = () => {
    setIsToSChecked(true);
    setIsToSModalOpen(false);
  };

  // If user clicks "I Don't Agree" or closes
  const handleDisagree = () => {
    // Just close the modal and do NOT check the toggle
    setIsPolicyModalOpen(false);
    setIsToSModalOpen(false);
  };

  return (
    <div className="booking-form-container">
      <h2>Enter Your Information</h2>
      {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Phone</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <label>Session Type</label>
        <select
          value={sessionType}
          onChange={(e) => setSessionType(e.target.value)}
          required
        >
          <option value="">--Select a Session--</option>
          <option value="oneOnOne">One-on-One</option>
          <option value="couples">Couples</option>
          <option value="group">Group/Team</option>
        </select>

        {/* Toggle Switches */}
        <div className="toggle-row">
          <span>Privacy Policy</span>
          <div
            className={`toggle-container ${isPolicyChecked ? "checked" : ""}`}
            onClick={handlePolicyToggle}
          >
            <div className="toggle-handle"></div>
          </div>
        </div>

        <div className="toggle-row">
          <span>Terms of Service</span>
          <div
            className={`toggle-container ${isToSChecked ? "checked" : ""}`}
            onClick={handleToSToggle}
          >
            <div className="toggle-handle"></div>
          </div>
        </div>

        <button 
          type="submit"
          disabled={!isPolicyChecked || !isToSChecked}
          className="submit-booking-btn"
        >
          Submit Booking
        </button>

        <Link to="/sessions" style={{ marginTop: '20px', display: 'inline-block' }}>
          Back to sessions
        </Link>
      </form>

      {/* Privacy Modal */}
      {isPolicyModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <PrivacyPolicy
              onReachBottom={() => setIsPolicyScrolledToBottom(true)}
            />
            <div className="modal-buttons">
              <button
                onClick={handleAgreePolicy}
                disabled={!isPolicyScrolledToBottom}
              >
                {isPolicyScrolledToBottom ? "Agree" : "Scroll to Bottom to Agree"}
              </button>
              <button onClick={handleDisagree}>I Don't Agree</button>
            </div>
          </div>
        </div>
      )}

      {/* Terms Modal */}
      {isToSModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <TermsOfService
              onReachBottom={() => setIsToSScrolledToBottom(true)}
            />
            <div className="modal-buttons">
              <button
                onClick={handleAgreeToS}
                disabled={!isToSScrolledToBottom}
              >
                {isToSScrolledToBottom ? "Agree" : "Scroll to Bottom to Agree"}
              </button>
              <button onClick={handleDisagree}>I Don't Agree</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingFormWithPolicies;
