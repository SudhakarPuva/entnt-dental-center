import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import LandingHeader from "../components/LandingHeader";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Patient");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email === email && u.password === password && u.role === role
    );

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      if (user.role === "Admin") navigate("/admin");
      else if (user.role === "Patient") navigate("/patient");
    } else {
      setError("Invalid credentials or role mismatch.");
    }
  };

  return (
    <div>
      <LandingHeader />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white shadow-md p-8 rounded-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Login</h2>

          {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>}

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full border rounded px-4 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border rounded px-4 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border rounded px-4 py-2"
              required
            >
              <option value="Patient">Patient</option>
              <option value="Admin">Admin</option>
            </select>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Login
            </button>

            <p className="text-sm text-center mt-4">
              New user?{" "}
              <Link to="/signup" className="text-blue-600 underline hover:text-blue-800">
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
