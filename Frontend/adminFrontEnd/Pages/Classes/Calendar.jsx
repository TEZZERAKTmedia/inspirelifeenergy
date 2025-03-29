import React, { useState, useEffect } from "react";
import { adminApi } from "../../config/axios";
import EditClassForm from "./EditClassForm";
import { motion, AnimatePresence } from "framer-motion";
import "./ClassCalendar.css";

const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

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

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Helper to check if a class occurs on a given day
  const classOccursOnDay = (cls, day, month, year) => {
    const currentDate = new Date(year, month, day);

    if (cls.frequency === "one-time") {
      const occurrence = new Date(cls.start_time);
      return (
        occurrence.getFullYear() === year &&
        occurrence.getMonth() === month &&
        occurrence.getDate() === day
      );
    } else if (cls.frequency === "weekly") {
      if (!cls.frequency_start_date || !cls.frequency_end_date) return false;
      const startRecurrence = new Date(cls.frequency_start_date);
      const endRecurrence = new Date(cls.frequency_end_date);
      if (currentDate < startRecurrence || currentDate > endRecurrence) return false;
      const occurrence = new Date(cls.start_time);
      return currentDate.getDay() === occurrence.getDay();
    } else if (cls.frequency === "monthly") {
      if (!cls.frequency_start_date || !cls.frequency_end_date) return false;
      const startRecurrence = new Date(cls.frequency_start_date);
      const endRecurrence = new Date(cls.frequency_end_date);
      if (currentDate < startRecurrence || currentDate > endRecurrence) return false;
      const occurrence = new Date(cls.start_time);
      return currentDate.getDate() === occurrence.getDate();
    }
    return false;
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <motion.button 
          onClick={goToPreviousMonth}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ←
        </motion.button>
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={`${currentMonth}-${currentYear}`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
          >
            {monthNames[currentMonth]} {currentYear}
          </motion.div>
        </AnimatePresence>
        <motion.button 
          onClick={goToNextMonth}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          →
        </motion.button>
      </div>

      <div className="calendar-grid">
        {Array.from({ length: firstDay }).map((_, index) => (
          <div key={`empty-${index}`} className="calendar-cell empty"></div>
        ))}
        {daysArray.map((day) => (
          <div key={day} className="calendar-cell">
            <div className="date">{day}</div>
            {classes
              .filter((cls) => classOccursOnDay(cls, day, currentMonth, currentYear))
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
        <EditClassForm
          classData={selectedClass}
          onClose={() => setSelectedClass(null)}
          onClassUpdated={fetchClasses}
        />
      )}
    </div>
  );
};

export default ClassCalendar;
