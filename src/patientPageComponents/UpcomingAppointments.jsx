import React from "react";
import { motion } from "framer-motion";
import { FaCalendarPlus } from "react-icons/fa";

const UpcomingAppointments = ({ appointments = [] }) => {
  const upcoming = appointments.filter((a) => new Date(a.date) >= new Date());

  const handleAddToCalendar = (appt) => {
    // Simple download iCal file simulation
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${appt.treatmentType} with ${appt.dentist}
DTSTART:${new Date(appt.date).toISOString().replace(/[-:]/g, "").split(".")[0]}Z
DTEND:${new Date(new Date(appt.date).getTime() + 30 * 60000).toISOString().replace(/[-:]/g, "").split(".")[0]}Z
DESCRIPTION:Appointment with ${appt.dentist}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "appointment.ics";
    link.click();
  };

  return (
    <section className="mb-8">
      <h3 className="text-xl font-semibold text-blue-700 mb-4">📅 Upcoming Appointments</h3>
      {upcoming.length === 0 ? (
        <p className="text-gray-500">You have no upcoming appointments.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {upcoming.map((appt, index) => (
            <motion.div
              key={index}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-all border border-blue-100"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-gray-500">🕒 {new Date(appt.date).toLocaleString()}</p>
                  <p className="font-semibold text-blue-700">{appt.treatmentType}</p>
                  <p className="text-sm text-gray-600">🧑‍⚕️ {appt.dentist}</p>
                  <p className="text-sm text-gray-600">
                    Status:{" "}
                    <span className={`font-medium ${
                      appt.completed ? "text-green-600" : "text-yellow-500"
                    }`}>
                      {appt.completed ? "Completed" : "Pending"}
                    </span>
                  </p>
                </div>
                <button
                  onClick={() => handleAddToCalendar(appt)}
                  title="Add to calendar"
                  className="text-blue-600 hover:text-blue-800 text-xl"
                >
                  <FaCalendarPlus />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default UpcomingAppointments;
