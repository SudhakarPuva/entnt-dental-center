import React, { useState } from "react";
import "./modalAnimations.css";

const IncidentListModal = ({ appointmentId, existingIncidents, onSave, onClose }) => {
  const [incidents, setIncidents] = useState(existingIncidents || []);
  const [editingIncident, setEditingIncident] = useState(null);

  const handleDelete = (id) => {
    const updated = incidents.filter((i) => i.id !== id);
    setIncidents(updated);
    onSave(appointmentId, updated);
  };

  const handleEditChange = (e, field) => {
    setEditingIncident({ ...editingIncident, [field]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    const fileReaders = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(fileReaders).then((base64Files) => {
      setEditingIncident({
        ...editingIncident,
        files: [...(editingIncident.files || []), ...base64Files],
      });
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updated = incidents.map((i) =>
      i.id === editingIncident.id ? editingIncident : i
    );
    setIncidents(updated);
    onSave(appointmentId, updated);
    setEditingIncident(null);
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 rounded-lg shadow-lg animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-blue-700">📋 Incidents</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-red-500 text-xl">
            ✖
          </button>
        </div>

        {incidents.length === 0 ? (
          <p className="text-gray-500">No incidents recorded for this appointment.</p>
        ) : (
          <div className="space-y-4 text-sm">
            {incidents.map((inc, index) => (
              <div key={inc.id} className="border rounded p-4 bg-gray-50 relative">
                <p><strong>Title:</strong> {inc.title}</p>
                <p><strong>Description:</strong> {inc.description}</p>
                <p><strong>Comments:</strong> {inc.comments}</p>
                <p><strong>Date:</strong> {new Date(inc.datetime).toLocaleString()}</p>
                <p><strong>Treatment:</strong> {inc.treatment}</p>
                <p><strong>Cost:</strong> ₹{inc.cost}</p>
                <p><strong>Status:</strong> {inc.status}</p>
                <p><strong>Next Appointment:</strong> {inc.nextAppointment}</p>

                {inc.files?.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {inc.files.map((f, i) => (
                      <img
                        key={i}
                        src={f}
                        alt="file"
                        className="w-full h-20 object-cover rounded border"
                      />
                    ))}
                  </div>
                )}

                <div className="mt-3 flex space-x-3">
                  <button
                    onClick={() => setEditingIncident(inc)}
                    className="text-yellow-600 hover:underline text-xs"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(inc.id)}
                    className="text-red-600 hover:underline text-xs"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Inline Edit Form */}
        {editingIncident && (
          <form onSubmit={handleEditSubmit} className="mt-6 space-y-4 text-sm bg-yellow-50 p-4 rounded shadow">
            <h3 className="text-blue-700 font-semibold">Edit Incident</h3>
            <input
              className="w-full border px-3 py-2 rounded"
              value={editingIncident.title}
              onChange={(e) => handleEditChange(e, "title")}
              placeholder="Title"
              required
            />
            <textarea
              className="w-full border px-3 py-2 rounded"
              value={editingIncident.description}
              onChange={(e) => handleEditChange(e, "description")}
              placeholder="Description"
            />
            <textarea
              className="w-full border px-3 py-2 rounded"
              value={editingIncident.comments}
              onChange={(e) => handleEditChange(e, "comments")}
              placeholder="Comments"
            />
            <input
              type="datetime-local"
              className="w-full border px-3 py-2 rounded"
              value={editingIncident.datetime}
              onChange={(e) => handleEditChange(e, "datetime")}
            />
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={editingIncident.treatment}
              onChange={(e) => handleEditChange(e, "treatment")}
              placeholder="Treatment"
            />
            <input
              type="number"
              className="w-full border px-3 py-2 rounded"
              value={editingIncident.cost}
              onChange={(e) => handleEditChange(e, "cost")}
              placeholder="Cost"
            />
            <input
              type="date"
              className="w-full border px-3 py-2 rounded"
              value={editingIncident.nextAppointment}
              onChange={(e) => handleEditChange(e, "nextAppointment")}
            />
            <select
              className="w-full border px-3 py-2 rounded"
              value={editingIncident.status}
              onChange={(e) => handleEditChange(e, "status")}
            >
              <option value="Pending">⏳ Pending</option>
              <option value="Ongoing">⚙️ Ongoing</option>
              <option value="Completed">✅ Completed</option>
            </select>

            <input type="file" multiple onChange={handleFileChange} />
            {editingIncident.files?.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-2">
                {editingIncident.files.map((f, i) => (
                  <img
                    key={i}
                    src={f}
                    alt="upload"
                    className="h-20 w-full object-cover rounded border"
                  />
                ))}
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Save Changes
              </button>
              <button
                type="button"
                className="ml-2 text-sm text-red-500"
                onClick={() => setEditingIncident(null)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default IncidentListModal;
