// src/components/layout/StudentLayout.js
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import StudentSidebar from "../sidebar/StudentSidebar";
import "../../styles/StudentLayout.css";

export default function StudentLayout({ theme, toggleTheme, handleLogout: parentLogout }) {
  const navigate = useNavigate();

  const handleLogoutInternal = () => {
    if (typeof parentLogout === "function") {
      parentLogout();
    } else {
      localStorage.removeItem("authToken");
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("role");
      localStorage.removeItem("username");
      navigate("/login");
    }
  };

  return (
    <div className={`student-layout ${theme || ""}`}>
      <StudentSidebar onLogout={handleLogoutInternal} />

      <main className="student-main-content">
        {/* Theme Toggle */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
          <button className="toggle-btn" onClick={toggleTheme}>
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>
        </div>

        <Outlet />
      </main>
    </div>
  );
}
