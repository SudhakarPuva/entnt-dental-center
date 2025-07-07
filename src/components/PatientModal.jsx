import React, { useState, useEffect } from "react";
import "./modalAnimations.css";

const PatientModal = ({ onClose, onSave, patient }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    dob: "",
    phone: "",
    healthInfo: "",
  });

  useEffect(() => {
    if (patient) {
      setForm({
        name: patient.name || "",
        email: patient.email || "",
        dob: patient.dob || "",
        phone: patient.phone || "",
        healthInfo: patient.healthInfo || "",
      });
    }
  }, [patient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return alert("Name and Email are required.");
    const newPatient = {
      ...form,
      role: "Patient",
    };
    onSave(newPatient);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content animate-slide-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-blue-700">
            {patient ? "Edit Patient" : "Add Patient"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-500 text-xl"
          >
            ✖
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <input
            name="email"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            readOnly={!!patient}
            className={`w-full border px-3 py-2 rounded ${
              patient ? "bg-gray-100 text-gray-500" : ""
            }`}
          />
          <input
            name="dob"
            type="date"
            value={form.dob}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            name="phone"
            placeholder="Contact Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <textarea
            name="healthInfo"
            placeholder="Health Info"
            value={form.healthInfo}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default PatientModal;
