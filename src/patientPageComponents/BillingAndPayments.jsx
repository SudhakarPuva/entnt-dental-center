import React from "react";

const BillingAndPayments = ({ appointments }) => {
  const paid = appointments.filter((a) => a.paid);
  const unpaid = appointments.filter((a) => !a.paid);
  const total = paid.reduce((acc, a) => acc + (parseFloat(a.cost) || 0), 0);

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-blue-700 mb-2">💳 Billing & Payments</h3>
      <div className="bg-white p-4 rounded shadow space-y-2">
        <p><strong>Total Spent:</strong> ₹{total.toFixed(2)}</p>
        {appointments.length === 0 ? (
          <p className="text-gray-500 text-sm">No billing data yet.</p>
        ) : (
          <>
            <div className="text-sm font-medium text-gray-700">Payment History:</div>
            <ul className="text-sm text-gray-700 space-y-1">
              {appointments.map((a, i) => (
                <li key={i} className="border-b py-1 flex justify-between items-center">
                  <span>{new Date(a.date).toLocaleDateString()} - {a.treatmentType}</span>
                  <span className={`text-sm ${a.paid ? "text-green-600" : "text-red-500"}`}>
                    ₹{a.cost || 0} ({a.paid ? "Paid" : "Unpaid"})
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default BillingAndPayments;
