import React, { useState } from "react";
import { adminApi } from "../../config/axios";
import ClassesList from './ClassesList';
import ClassCalendar from "./Calendar";

const ClassForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    start_time: "",
    end_time: "",
    class_date: "",
    color: "#3498db", // Default color
    frequency: "one-time",
    subscription_required: false,
  });

  const [refreshCalendar, setRefreshCalendar] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await adminApi.post("/admin-classes", formData);
      alert("Class created successfully!");
      setRefreshCalendar((prev) => !prev);
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
        <input type="date" name="class_date" onChange={handleChange} required />
        
        {/* Color Picker */}
        <label>
          Select Class Color:
          <input type="color" name="color" value={formData.color} onChange={handleChange} />
        </label>

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

      <ClassCalendar refreshCalendar={refreshCalendar} />
      <ClassesList refreshCalendar={refreshCalendar} />
    </div>
  );
};

export default ClassForm;
