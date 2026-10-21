// src/components/sidebar/TeacherSidebar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./TeacherSidebar.css";

export default function TeacherSidebar({ onLogout }) {
  const location = useLocation();
  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="teacher-sidebar">
      <div>
        <h2 className="sidebar-title">Teacher Panel</h2>
        <ul className="sidebar-links">
          <li className={isActive("/teacher/dashboard") ? "active" : ""}>
            <Link to="/teacher/dashboard">🏠 Dashboard</Link>
          </li>

          <li className={isActive("/teacher/mark-student-attendance") ? "active" : ""}>
            <Link to="/teacher/mark-student-attendance">📝 Mark Attendance</Link>
          </li>

          <li className={isActive("/teacher/view-student-attendance-by-date") ? "active" : ""}>
            <Link to="/teacher/view-student-attendance-by-date">📅 View Attendance</Link>
          </li>

          <li className={isActive("/teacher/view-overall-student-attendance") ? "active" : ""}>
            <Link to="/teacher/view-overall-student-attendance">📊 Overall Attendance</Link>
          </li>

          <li className={isActive("/teacher/profile") ? "active" : ""}>
            <Link to="/teacher/profile">👤 Profile</Link>
          </li>

          <li>
            <NavLink to="/teacher/my-attendance">
              📌 My Attendance
            </NavLink>
          </li>
            
          <li className={isActive("/teacher/change-password") ? "active" : ""}>
            <Link to="/teacher/change-password">🔐 Change Password</Link>
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
