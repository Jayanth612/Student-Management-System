// src/components/ChangePassword.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ChangePassword.css";

function ChangePassword() {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      setMessage("New passwords do not match.");
      setMessageType("error");
      return;
    }
    if (form.newPassword.length < 8) {
      setMessage("New password must contain at least 8 characters.");
      setMessageType("error");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/change-password",
        {
          oldPassword: form.oldPassword,
          newPassword: form.newPassword,
        }
      );

      console.log("🔹 Response:", response.data);

      // ✅ Check both numeric and boolean truthy cases
      if (response.status === 200 && (response.data.success === true || response.data.success === "true")) {
        setMessage(response.data.message || "Password changed successfully!");
        setMessageType("success");

        // Auto-logout after 2 seconds
        setTimeout(() => {
          ["authToken", "isAuthenticated", "role", "username", "rollNumber",
            "teacherId", "student", "teacher"].forEach((key) => localStorage.removeItem(key));
          navigate("/login");
          window.location.reload();
        }, 2000);
      } else {
        setMessage(response.data.message || "Failed to change password.");
        setMessageType("error");
      }
    } catch (error) {
      console.error("❌ Change password error:", error);
      const msg =
        typeof error.response?.data === "object"
          ? error.response?.data?.message || "Failed to change password."
          : error.response?.data || "Failed to change password.";

      setMessage(msg);
      setMessageType("error");
    }
  };

  return (
    <div className="form-container">
      <h2>🔐 Change Password</h2>
      <form onSubmit={handleSubmit} className="student-form">
        <label>Old Password:</label>
        <input
          type="password"
          name="oldPassword"
          value={form.oldPassword}
          onChange={handleChange}
          required
        />

        <label>New Password:</label>
        <input
          type="password"
          name="newPassword"
          value={form.newPassword}
          onChange={handleChange}
          required
        />

        <label>Confirm New Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />

        <button type="submit" className="save-btn">
          Change Password
        </button>
      </form>

      {message && (
        <p
          style={{
            color: messageType === "success" ? "green" : "red",
            marginTop: "10px",
            fontWeight: "500",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default ChangePassword;
