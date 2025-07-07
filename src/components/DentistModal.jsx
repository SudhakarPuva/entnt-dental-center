import React from "react";

const DentistModal = ({ dentist, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md animate-fade-in"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-blue-700">Dr. {dentist.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 text-xl">
            ✖
          </button>
        </div>

        <div className="text-center">
          <img
            src={dentist.avatar}
            alt={dentist.name}
            className="w-40 h-40  object-cover mx-auto mb-3 border-4 border-blue-300"
          />
          <p className="text-sm text-gray-600 mb-2">{dentist.specialization}</p>

          <ul className="text-left text-sm text-gray-700 space-y-1">
            <li><strong>Experience:</strong> {dentist.experience} years</li>
            <li><strong>Success Rate:</strong> {dentist.successRate}%</li>
            {dentist.latestOps && (
              <li><strong>Latest Ops:</strong> {dentist.latestOps}</li>
            )}
            <li><strong>Contact:</strong> {dentist.contact}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DentistModal;
