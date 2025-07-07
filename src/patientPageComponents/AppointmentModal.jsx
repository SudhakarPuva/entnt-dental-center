import React, { useState } from "react";
import { motion } from "framer-motion";
import "../patientPageComponents/modalAnimations.css";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const AppointmentModal = ({ onClose, user }) => {
  const [form, setForm] = useState({
    id: Date.now(),
    patientEmail: user.email,
    treatmentType: "",
    title: "",
    date: "",
    paid: false,
    completed: false,
  });

  const handleSave = () => {
    const appointments = JSON.parse(localStorage.getItem("appointments") || "[]");
    localStorage.setItem("appointments", JSON.stringify([...appointments, form]));
    onClose();
    toast.success(" Appointment booked successfully!");

  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center" onClick={onClose}>
      <motion.div
        className="bg-white w-full max-w-md p-6 rounded shadow-lg animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-blue-700">Book Appointment</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 text-xl">✖</button>
        </div>

        <div className="space-y-4 text-sm">
          <input
            type="text"
            placeholder="Treatment (e.g., Cleaning, Braces)"
            value={form.treatmentType}
            onChange={(e) => setForm({ ...form, treatmentType: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Title / Reason"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="datetime-local"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AppointmentModal;
