// src/components/sidebar/StudentSidebar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./StudentSidebar.css";

export default function StudentSidebar({ onLogout }) {
  const location = useLocation();
  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="student-sidebar">
      <div>
        <h2 className="sidebar-title">Student Panel</h2>
        <ul className="sidebar-links">
          <li className={isActive("/student/dashboard") ? "active" : ""}>
            <Link to="/student/dashboard">🏠 Dashboard</Link>
          </li>
          <li className={isActive("/student/attendance") ? "active" : ""}>
            <Link to="/student/attendance">📅 My Attendance</Link>
          </li>
          <li className={isActive("/student/profile") ? "active" : ""}>
            <Link to="/student/profile">👤 Profile</Link>
          </li>
          <li className={isActive("/student/change-password") ? "active" : ""}>
            <Link to="/student/change-password">🔐 Change Password</Link>
          </li>
        </ul>
      </div>

      <div className="logout-container">
        <button className="logout-btn" onClick={onLogout}>
          🚪 Logout
        </button>
      </div>
    </div>
  );
}
