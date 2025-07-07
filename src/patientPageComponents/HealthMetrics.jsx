import React from "react";

const HealthMetrics = ({ appointments }) => {
  const visits = appointments.length;
  const treatments = [...new Set(appointments.map((a) => a.treatmentType))];

  return (
    <div className="mb-10">
      <h3 className="text-lg font-semibold text-blue-700 mb-2">📊 Health Metrics</h3>
      <div className="bg-white p-4 rounded shadow space-y-2 text-sm">
        <p><strong>Total Visits:</strong> {visits}</p>
        <p><strong>Treatments Taken:</strong> {treatments.join(", ") || "—"}</p>
        <p><strong>Tip:</strong> Regular cleaning is recommended every 6 months.</p>
      </div>
    </div>
  );
};

export default HealthMetrics;
