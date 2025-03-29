import React, { useState } from "react";
import { adminApi } from "../../config/axios";
import ClassesList from "./ClassesList";
import ClassCalendar from "./Calendar";
import { motion } from "framer-motion";
import "./ClassForm.css";

const ClassForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    start_time: "",
    end_time: "",
    color: "#3498db",
    frequency: "one-time",
    subscription_required: false,
    frequency_start_date: "",
    frequency_end_date: ""
  });

  const [refreshCalendar, setRefreshCalendar] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
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
          <input
            type="text"
            name="name"
            placeholder="Class Name"
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <input
            type="datetime-local"
            name="start_time"
            onChange={handleChange}
            required
          />
          <input
            type="datetime-local"
            name="end_time"
            onChange={handleChange}
            required
          />

          <label className="color-label">
            Select Class Color:
            <input
              type="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
            />
          </label>

          <select name="frequency" onChange={handleChange}>
            <option value="one-time">One-time</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>

          {formData.frequency !== "one-time" && (
            <>
              <input
                type="date"
                name="frequency_start_date"
                placeholder="Start of Recurrence"
                value={formData.frequency_start_date}
                onChange={handleChange}
                required
              />
              <input
                type="date"
                name="frequency_end_date"
                placeholder="End of Recurrence"
                value={formData.frequency_end_date}
                onChange={handleChange}
                required
              />
            </>
          )}

          <label className="checkbox-label">
            <input
              type="checkbox"
              name="subscription_required"
              onChange={handleChange}
            />
            Subscription Required
          </label>
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

      <ClassCalendar refreshCalendar={refreshCalendar} />
      <ClassesList refreshCalendar={refreshCalendar} />
    </motion.div>
  );
};

export default ClassForm;
