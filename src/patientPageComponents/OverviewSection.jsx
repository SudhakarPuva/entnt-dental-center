import React from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";

const OverviewSection = ({ user, appointments = [], onBookAppointment }) => {
  const upcoming = appointments.filter((a) => new Date(a.date) >= new Date());
  const lastTreatment = appointments
    .filter((a) => a.completed)
    .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

  const nextAppointment = upcoming.sort((a, b) => new Date(a.date) - new Date(b.date))[0];

  return (
    <motion.div
      className="bg-white rounded-lg shadow p-6 mb-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-blue-700">Welcome, {user.name} 👋</h2>
          <p className="text-gray-500 text-sm">Patient ID: {user.id || user.email}</p>
        </div>
        <img
          src={user.avatar || "https://i.pravatar.cc/100"}
          alt="avatar"
          className="w-14 h-14 rounded-full border object-cover"
        />
      </div>

      {appointments.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-3">You haven’t booked any appointments yet.</p>
          <button
            onClick={onBookAppointment}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            + Book Your First Appointment
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded shadow-sm">
              <p className="text-gray-500 text-sm">Last Treatment</p>
              <p className="font-semibold text-blue-800 mt-1">
                {lastTreatment?.treatmentType || "—"} -{" "}
                {lastTreatment ? format(new Date(lastTreatment.date), "MMMM yyyy") : "N/A"}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded shadow-sm">
              <p className="text-gray-500 text-sm">Next Appointment</p>
              <p className="font-semibold text-green-700 mt-1">
                {nextAppointment
                  ? `In ${Math.ceil(
                      (new Date(nextAppointment.date) - new Date()) / (1000 * 60 * 60 * 24)
                    )} day(s) at ${new Date(nextAppointment.date).toLocaleTimeString()}`
                  : "None scheduled"}
              </p>
            </div>
          </div>

          {/* Reminder banner */}
          {nextAppointment && (
            <motion.div
              className="bg-yellow-100 text-yellow-900 border-l-4 border-yellow-400 p-4 mt-5 rounded shadow"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Reminder: Your next appointment is scheduled on{" "}
              <strong>{new Date(nextAppointment.date).toLocaleString()}</strong> with{" "}
              <strong>Dr. {nextAppointment.dentist}</strong>.
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default OverviewSection;
