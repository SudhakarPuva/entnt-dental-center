import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/modal.css";

const CalendarModal = ({ appointments, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal calendar-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Calendar View</h2>
        <Calendar
          tileContent={({ date }) => {
            const matches = appointments.filter(
              (a) => new Date(a.date).toDateString() === date.toDateString()
            );
            return matches.length > 0 ? (
              <div className="dot">{matches.length}</div>
            ) : null;
          }}
        />
        <button onClick={onClose} className="primary mt-4">Close</button>
      </div>
    </div>
  );
};

export default CalendarModal;
