// src/components/sidebar/AdminSidebar.js
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./AdminSidebar.css";

export default function AdminSidebar({ currentSection, onSectionChange, onLogout }) {
  const [attendanceOpen, setAttendanceOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="admin-sidebar">
      <div>
        <h2 className="sidebar-title">Admin Panel</h2>
        <ul className="sidebar-links">
          <li className={location.pathname === "/admin" ? "active" : ""}>
            <Link to="/admin">🏠 Dashboard</Link>
          </li>

          <li className={location.pathname.includes("/admin/students") ? "active" : ""}>
            <Link to="/admin/students">🎓 Students</Link>
          </li>

          <li className={location.pathname.includes("/admin/teachers") ? "active" : ""}>
            <Link to="/admin/teachers">👩‍🏫 Teachers</Link>
          </li>
          <li className={location.pathname.includes("/admin/users") ? "active" : ""}>
            <Link to="/admin/users">🔐 User Accounts</Link>
          </li>

          {/* 🔽 Attendance Dropdown */}
          <li className={`dropdown ${attendanceOpen ? "open" : ""}`}>
            <div
              className="dropdown-toggle"
              onClick={() => setAttendanceOpen(!attendanceOpen)}
            >
              📋 Attendance {attendanceOpen ? "▲" : "▼"}
            </div>
            {attendanceOpen && (
              <ul className="dropdown-menu">
                <li
                  className={location.pathname.includes("/admin/attendance/students") ? "active" : ""}
                >
                  <Link to="/admin/attendance/students">👩‍🎓 Students</Link>
                </li>
                <li
                  className={location.pathname.includes("/admin/attendance/teachers") ? "active" : ""}
                >
                  <Link to="/admin/attendance/teachers">👨‍🏫 Teachers</Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>

      {/* Logout button */}
      <div className="logout-container">
        <button className="logout-btn" onClick={onLogout}>
          🚪 Logout
        </button>
      </div>
    </div>
  );
}
