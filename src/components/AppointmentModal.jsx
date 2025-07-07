import React, { useState, useEffect } from "react";
import "./modalAnimations.css";

const AppointmentModal = ({ onClose, onSave, appointment, patients, dentists }) => {
  const [form, setForm] = useState({
    id: Date.now(),
    patientEmail: "",
    dentist: "",
    treatmentType: "",
    title: "",
    date: "",
    completed: false,
    paid: false,
  });

  useEffect(() => {
    if (appointment) {
      setForm(appointment);
    }
  }, [appointment]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.patientEmail || !form.dentist || !form.treatmentType || !form.date) {
      return alert("All fields are required.");
    }
    onSave(form);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content animate-slide-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-blue-700">
            {appointment ? "Edit Appointment" : "Add Appointment"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-500 text-xl"
          >
            ✖
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <select
            name="patientEmail"
            value={form.patientEmail}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">Select Patient</option>
            {patients.map((p, i) => (
              <option key={i} value={p.email}>
                {p.name} ({p.email})
              </option>
            ))}
          </select>

          <select
            name="dentist"
            value={form.dentist}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">Assign Dentist</option>
            {dentists.map((d, i) => (
              <option key={i} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>

          <input
            name="treatmentType"
            placeholder="Treatment Type"
            value={form.treatmentType}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />

          <input
            name="title"
            placeholder="Optional Title"
            value={form.title}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />

          <input
            name="date"
            type="datetime-local"
            value={form.date}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />

          <div className="flex items-center space-x-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="completed"
                checked={form.completed}
                onChange={handleChange}
              />
              Completed
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="paid"
                checked={form.paid}
                onChange={handleChange}
              />
              Paid
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Save Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;
