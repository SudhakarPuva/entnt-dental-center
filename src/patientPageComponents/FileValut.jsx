import React, { useState } from "react";
import { toast } from "react-toastify";

const FileVault = ({ files = [], onUpload }) => {
  const [preview, setPreview] = useState(null);

  const handleUpload = (fileBase64) => {
    const allAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const patientAppointments = allAppointments.filter(a => a.patientEmail === user.email);
    if (patientAppointments.length === 0) {
      toast.error("No appointments found to link the file.");
      return;
    }

    const latest = patientAppointments.sort((a, b) => new Date(b.date) - new Date(a.date))[0];

    const updatedAppointments = allAppointments.map((appt) => {
      if (appt.id === latest.id) {
        const updatedFiles = [...(appt.files || []), { file: fileBase64, uploadedBy: "Patient" }];
        return { ...appt, files: updatedFiles };
      }
      return appt;
    });

    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
    toast.success("📁 File uploaded and linked to your latest appointment!");
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-blue-700 mb-2">📂 File Vault</h3>
      <div className="bg-white p-4 rounded shadow">
        <div className="mb-3">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              const reader = new FileReader();
              reader.onloadend = () => {
                handleUpload(reader.result);
              };
              if (file) reader.readAsDataURL(file);
            }}
          />
        </div>

        {files.length === 0 ? (
          <p className="text-gray-500 text-sm">No uploaded files.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {files.map((f, i) => {
              const src = typeof f === "string" ? f : f.file;
              return (
                <img
                  key={i}
                  src={src}
                  alt="upload"
                  className="w-full h-24 object-cover rounded shadow hover:scale-105 transition cursor-pointer"
                  onClick={() => setPreview(src)}
                />
              );
            })}
          </div>
        )}

        {preview && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setPreview(null)}
          >
            <img
              src={preview}
              alt="preview"
              className="max-w-[90%] max-h-[80vh] border-4 border-white rounded"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FileVault;
