import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";


const CalendarSection = ({ appointments }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const appointmentsOnDate = appointments.filter(
    (a) =>
      new Date(a.date).toDateString() === new Date(selectedDate).toDateString()
  );

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold text-blue-700 mb-4">📅 Appointment Calendar</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar */}
        <Calendar
          value={selectedDate}
          onChange={setSelectedDate}
          tileContent={({ date, view }) => {
            const isAppointment = appointments.some(
              (appt) => new Date(appt.date).toDateString() === date.toDateString()
            );
            return view === "month" && isAppointment ? (
              <div className="dot-indicator" />
            ) : null;
          }}
        />

        {/* Appointments List */}
        <div className="border p-4 rounded bg-gray-50">
          <h3 className="text-md font-semibold text-blue-600 mb-2">
            Appointments on {selectedDate.toDateString()}
          </h3>
          {appointmentsOnDate.length === 0 ? (
            <p className="text-gray-500 text-sm">No appointments scheduled.</p>
          ) : (
            <ul className="space-y-3 text-sm">
              {appointmentsOnDate.map((appt, index) => (
                <li
                  key={index}
                  className="p-3 border rounded bg-white shadow-sm hover:shadow-md transition"
                >
                  <p><strong>Treatment:</strong> {appt.treatmentType}</p>
                  <p><strong>Dentist:</strong> {appt.dentist}</p>
                  <p><strong>Time:</strong> {new Date(appt.date).toLocaleTimeString()}</p>
                  <p><strong>Status:</strong> {appt.completed ? "✅ Completed" : "⏳ Pending"}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarSection;
