// src/components/attendance/AttendanceDashboard.js
import React from "react";
import { Outlet } from "react-router-dom";
import "./AttendanceDashboard.css";

const AttendanceDashboard = () => {
  return (
    <div className="attendance-dashboard">
      <h2>📊 Attendance Dashboard</h2>

      

      <Outlet /> {/* 👈 Sub-pages (like StudentAttendanceHome, TeacherAttendanceHome) render here */}
    </div>
  );
};

export default AttendanceDashboard;
