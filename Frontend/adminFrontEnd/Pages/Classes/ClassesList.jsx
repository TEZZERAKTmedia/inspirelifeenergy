import React, { useEffect, useState } from 'react';
import { adminApi } from '../../config/axios';
import LoadingPage from '../../Components/loading';
import EditClassForm from './EditClassForm';
import "./ClassesList.css"; // Include styles for modal and grid

const ClassList = ({ refreshCalendar }) => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null); // For editing
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteClassId, setDeleteClassId] = useState(null);

  useEffect(() => {
    fetchClasses();
  }, [refreshCalendar]); // Reload when refreshCalendar updates

  const fetchClasses = async () => {
    try {
      const response = await adminApi.get('/admin-classes');
      setClasses(response.data.classes);
    } catch (error) {
      console.error("Error fetching classes", error);
      setError("Failed to load classes. Please try again later");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteClassId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await adminApi.delete(`/admin-classes/${deleteClassId}`);
      setClasses(classes.filter(cls => cls.id !== deleteClassId));
      refreshCalendar(prev => !prev); // Trigger calendar refresh
    } catch (error) {
      console.error("Error deleting class", error);
      alert("Failed to delete class.");
    } finally {
      setShowDeleteModal(false);
      setDeleteClassId(null);
    }
  };

  if (loading) return <LoadingPage />;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Available Classes</h2>
      {classes.length === 0 ? (
        <p>No classes available</p>
      ) : (
        <ul className="class-list">
          {classes.map((classItem) => (
            <li 
              key={classItem.id} 
              className="class-item" 
              // Set the parent's background to the class color
              style={{ backgroundColor: classItem.color || "#4caf50" }}
            >
              <div onClick={() => setSelectedClass(classItem)} className="class-details">
                <h3 className='h3-class-details'>{classItem.name}</h3>
                <p>
                  <strong>Date:</strong>{" "}
                  {classItem.class_date ? new Date(classItem.class_date).toLocaleDateString() : "N/A"}
                </p>
                <p>
                  <strong>Time:</strong>{" "}
                  {classItem.start_time ? new Date(classItem.start_time).toLocaleString() : "N/A"}
                </p>
                <p>
                  <strong>Price:</strong> ${classItem.price ?? "N/A"}
                </p>
                <p>
                  <strong>Frequency:</strong> {classItem.frequency}
                </p>
                {classItem.frequency !== "one-time" && (
                  <>
                    <p>
                      <strong>Recurrence Start:</strong>{" "}
                      {classItem.frequency_start_date ? new Date(classItem.frequency_start_date).toLocaleDateString() : "N/A"}
                    </p>
                    <p>
                      <strong>Recurrence End:</strong>{" "}
                      {classItem.frequency_end_date ? new Date(classItem.frequency_end_date).toLocaleDateString() : "N/A"}
                    </p>
                  </>
                )}
                <button 
                  className="class-list-delete-btn" 
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent opening edit form
                    handleDeleteClick(classItem.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Edit Form Modal */}
      {selectedClass && (
        <EditClassForm 
          classData={selectedClass} 
          onClose={() => setSelectedClass(null)} 
          onClassUpdated={fetchClasses} 
        />
      )}

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

export default ClassList;
