import React, { useState } from "react";
import {adminApi} from "../config/axios";

const ClassForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    start_time: "",
    end_time: "",
    date: "",
    duration: "",
    frequency: "one-time",
    subscription_required: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await adminApi.post("/admin-classes", formData);
      alert("Class created successfully!");
    } catch (error) {
      console.error("Error creating class:", error);
    }
  };

  return (
    <div>
      <h2>Create a New Class</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Class Name" onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
        <input type="datetime-local" name="start_time" onChange={handleChange} required />
        <input type="datetime-local" name="end_time" onChange={handleChange} required />
        <input type="date" name="date" onChange={handleChange} required />
        <select name="frequency" onChange={handleChange}>
          <option value="one-time">One-time</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        <label>
          <input type="checkbox" name="subscription_required" onChange={handleChange} />
          Subscription Required
        </label>
        <button type="submit">Create Class</button>
      </form>
    </div>
  );
};

export default ClassForm;
