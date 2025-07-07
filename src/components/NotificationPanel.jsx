import React, { useEffect, useState } from "react";
import "./NotificationPanel.css"; // for animations

const NotificationPanel = ({ onClose }) => {
  const [appointmentsToday, setAppointmentsToday] = useState([]);
  const [newUsersToday, setNewUsersToday] = useState([]);
  const [payments, setPayments] = useState([]);
  const [operations, setOperations] = useState([]);

  useEffect(() => {
    const allAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");
    const allUsers = JSON.parse(localStorage.getItem("users") || "[]");

    const todayStr = new Date().toDateString();

    setAppointmentsToday(
      allAppointments.filter(
        (a) => new Date(a.date).toDateString() === todayStr
      )
    );

    setNewUsersToday(
      allUsers.filter(
      (u) =>
      u.role === "Patient" &&
      new Date(u.createdAt || u.timestamp || Date.now()).toDateString() === todayStr
    ));
    setPayments(
      allAppointments.filter(
        (a) =>
          a.paid &&
          new Date(a.paymentUpdatedAt || 0).toDateString() === todayStr
      )
    );

    setOperations(
      allAppointments.filter(
        (a) =>
          a.completed &&
          new Date(a.completionUpdatedAt || 0).toDateString() === todayStr
      )
    );


  }, []);

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-white w-full max-w-md mx-4 rounded-lg shadow-lg p-6 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-blue-700">🔔 Notifications</h2>
          <button className="text-gray-600 hover:text-red-500 text-xl" onClick={onClose}>
            ✖
          </button>
        </div>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          <Section title="📅 New Appointments Today" items={appointmentsToday.map((a) => a.title)} />
          <Section title="🧑‍💻 New Signups" items={newUsersToday.map((u) => u.name)} />
          <Section title="💸 Payments Done" items={payments.map((a) => a.title)} />
          <Section title="🏥 Operations Completed" items={operations.map((a) => a.title)} />
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, items }) => (
  <div>
    <h4 className="text-blue-600 font-medium">{title}</h4>
    {items.length === 0 ? (
      <p className="text-sm text-gray-500 italic">No updates</p>
    ) : (
      <ul className="list-disc ml-6 text-sm text-gray-700">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    )}
  </div>
);

export default NotificationPanel;
