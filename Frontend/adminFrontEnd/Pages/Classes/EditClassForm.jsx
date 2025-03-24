import React, { useState } from "react";
import { adminApi } from "../../config/axios";
import "./EditClassForm.css"; 

const EditClassForm = ({ classData, onClose, onClassUpdated }) => {
    const [formData, setFormData] = useState({ ...classData });
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
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    <input type="number" name="price" value={formData.price} onChange={handleChange} required />
                    <input type="datetime-local" name="start_time" value={formData.start_time} onChange={handleChange} required />
                    <input type="datetime-local" name="end_time" value={formData.end_time} onChange={handleChange} required />
                    <input type="date" name="class_date" value={formData.class_date} onChange={handleChange} required />

                    {/* Color Picker */}
                    <label>
                      Select Class Color:
                      <input type="color" name="color" value={formData.color} onChange={handleChange} />
                    </label>

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
