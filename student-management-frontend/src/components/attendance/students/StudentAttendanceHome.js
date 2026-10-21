import React from "react";
import { Link } from "react-router-dom";
import "../AttendanceHome.css";

const StudentAttendanceHome = () => {
  return (
    <div className="attendance-home">
      <h2>🎓 Student Attendance Management</h2>
      <p>Select an option below to manage student attendance:</p>

      <div className="attendance-actions">
        <Link to="mark" className="attendance-btn">📝 Mark Attendance</Link>
        <Link to="view" className="attendance-btn">📅 View by Date</Link>
        <Link to="register" className="attendance-btn">📘 Attendance Register</Link>
        <Link to="overall" className="attendance-btn">📊 Overall Attendance</Link>
      </div>
    </div>
  );
};

export default StudentAttendanceHome;
