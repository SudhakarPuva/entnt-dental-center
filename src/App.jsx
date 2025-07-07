// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import LandingPage from "./pages/Landing";
import PatientDashboard from "./patientPageComponents/PatientDashboard";
import LandingHeader from "./components/LandingHeader";

const AppContent = () => {
  const location = useLocation();
  const showHeader = ["/", "/login", "/signup"].includes(location.pathname);

  return (
    <>
      {showHeader}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/patient" element={<PatientDashboard />} />
      </Routes>

      <ToastContainer />
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
