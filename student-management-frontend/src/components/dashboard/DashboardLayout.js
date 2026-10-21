import React from "react";

export default function DashboardLayout({ title, children }) {
  return (
    <div className="dashboard-section">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="dashboard-content">{children}</div>
    </div>
  );
}
