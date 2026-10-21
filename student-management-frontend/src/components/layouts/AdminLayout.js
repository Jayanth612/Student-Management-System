// src/components/layouts/AdminLayout.js
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "../sidebar/AdminSidebar";
import "../../styles/Dashboard.css"; // main styling file

export default function AdminLayout({ theme, toggleTheme, handleLogout: parentLogout }) {
  const navigate = useNavigate();

  // Use the parent handleLogout if provided (App.jsx), otherwise fallback
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
    <div className={`admin-layout ${theme || ""}`}>
      {/* Sidebar (fixed) */}
      <AdminSidebar onLogout={handleLogoutInternal} />

      {/* Main content beside sidebar */}
      <main className="admin-main-content">
        {/* Theme Toggle (top-right) */}
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
