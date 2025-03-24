import React, { useState, useEffect } from "react";
import { adminApi } from "../../config/axios";
import EditClassForm from "./EditClassForm";
import "./ClassCalendar.css"; 

const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

const ClassCalendar = ({ refreshCalendar }) => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetchClasses();
  }, [currentMonth, currentYear, refreshCalendar]);

  const fetchClasses = async () => {
    try {
      const response = await adminApi.get("/admin-classes");
      setClasses(response.data.classes);
    } catch (error) {
      console.error("Error fetching classes", error);
    }
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="calendar-container">
      <h2>Class Schedule</h2>
      <div className="calendar-grid">
        {Array.from({ length: firstDay }).map((_, index) => (
          <div key={`empty-${index}`} className="calendar-cell empty"></div>
        ))}
        {daysArray.map((day) => (
          <div key={day} className="calendar-cell">
            <div className="date">{day}</div>
            {classes
              .filter((cls) => new Date(cls.class_date).getDate() === day)
              .map((cls) => (
                <div 
                  key={cls.id} 
                  className="class-item"
                  style={{ backgroundColor: cls.color || "#3498db" }}
                  onClick={() => setSelectedClass(cls)}
                >
                  {cls.name}
                </div>
              ))}
          </div>
        ))}
      </div>
      {selectedClass && (
        <EditClassForm classData={selectedClass} onClose={() => setSelectedClass(null)} onClassUpdated={fetchClasses} />
      )}
    </div>
  );
};

export default ClassCalendar;
