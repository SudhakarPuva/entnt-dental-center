
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import PatientModal from "../components/PatientModal";
import AppointmentModal from "../components/AppointmentModal";
import ProfileModal from "../components/ProfileModal";
import DashboardCharts from "../components/DashboardChart";
import NotificationPanel from "../components/NotificationPanel";
import DentistModal from "../components/DentistModal";
import IncidentFormModal from "../components/IncidentFormModal";
import IncidentListModal from "../components/IncidentListModal";
import "../components/NotificationPanel.css";
import "../components/modalAnimations.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [editingPatient, setEditingPatient] = useState(null);
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedDentist, setSelectedDentist] = useState(null);
  const [showIncidentListModal, setShowIncidentListModal] = useState(false);
  const [incidentModal, setIncidentModal] = useState({ mode: null, appointment: null });
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedAppointmentForIncidents, setSelectedAppointmentForIncidents] = useState(null);
  const openBase64InNewTab = (base64) => {
  const byteString = atob(base64.split(',')[1]);
  const mimeString = base64.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);


  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([ab], { type: mimeString });
  const blobUrl = URL.createObjectURL(blob);
  window.open(blobUrl, "_blank");

};


  const user = JSON.parse(localStorage.getItem("user") || "{}");
    useEffect(() => {
    if (!user || user.role !== "Admin") return navigate("/login");

    const allUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const allAppointments = JSON.parse(localStorage.getItem("appointments") || "[]");

    setUsers(allUsers);
    setPatients(allUsers.filter((u) => u.role === "Patient"));
    setAppointments(allAppointments);


    const Dentists = [
        {
          role: "Dentist",
          name: "Sarah Lee",
          specialization: "Orthodontics",
          experience: 10,
          operations: 250,
          successRate: 97,
          contact: "sarah.ortho@clinic.com",
          avatar: "../assets/doctor2.png",
        },
        {
          role: "Dentist",
          name: "John Carter",
          specialization: "Endodontics",
          experience: 8,
          operations: 180,
          successRate: 94,
          contact: "john.endo@clinic.com",
          avatar: "../assets/doctor1.png",
        },
        {
          role: "Dentist",
          name: "Emily Watson",
          specialization: "Pediatric Dentistry",
          experience: 6,
          operations: 300,
          successRate: 99,
          contact: "emily.pedo@clinic.com",
          avatar: "../assets/doctor5.png",
        },
        {
          role: "Dentist",
          name: "Michael Kim",
          specialization: "Oral Surgery",
          experience: 12,
          operations: 210,
          successRate: 92,
          contact: "michael.surgery@clinic.com",
          avatar: "../assets/doctor3.png",
        },
        {
          role: "Dentist",
          name: "Lisa Patel",
          specialization: "Prosthodontics",
          experience: 7,
          operations: 150,
          successRate: 95,
          contact: "lisa.prostho@clinic.com",
          avatar: "../assets/doctor6.png",
        },
        {
          role: "Dentist",
          name: "Samantha",
          specialization: "Periodontics",
          experience: 9,
          operations: 170,
          successRate: 93,
          contact: "david.perio@clinic.com",
          avatar: "../assets/doctor4.png",
        },
        
      ];

      const nonDentists = allUsers.filter((u) => u.role !== "Dentist");
      const updatedUsers = [...nonDentists, ...Dentists];

      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setUsers(updatedUsers);


  }, []);

  useEffect(() => {
    const storedFeedbacks = JSON.parse(localStorage.getItem("feedbacks") || "[]");
    setFeedbacks(storedFeedbacks);
  }, [active]);


  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const updatePatient = (updatedPatient) => {
    const updatedList = patients.map((p) =>
      p.email === updatedPatient.email ? updatedPatient : p
    );
    const others = users.filter((u) => u.role !== "Patient");
    const newUserList = [...others, ...updatedList];
    setPatients(updatedList);
    setUsers(newUserList);
    localStorage.setItem("users", JSON.stringify(newUserList));
    setEditingPatient(null);
  };

  const addPatient = (newPatient) => {
    const newList = [...patients, newPatient];
    const newUsers = [...users, newPatient];
    setPatients(newList);
    setUsers(newUsers);
    localStorage.setItem("users", JSON.stringify(newUsers));
    setShowAddPatientModal(false);
  };

  const deletePatient = (email) => {
    const updatedPatients = patients.filter((p) => p.email !== email);
    const updatedUsers = users.filter((u) => u.email !== email);
    setPatients(updatedPatients);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };
    const handleSaveAppointment = (appt) => {
    let updated = [...appointments];
    const index = updated.findIndex((a) => a.id === appt.id);
    if (index > -1) {
      updated[index] = appt;
    } else {
      updated.push(appt);
    }
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
  };

  const deleteAppointment = (id) => {
    const updated = appointments.filter((a) => a.id !== id);
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
  };

  const handleIncidentSave = (appointmentId, updatedIncidents) => {
    const updated = appointments.map((appt) =>
      appt.id === appointmentId ? { ...appt, incidents: updatedIncidents } : appt
    );
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
  };
    return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 w-64 h-full bg-white shadow-lg z-30 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-6 text-xl font-bold text-blue-700">ENTNT</div>
        <nav className="space-y-1 text-sm">
          {["dashboard", "patients", "appointments", "calendar", "dentists","feedbacks"].map((tab) => (
            <button
              key={tab}
              className={`w-full text-left px-6 py-3 hover:bg-blue-50 ${
                active === tab ? "bg-blue-100 text-blue-700 font-semibold" : ""
              }`}
              onClick={() => {
                setActive(tab);
                setSidebarOpen(false);
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={logout}
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md sticky top-0 z-10">
          <div className="flex items-center space-x-4">
            <button className="md:hidden text-2xl" onClick={() => setSidebarOpen(true)}>
              ☰
            </button>
            <h1 className="text-xl font-bold text-blue-700 capitalize">{active}</h1>
          </div>

          {/* Notification & Profile */}
          <div className="flex items-center space-x-4">
            <div
              className="relative cursor-pointer"
              onClick={() => setShowNotifications(true)}
              title="Notifications"
            >
              <span className="text-xl">🔔</span>
              <span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                !
              </span>
            </div>
            <span className="text-gray-700">{user.name}</span>
            <img
              src={user.avatar || "https://i.pravatar.cc/40"}
              alt="admin"
              className="w-9 h-9 rounded-full object-cover cursor-pointer"
              onClick={() => setShowProfileModal(true)}
            />
          </div>
        </header>
              {/* All Modals */}
        {showAddPatientModal && (
          <PatientModal
            onClose={() => setShowAddPatientModal(false)}
            onSave={addPatient}
          />
        )}

        {editingPatient && (
          <PatientModal
            onClose={() => setEditingPatient(null)}
            onSave={updatePatient}
            patient={editingPatient}
          />
        )}

        {showAppointmentModal && (
          <AppointmentModal
            onClose={() => setShowAppointmentModal(false)}
            onSave={handleSaveAppointment}
            appointment={editingAppointment}
            patients={patients}
            dentists={users.filter((u) => u.role === "Dentist")}
          />
        )}

        {showProfileModal && (
          <ProfileModal onClose={() => setShowProfileModal(false)} />
        )}

        {selectedDentist && (
          <DentistModal dentist={selectedDentist} onClose={() => setSelectedDentist(null)} />
        )}

        {showIncidentListModal && selectedAppointmentForIncidents && (
          <IncidentListModal
            appointment={selectedAppointmentForIncidents}
            onClose={() => {
              setShowIncidentListModal(false);
              setSelectedAppointmentForIncidents(null);
            }}
          />
        )}

            <main className="p-6 max-w-screen-xl w-full mx-auto">
                {/* Dashboard Overview */}
                {active === "dashboard" && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {[
                  { label: "Patients", icon: "👥", value: patients.length },
                  { label: "Appointments", icon: "📅", value: appointments.length },
                  {
                    label: "Pending",
                    icon: "⏳",
                    value: appointments.filter((a) => !a.completed).length,
                  },
                  {
                    label: "Completed",
                    icon: "✅",
                    value: appointments.filter((a) => a.completed).length,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-white p-6 rounded shadow flex items-center space-x-4 hover:shadow-md transition"
                  >
                    <div className="text-3xl">{item.icon}</div>
                    <div>
                      <p className="text-gray-500">{item.label}</p>
                      <p className="text-2xl font-bold">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dashboard Charts */}
              <DashboardCharts appointments={appointments} patients={patients} />
                
               {active === "feedbacks" && (
                  <div className="bg-white p-6 rounded shadow">
                    <h3 className="text-lg font-semibold text-blue-700 mb-4">Patient Feedback</h3>
                    {feedbacks.length === 0 ? (
                      <p className="text-gray-500 italic">No feedback submitted yet.</p>
                    ) : (
                      <div className="space-y-4 text-sm">
                        {feedbacks.map((fb, index) => (
                          <div key={index} className="border p-4 rounded shadow-sm bg-gray-50">
                            <p><strong>From:</strong> {fb.patientName || "Anonymous"}</p>
                            <p><strong>Message:</strong> {fb.message}</p>
                            {fb.rating && <p><strong>Rating:</strong> ⭐ {fb.rating}</p>}
                            <p className="text-xs text-gray-500">Submitted on: {new Date(fb.timestamp).toLocaleString()}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              {/* Notification Panel */}
            </>
          )}

          {/* Dentists Tab */}
          {active === "dentists" && (
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">Our Dentists</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {users
                  .filter((u) => u.role === "Dentist")
                  .map((dentist, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedDentist(dentist)}
                      className="cursor-pointer bg-blue-50 hover:bg-blue-100 p-4 rounded shadow transition duration-300 ease-in-out transform hover:scale-105"
                    >
                      <img
                        src={dentist.avatar}
                        alt={dentist.name}
                        className="w-40 h-40  object-cover mb-2 mx-auto"
                      />
                      <h4 className="text-center font-bold text-blue-700">Dr. {dentist.name}</h4>
                      <p className="text-center text-sm text-gray-600">{dentist.specialization}</p>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Patients Tab */}
          {active === "patients" && (
            <div className="bg-white p-6 rounded shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-blue-700">Patient Management</h3>
                <button
                  onClick={() => setShowAddPatientModal(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  + Add Patient
                </button>
              </div>

              <div className="overflow-auto">
                <table className="min-w-full border text-sm">
                  <thead className="bg-blue-100 text-blue-700">
                    <tr>
                      <th className="p-2 text-left">Name</th>
                      <th className="p-2 text-left">Email</th>
                      <th className="p-2 text-left">DOB</th>
                      <th className="p-2 text-left">Phone</th>
                      <th className="p-2 text-left">Health Info</th>
                      <th className="p-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients.map((p, i) => (
                      <tr key={i} className="border-t">
                        <td className="p-2">{p.name}</td>
                        <td className="p-2">{p.email}</td>
                        <td className="p-2">{p.dob || "—"}</td>
                        <td className="p-2">{p.phone || "—"}</td>
                        <td className="p-2">{p.healthInfo || "—"}</td>
                        <td className="p-2 space-x-2">
                          <button
                            className="text-blue-600 hover:underline"
                            onClick={() => setEditingPatient(p)}
                          >
                            Edit
                          </button>
                          <button
                            className="text-red-600 hover:underline"
                            onClick={() => deletePatient(p.email)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
                {/* Appointments Tab */}
          {active === "appointments" && (
            <div className="bg-white p-6 rounded shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-blue-700">
                  Appointment Management
                </h3>
                <button
                  onClick={() => {
                    setEditingAppointment(null);
                    setShowAppointmentModal(true);
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  + Add Appointment
                </button>
                
              </div>

              <div className="space-y-4 text-sm">
                {appointments.map((a, i) => (
                  <div key={i} className="border p-4 rounded shadow-sm bg-gray-50">
                      <p><strong>Patient:</strong> {a.patientEmail}</p>
                      <p><strong>Dentist:</strong> {a.dentist}</p>
                      <p><strong>Treatment:</strong> {a.treatmentType}</p>
                      <p><strong>Title:</strong> {a.title || "—"}</p>
                      <p><strong>Date:</strong> {new Date(a.date).toLocaleString()}</p>

                      {/* ✅ Paid Checkbox */}
                      <div className="flex items-center gap-2 mt-2">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-blue-600"
                          checked={a.paid || false}
                          onChange={(e) => {
                            const updated = {
                              ...a,
                              paid: e.target.checked,
                              paymentUpdatedAt: Date.now(), // ✅ for notification
                            };
                            handleSaveAppointment(updated);
                          }}
                        />
                        <label className="text-sm"> Paid</label>
                      </div>

                      {/* ✅ Completed Checkbox */}
                      <div className="flex items-center gap-2 mt-2">
                        <input
                          type="checkbox"
                          className="form-checkbox h-5 w-5 text-blue-600"
                          checked={a.completed || false}
                          onChange={(e) => {
                            const updated = {
                              ...a,
                              completed: e.target.checked,
                              completionUpdatedAt: Date.now(), // ✅ for notification
                            };
                            handleSaveAppointment(updated);
                          }}
                        />
                        <label className="text-sm"> Completed</label>
                      </div>

                      {/* ✅ Files */}
                      {a.files?.length > 0 && (
                        <div className="mt-2">
                          <p className="font-medium text-gray-700">📂 Files:</p>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
                            {a.files.map((f, i) => {
                              const src = typeof f === "string" ? f : f.file;
                              const uploadedBy = typeof f === "string" ? "Unknown" : f.uploadedBy || "Unknown";
                              return (
                                <div key={i} className="relative group">
                                  <img
                                    src={src}
                                    alt="file"
                                    className="h-20 w-full object-cover rounded shadow cursor-pointer hover:scale-105 transition"
                                    onClick={() => openBase64InNewTab(src)}
                                  />
                                  <span className="absolute bottom-1 right-1 bg-black bg-opacity-60 text-white text-[10px] px-1 rounded">
                                    {uploadedBy}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Buttons */}
                      <div className="flex space-x-3 mt-2">
                        <button
                          onClick={() => {
                            setEditingAppointment(a);
                            setShowAppointmentModal(true);
                          }}
                          className="text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteAppointment(a.id)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => setIncidentModal({ mode: "view", appointment: a })}
                          className="text-green-600 hover:underline"
                        >
                          View Incidents
                        </button>
                        <button
                          onClick={() => setIncidentModal({ mode: "add", appointment: a })}
                          className="text-blue-600 hover:underline"
                        >
                          + Add Incident
                        </button>
                      </div>
                    </div>

                ))}
              </div>
            </div>
          )}

          {/* Incident Modal */}
          {incidentModal.mode === "view" && incidentModal.appointment && (
            <IncidentListModal
              appointmentId={incidentModal.appointment.id}
              existingIncidents={incidentModal.appointment.incidents || []}
              onSave={handleIncidentSave}
              onClose={() => setIncidentModal({ mode: null, appointment: null })}
            />
          )}
          {incidentModal.mode === "add" && incidentModal.appointment && (
            <IncidentFormModal
              appointmentId={incidentModal.appointment.id}
              existingIncidents={incidentModal.appointment.incidents || []}
              onSave={handleIncidentSave}
              onClose={() => setIncidentModal({ mode: null, appointment: null })}
            />
          )}
          {/* Calendar Tab */}
          {active === "calendar" && (
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-xl font-semibold text-blue-700 mb-4">
                Appointment Calendar
              </h3>
              <Calendar
                value={selectedDate}
                onChange={setSelectedDate}
                tileContent={({ date }) => {
                  const matches = appointments.filter(
                    (a) => new Date(a.date).toDateString() === date.toDateString()
                  );
                  return matches.length ? (
                    <div className="bg-blue-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center mx-auto mt-1">
                      {matches.length}
                    </div>
                  ) : null;
                }}
              />
            </div>
          )}
          {/* Feedbacks Tab */}
          {active === "feedbacks" && (
            <div className="bg-white p-6 rounded shadow">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">Patient Feedback</h3>
              {feedbacks.length === 0 ? (
                <p className="text-gray-500 italic">No feedback submitted yet.</p>
              ) : (
                <div className="space-y-4 text-sm">
                  {feedbacks.map((fb, index) => (
                    <div key={index} className="border p-4 rounded shadow-sm bg-gray-50">
                      <p><strong>From:</strong> {fb.patientName || "Anonymous"}</p>
                      <p><strong>Message:</strong> {fb.message}</p>
                      {fb.rating && <p><strong>Rating:</strong> ⭐ {fb.rating}</p>}
                      <p className="text-xs text-gray-500">Submitted on: {new Date(fb.timestamp).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </main>
          {showNotifications && (<NotificationPanel onClose={() => setShowNotifications(false)} /> )}
      </div>
    </div>
  );
};

export default AdminDashboard;

