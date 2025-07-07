import React, { useState, useEffect } from "react";
import "./modalAnimations.css";

const IncidentFormModal = ({ onClose, onSave, appointmentId }) => {
  const [incident, setIncident] = useState({
    title: "",
    description: "",
    comments: "",
    datetime: new Date().toISOString().slice(0, 16),
    cost: "",
    treatment: "",
    status: "Pending",
    nextAppointment: "",
    files: [],
  });

  const [filePreviews, setFilePreviews] = useState([]);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const base64Files = await Promise.all(
      files.map(
        (file) =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(file);
          })
      )
    );
    setIncident({ ...incident, files: base64Files });
    setFilePreviews(base64Files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newIncident = { ...incident, id: Date.now() };
    const allAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");
    const updatedAppointments = allAppointments.map((appt) => {
      if (appt.id === appointmentId) {
        const incidents = appt.incidents || [];
        return { ...appt, incidents: [...incidents, newIncident] };
      }
      return appt;
    });
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
    onSave(appointmentId, updatedAppointments.find((a) => a.id === appointmentId).incidents);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 rounded-lg shadow-lg animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-blue-700">Add Incident</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-500 text-xl"
          >
            ✖
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <input
            type="text"
            placeholder="Incident Title"
            value={incident.title}
            onChange={(e) => setIncident({ ...incident, title: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            required
          />

          <textarea
            placeholder="Description"
            value={incident.description}
            onChange={(e) => setIncident({ ...incident, description: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            rows={3}
          />

          <textarea
            placeholder="Comments"
            value={incident.comments}
            onChange={(e) => setIncident({ ...incident, comments: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            rows={2}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 mb-1">Appointment Date & Time</label>
              <input
                type="datetime-local"
                value={incident.datetime}
                onChange={(e) => setIncident({ ...incident, datetime: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Next Appointment</label>
              <input
                type="date"
                value={incident.nextAppointment}
                onChange={(e) => setIncident({ ...incident, nextAppointment: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Treatment"
              value={incident.treatment}
              onChange={(e) => setIncident({ ...incident, treatment: e.target.value })}
              className="w-full border px-3 py-2 rounded"
            />
            <input
              type="number"
              placeholder="Cost ₹"
              value={incident.cost}
              onChange={(e) => setIncident({ ...incident, cost: e.target.value })}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <select
            value={incident.status}
            onChange={(e) => setIncident({ ...incident, status: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="Pending">⏳ Pending</option>
            <option value="Ongoing">🔧 Ongoing</option>
            <option value="Completed">✅ Completed</option>
          </select>

          <div>
            <label className="block text-gray-600 mb-1">Upload Files (images/invoices)</label>
            <input type="file" multiple onChange={handleFileChange} />
            {filePreviews.length > 0 && (
              <div className="mt-3 grid grid-cols-3 gap-2">
                {filePreviews.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`preview-${i}`}
                    className="h-20 w-full object-cover rounded border"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
            >
              Save Incident
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IncidentFormModal;
