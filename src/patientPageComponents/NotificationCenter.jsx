import React from "react";
import { motion } from "framer-motion";
import "../patientPageComponents/modalAnimations.css";

const NotificationCenter = ({ onClose, appointments = [] }) => {
  const today = new Date().toDateString();
  const upcoming = appointments.filter(
    (a) => new Date(a.date).toDateString() === today
  );

  const generalNotifications = [
    ...(
      upcoming.length
        ? [`📅 You have ${upcoming.length} appointment${upcoming.length > 1 ? "s" : ""} today.`]
        : []
    ),
    "🦷 Don't forget to floss today!",
    "🪥 It's been a while since your last check-up.",
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        className="bg-white w-full max-w-md p-6 rounded shadow-lg relative animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-blue-700">🔔 Notifications</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-500 text-xl"
          >
            ✖
          </button>
        </div>

        <ul className="space-y-3 text-sm text-gray-700">
          {generalNotifications.map((note, i) => (
            <li key={i} className="border-b pb-2 last:border-none">
              {note}
            </li>
          ))}
        </ul>

        <div className="mt-4 text-right">
          <button
            onClick={onClose}
            className="text-sm text-blue-600 hover:underline"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotificationCenter;
