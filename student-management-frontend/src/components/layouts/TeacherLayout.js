// src/components/layouts/TeacherLayout.js
import React from "react";
import { Outlet } from "react-router-dom";
import TeacherSidebar from "../sidebar/TeacherSidebar";
import "../../styles/StudentLayout.css";

export default function TeacherLayout({ theme, toggleTheme, handleLogout }) {
  return (
    <div className={`layout-container ${theme || ""}`}>
      {/* Sidebar */}
      <TeacherSidebar onLogout={handleLogout} />

      {/* Main content */}
      <div className="teacher-main-content">
        {/* Theme Toggle Button */}
        <div className="theme-toggle">
          <button className="toggle-btn" onClick={toggleTheme}>
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>
        </div>

        {/* Nested teacher pages will load here */}
        <Outlet />
      </div>
    </div>
  );
}
