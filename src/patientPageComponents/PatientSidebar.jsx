import React from "react";
import "./PatientSidebar.css";
import {
  FaHome,
  FaCalendarAlt,
  FaFileInvoiceDollar,
  FaFolderOpen,
  FaHeartbeat,
  FaComments,
  FaSignOutAlt
} from "react-icons/fa";

const PatientSidebar = ({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) => {
  const tabs = [
    { key: "overview", label: "Overview", icon: <FaHome /> },
    { key: "calendar", label: "Calendar", icon: <FaCalendarAlt /> },
    { key: "billing", label: "Billing", icon: <FaFileInvoiceDollar /> },
    { key: "files", label: "File Vault", icon: <FaFolderOpen /> },
    { key: "health", label: "Health Metrics", icon: <FaHeartbeat /> },
    { key: "feedback", label: "Feedback", icon: <FaComments /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white shadow-md h-screen sticky top-0 z-20 justify-between">
        <div>
          <div className="p-6 text-xl font-bold text-blue-700">ENTNT</div>
          <nav className="space-y-2 px-4">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded text-left hover:bg-blue-50 ${
                  activeTab === tab.key ? "bg-blue-100 text-blue-700 font-semibold" : "text-gray-700"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 flex items-center justify-center space-x-2"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="fixed top-0 left-0 w-64 h-full bg-white z-50 shadow-lg animate-slide-in flex flex-col justify-between">
            <div>
              <div className="p-6 text-xl font-bold text-blue-700">ENTNT</div>
              <nav className="space-y-2 px-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => {
                      setActiveTab(tab.key);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-2 rounded text-left hover:bg-blue-50 ${
                      activeTab === tab.key ? "bg-blue-100 text-blue-700 font-semibold" : "text-gray-700"
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-4">
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 flex items-center justify-center space-x-2"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          </aside>
        </>
      )}
    </>
  );
};

export default PatientSidebar;
