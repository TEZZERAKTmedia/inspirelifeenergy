import React, { useState } from "react";
import { adminApi } from "../../config/axios";
import ClassesList from "./ClassesList";
import ClassCalendar from "./Calendar";
import { motion } from "framer-motion";
import "./ClassForm.css";

// Helper to get current date and time formatted for datetime-local inputs
const getCurrentDateTimeLocal = () => {
  const now = new Date();
  // Adjust to local time by subtracting the timezone offset
  const offset = now.getTimezoneOffset();
  const localDate = new Date(now.getTime() - offset * 60 * 1000);
  // Format as "YYYY-MM-DDTHH:MM"
  return localDate.toISOString().slice(0, 16);
};

const ClassForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    start_time: getCurrentDateTimeLocal(),
    end_time: getCurrentDateTimeLocal(),
    color: "#3498db",
    frequency: "one-time",
    // Change from boolean to string so we can store "class" or "subscription"
    subscription_required: "class", 
    frequency_start_date: "",
    frequency_end_date: ""
  });

  const [refreshCalendar, setRefreshCalendar] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // For radio buttons (and checkboxes) and other inputs
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that price is a valid number
    const priceValue = parseFloat(formData.price);
    if (isNaN(priceValue)) {
      alert("Please enter a valid price.");
      return;
    }

    const dataToSend = {
      ...formData,
      price: priceValue, // now a number
    };

    // For one-time classes, remove recurrence fields
    if (formData.frequency === "one-time") {
      delete dataToSend.frequency_start_date;
      delete dataToSend.frequency_end_date;
    }

    console.log("Submitting data:", dataToSend);

    try {
      await adminApi.post("/admin-classes", dataToSend);
      alert("Class created successfully!");
      setRefreshCalendar((prev) => !prev);
    } catch (error) {
      console.error("Error creating class:", error);
    }
  };

  return (
    <motion.div 
      className="class-form-container"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2>Create a New Class</h2>
      <form className="class-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name">Class Name:</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Class Name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input
              id="price"
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="start_time">Start Time:</label>
            <input
              id="start_time"
              type="datetime-local"
              name="start_time"
              value={formData.start_time}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="end_time">End Time:</label>
            <input
              id="end_time"
              type="datetime-local"
              name="end_time"
              value={formData.end_time}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group color-group">
            <label htmlFor="color">Select Class Color:</label>
            <input
              id="color"
              type="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
            />
          </div>

          <div className="form-group frequency-group">
            <label htmlFor="frequency">Frequency:</label>
            <select
              id="frequency"
              name="frequency"
              onChange={handleChange}
              value={formData.frequency}
            >
              <option value="one-time">One-time</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>

            {formData.frequency !== "one-time" && (
              <>
                <div className="form-group">
                  <label htmlFor="frequency_start_date">Start of Recurrence:</label>
                  <input
                    id="frequency_start_date"
                    type="date"
                    name="frequency_start_date"
                    placeholder="Start of Recurrence"
                    value={formData.frequency_start_date}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="frequency_end_date">End of Recurrence:</label>
                  <input
                    id="frequency_end_date"
                    type="date"
                    name="frequency_end_date"
                    placeholder="End of Recurrence"
                    value={formData.frequency_end_date}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}
          </div>

          <div className="form-group subscription-group">
            <label>Delivery Type:</label>
            <div className="toggle-group">
              <input
                type="radio"
                id="option-class"
                name="subscription_required"
                value="class"
                checked={formData.subscription_required === "class"}
                onChange={handleChange}
              />
              <label htmlFor="option-class" className="toggle-option">
                Class
              </label>

              <input
                type="radio"
                id="option-subscription"
                name="subscription_required"
                value="subscription"
                checked={formData.subscription_required === "subscription"}
                onChange={handleChange}
              />
              <label htmlFor="option-subscription" className="toggle-option">
                Subscription
              </label>
            </div>
          </div>
        </div>

        <motion.button 
          type="submit"
          className="submit-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Create Class
        </motion.button>
      </form>
      <div>
        <h2>Calendar</h2>
        <ClassCalendar refreshCalendar={refreshCalendar} />
      </div>
      <ClassesList refreshCalendar={refreshCalendar} />
    </motion.div>
  );
};

export default ClassForm;
