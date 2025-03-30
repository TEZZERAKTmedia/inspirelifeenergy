import React, { useState } from "react";
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
    <div className="edit-class-modal">
      <div className="edit-class-modal-content">
        <h2>Edit Class</h2>
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label htmlFor="edit-class-name">Class Name:</label>
            <input
              id="edit-class-name"
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="edit-class-price">Price:</label>
            <input
              id="edit-class-price"
              type="number"
              name="price"
              value={formData.price || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="edit-class-start_time">Start Time:</label>
            <input
              id="edit-class-start_time"
              type="datetime-local"
              name="start_time"
              value={formData.start_time || ""}
              onChange={handleChange}
              required
            />
 
            <label htmlFor="edit-class-end_time">End Time:</label>
            <input
              id="edit-class-end_time"
              type="datetime-local"
              name="end_time"
              value={formData.end_time || ""}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group color-group">
            <label htmlFor="edit-class-color">Select Class Color:</label>
            <input
              id="edit-class-color"
              type="color"
              name="color"
              value={formData.color || "#3498db"}
              onChange={handleChange}
            />
          </div>
          {formData.frequency !== "one-time" && (
            <>
              <div className="form-group">
                <label htmlFor="edit-class-frequency_start_date">Start of Recurrence:</label>
                <input
                  id="edit-class-frequency_start_date"
                  type="date"
                  name="frequency_start_date"
                  value={formData.frequency_start_date || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit-class-frequency_end_date">End of Recurrence:</label>
                <input
                  id="edit-class-frequency_end_date"
                  type="date"
                  name="frequency_end_date"
                  value={formData.frequency_end_date || ""}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}
          <button className="edit-class-btn" type="submit">Save Changes</button>
        </form>
        
        <button className="edit-class-delete-btn" onClick={handleDeleteClick}>Delete</button>
        <button className="edit-class-btn" onClick={onClose}>Close</button>
      </div>

      {showDeleteModal && (
        <div className="edit-class-modal">
          <div className="edit-class-modal-content">
            <h3>Are you sure you want to delete this class?</h3>
            <p>This action cannot be undone.</p>
            <button className="edit-class-confirm-delete" onClick={confirmDelete}>Delete</button>
            <button className="edit-class-cancel-delete" onClick={() => setShowDeleteModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditClassForm;
