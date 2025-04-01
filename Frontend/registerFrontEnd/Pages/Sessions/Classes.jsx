import React, { useState, useEffect } from 'react';
import { registerApi } from '../../config/axios'; // Custom axios instance
import './Classes.css'; // Import the CSS

const ClassesList = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await registerApi.get('/register-classes');
      if (response.data.success) {
        setClasses(response.data.classes);
      } else {
        throw new Error('Server responded with success=false');
      }
    } catch (err) {
      console.error('Error fetching classes:', err);
      setError('Failed to fetch classes. Please try again later.');
    }
  };

  const handlePurchase = async () => {
    try {
      const response = await registerApi.post('/register-checkout/create-register-onetime-checkout', {
        classId: selectedClass.id,
      });

      if (response.data.url) {
        window.location.href = response.data.url; // Redirect to Stripe Checkout
      } else {
        alert('Unable to start checkout. Please try again.');
      }
    } catch (err) {
      console.error('Stripe Checkout Error:', err);
      alert('An error occurred. Try again later.');
    }
  };

  return (
    <div className="classes-list-container">
      <h2>Available Classes</h2>

      {error && <div className="classes-error">{error}</div>}

      {classes.length === 0 ? (
        <p>No classes available at the moment.</p>
      ) : (
        <ul className="classes-ul">
          {classes.map((classItem) => (
            <li
              key={classItem.id}
              onClick={() => setSelectedClass(classItem)}
              className="class-item"
            >
              <strong>
                {new Date(classItem.start_time).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </strong>
            </li>
          ))}
        </ul>
      )}

      {/* Modal */}
      {selectedClass && (
        <div
          className="class-modal-overlay"
          onClick={() => setSelectedClass(null)}
        >
          <div
            className="class-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className='modal-item'>{selectedClass.name}</h2>
            <p className='modal-item'>{selectedClass.description}</p>
            {/* Refactored: Compute date from start_time */}
            <p className='modal-item'>
              Date: {new Date(selectedClass.start_time).toLocaleDateString()}
            </p>
            <p className='modal-item'>
              Time:{' '}
              {new Date(selectedClass.start_time).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}{' '}
              -{' '}
              {new Date(selectedClass.end_time).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
            <p className='modal-item'>Price: ${selectedClass.price}</p>

            <div className="modal-buttons">
              <button onClick={handlePurchase}>Purchase</button>
              <button onClick={() => setSelectedClass(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassesList;
