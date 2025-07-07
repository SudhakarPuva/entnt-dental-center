import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const ProfileModal = ({ onClose }) => {
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(currentUser);
    setName(currentUser.name || "");
    setAvatar(currentUser.avatar || "");
    setPhone(currentUser.phone || "");
    setGender(currentUser.gender || "");
  }, []);

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e) => {
    e.preventDefault();

    const updatedUser = {
      ...user,
      name,
      avatar,
      phone,
      gender,
      ...(password ? { password } : {}),
    };

    try {
      localStorage.setItem("user", JSON.stringify(updatedUser));

      const allUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const updatedUsers = allUsers.map((u) =>
        u.email === updatedUser.email ? updatedUser : u
      );

      // Prevent large data crashes
      if (JSON.stringify(updatedUsers).length > 5_000_000) {
        toast.error("Profile data is too large to save.");
        return;
      }

      localStorage.setItem("users", JSON.stringify(updatedUsers));
      toast.success("Profile updated successfully!");

      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      console.error("Save error:", err);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md animate-fade-in"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-blue-700">Edit Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-500 text-xl"
          >
            ✖
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="flex flex-col items-center">
            {avatar && (
              <img
                src={avatar}
                alt="Avatar"
                className="w-20 h-20 rounded-full object-cover mb-2"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="text-sm"
            />
          </div>

          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            className="w-full border px-3 py-2 rounded bg-gray-100"
            value={user.email || ""}
            readOnly
          />

          <input
            type="tel"
            className="w-full border px-3 py-2 rounded"
            placeholder="Phone Number"
            value={phone ?? ""}
            onChange={(e) => setPhone(e.target.value)}
          />

          <select
            value={gender ?? ""}
            onChange={(e) => setGender(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="password"
            className="w-full border px-3 py-2 rounded"
            placeholder="Change Password (optional)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;
