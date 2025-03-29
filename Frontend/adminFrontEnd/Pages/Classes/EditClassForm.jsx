import React, { useState, useEffect } from "react";
import { adminApi } from "../../config/axios";
import "./EditClassForm.css"; 

// Helper functions to format date/time for input fields
const formatDatetimeLocal = (datetime) => {
  if (!datetime) return "";
  const dt = new Date(datetime);
  // Returns "YYYY-MM-DDTHH:MM"
  return dt.toISOString().slice(0, 16);
};

const formatDate = (date) => {
  if (!date) return "";
  const dt = new Date(date);
  // Returns "YYYY-MM-DD"
  return dt.toISOString().slice(0, 10);
};

const EditClassForm = ({ classData, onClose, onClassUpdated }) => {
  // Initialize state with properly formatted date/time strings for inputs
  const [formData, setFormData] = useState({
    ...classData,
    start_time: formatDatetimeLocal(classData.start_time),
    end_time: formatDatetimeLocal(classData.end_time),
    // For date fields (if used)
    class_date: classData.class_date ? formatDate(classData.class_date) : "",
    frequency_start_date: classData.frequency_start_date ? formatDate(classData.frequency_start_date) : "",
    frequency_end_date: classData.frequency_end_date ? formatDate(classData.frequency_end_date) : ""
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await adminApi.put(`/admin-classes/${classData.id}`, formData);
      onClassUpdated();
      onClose();
    } catch (error) {
      console.error("Error updating class:", error);
      alert("Failed to update class.");
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await adminApi.delete(`/admin-classes/${classData.id}`);
      onClassUpdated();
      onClose();
    } catch (error) {
      console.error("Error deleting class", error);
      alert("Failed to delete class.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Class</h2>
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            value={formData.price || ""}
            onChange={handleChange}
            required
          />
          <input
            type="datetime-local"
            name="start_time"
            value={formData.start_time || ""}
            onChange={handleChange}
            required
          />
          <input
            type="datetime-local"
            name="end_time"
            value={formData.end_time || ""}
            onChange={handleChange}
            required
          />
          {/* If your model still uses class_date for one-time events, otherwise remove */}
          <input
            type="date"
            name="class_date"
            value={formData.class_date || ""}
            onChange={handleChange}
            required
          />

          {/* Color Picker */}
          <label>
            Select Class Color:
            <input
              type="color"
              name="color"
              value={formData.color || "#3498db"}
              onChange={handleChange}
            />
          </label>

          {/* You may also include frequency start/end dates if applicable */}
          {formData.frequency !== "one-time" && (
            <>
              <input
                type="date"
                name="frequency_start_date"
                value={formData.frequency_start_date || ""}
                onChange={handleChange}
                required
              />
              <input
                type="date"
                name="frequency_end_date"
                value={formData.frequency_end_date || ""}
                onChange={handleChange}
                required
              />
            </>
          )}

          <button type="submit">Save Changes</button>
        </form>
        
        <button className="delete-btn" onClick={handleDeleteClick}>Delete</button>
        <button onClick={onClose}>Close</button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Are you sure you want to delete this class?</h3>
            <p>This action cannot be undone.</p>
            <button className="confirm-delete" onClick={confirmDelete}>Delete</button>
            <button className="cancel-delete" onClick={() => setShowDeleteModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditClassForm;
