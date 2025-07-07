import React, { useEffect, useState } from "react";
import PatientSidebar from "../patientPageComponents/PatientSidebar";
import PatientTopbar from "../patientPageComponents/PatientTopbar";
import OverviewSection from "../patientPageComponents/OverviewSection";
import AppointmentModal from "../patientPageComponents/AppointmentModal";
import BillingAndPayments from "../patientPageComponents/BillingAndPayments";
import FeedbackSection from "../patientPageComponents/FeedbackSection";
import FileValut from "../patientPageComponents/FileValut";
import HealthMetrics from "../patientPageComponents/HealthMetrics";
import NotificationCenter from "../patientPageComponents/NotificationCenter";
import ProfileModal from "../patientPageComponents/ProfileModal";
import UpcomingAppointments from "../patientPageComponents/UpcomingAppointments";
import CalendarSection from "../patientPageComponents/CalendarSection";
import "../patientPageComponents/modalAnimations.css";
import 'react-toastify/dist/ReactToastify.css';

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showNotificationCenter, setShowNotificationCenter] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user") || "null");
    if (!stored || stored.role !== "Patient") {
      window.location.href = "/login";
    } else {
      setUser(stored);
    }

    const allAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");
    const myAppointments = allAppointments.filter(a => a.patientEmail === stored?.email);
    setAppointments(myAppointments);

    // 🔔 Trigger red blink only if today's appointment exists
    const unread = myAppointments.some(a =>
      new Date(a.date).toDateString() === new Date().toDateString()
    );
    setHasUnreadNotifications(unread);
  }, []);

  if (!user) return null;

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <PatientSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <PatientTopbar
          user={user}
          onProfileClick={() => setShowProfileModal(true)}
          onNotificationClick={() => setShowNotificationCenter(true)}
          onHamburgerClick={() => setSidebarOpen(true)}
          hasUnreadNotifications={hasUnreadNotifications}
        />

        {/* Content */}
        <main className="p-4 md:p-6 overflow-y-auto flex-1">
          {activeTab === "overview" && (
            <>
              <OverviewSection user={user} appointments={appointments} onBookAppointment={() => setShowAppointmentModal(true)}/>
              <UpcomingAppointments appointments={appointments} />
            </>
          )}
          {activeTab === "calendar" && ( <CalendarSection appointments={appointments} />)}
          {activeTab === "billing" && <BillingAndPayments appointments={appointments} user={user} />}
          {activeTab === "files" && <FileValut appointments={appointments} user={user} />}
          {activeTab === "feedback" && <FeedbackSection user={user} />}
          {activeTab === "health" && <HealthMetrics appointments={appointments} user={user} />}


        </main>
    </div>
      {/* Modals */}
      {showProfileModal && (
        <ProfileModal user={user} onClose={() => setShowProfileModal(false)} />
      )}
      {showNotificationCenter && (
        <NotificationCenter
          appointments={appointments}
          onClose={() => {
            setShowNotificationCenter(false);
            setHasUnreadNotifications(false);
          }}
        />
      )}
      {showAppointmentModal && (
        <AppointmentModal
          onClose={() => setShowAppointmentModal(false)}
          user={user}
        />
      )}
    </div>
  );
};

export default PatientDashboard;
