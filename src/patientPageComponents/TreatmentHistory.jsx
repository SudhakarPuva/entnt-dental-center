import React, { useState } from "react";
import { motion } from "framer-motion";

const TreatmentHistory = ({ appointments = [] }) => {
  const history = appointments.filter((a) => new Date(a.date) < new Date());

  const [previewFile, setPreviewFile] = useState(null);

  return (
    <motion.div
      className="bg-white shadow rounded-lg p-6 mb-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-lg font-semibold text-blue-700 mb-4">
        📖 Treatment History
      </h3>

      {history.length === 0 ? (
        <p className="text-gray-500">No history found.</p>
      ) : (
        <div className="space-y-4">
          {history.map((appt, index) => (
            <details
              key={index}
              className="border rounded-md p-4 bg-white shadow-sm group"
            >
              <summary className="cursor-pointer font-semibold text-blue-600">
                {new Date(appt.date).toLocaleDateString()} - {appt.treatmentType}
              </summary>

              <div className="mt-2 text-sm space-y-1 text-gray-700">
                <p>
                  <strong>Dentist:</strong> Dr. {appt.dentist}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {appt.completed ? "✅ Completed" : "⏳ Pending"}
                </p>
                <p>
                  <strong>Cost:</strong> ₹{appt.cost || "—"}
                </p>
                <p>
                  <strong>Comments:</strong> {appt.comments || "—"}
                </p>

                {/* File attachments */}
                {appt.files && appt.files.length > 0 && (
                  <div>
                    <p className="font-medium mt-2">📂 Attachments:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                      {appt.files.map((file, i) => (
                        <img
                          key={i}
                          src={file}
                          alt={`file-${i}`}
                          className="h-24 w-full object-cover rounded cursor-pointer hover:scale-105 transition"
                          onClick={() => setPreviewFile(file)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </details>
          ))}
        </div>
      )}

      {/* Fullscreen preview modal */}
      {previewFile && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={() => setPreviewFile(null)}
        >
          <img
            src={previewFile}
            alt="Preview"
            className="max-w-full max-h-[80vh] rounded-lg border-4 border-white shadow-lg"
          />
        </div>
      )}
    </motion.div>
  );
};

export default TreatmentHistory;
