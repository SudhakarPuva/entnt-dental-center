import React from "react";
import { FiBell, FiMenu } from "react-icons/fi";
import "./PatientTopbar.css";

const PatientTopbar = ({
  user,
  onProfileClick,
  onNotificationClick,
  onHamburgerClick,
  hasUnreadNotifications,
}) => {
  return (
    <header className="bg-white shadow-md px-4 py-3 flex items-center justify-between sticky top-0 z-30">
      {/* Hamburger for mobile */}
      <button
        onClick={onHamburgerClick}
        className="md:hidden text-2xl text-gray-600"
        title="Menu"
      >
        <FiMenu />
      </button>

      {/* Logo or App Title */}
      <h1 className="text-lg font-bold text-blue-700 hidden md:block">
        Patient Dashboard
      </h1>

      {/* Right Side Controls */}
      <div className="flex items-center space-x-4 ml-auto">
        {/* Notification Bell */}
        <div
          onClick={onNotificationClick}
          className="relative cursor-pointer text-xl text-gray-600 hover:text-blue-700 transition"
          title="Notifications"
        >
          <FiBell />
          {hasUnreadNotifications && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 animate-pingOnce" />
          )}
        </div>

        {/* Profile Avatar */}
        <img
          src={user?.avatar || "https://i.pravatar.cc/40"}
          alt="avatar"
          className="w-9 h-9 rounded-full object-cover border cursor-pointer hover:ring-2 hover:ring-blue-500"
          onClick={onProfileClick}
          title="Edit Profile"
        />
      </div>
    </header>
  );
};

export default PatientTopbar;
