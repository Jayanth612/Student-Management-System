import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout({ role, theme, toggleTheme, handleLogout }) {
  return (
    <div className={`dashboard-layout ${theme}`}>
      <Sidebar role={role} />

      <main className="main-content">
        <header className="app-header">
          <h1>Student Management System</h1>
          <div className="header-actions">
            <label className="theme-switch">
              <input type="checkbox" checked={theme === "dark"} onChange={toggleTheme} />
              <span className="slider">☀️ 🌙</span>
            </label>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </header>

        <div className="dashboard-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
