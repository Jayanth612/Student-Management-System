import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/AdminPanel.css";

const AdminStudentsPanel = () => {
  const navigate = useNavigate();

  return (
    <div className="panel-container">
      <h1>🎓 Student Management</h1>
      <div className="panel-options">
        <button onClick={() => navigate("/students/view")}>👀 View Students</button>
        <button onClick={() => navigate("/students/attendance/mark")}>✅ Mark Attendance</button>
        <button onClick={() => navigate("/students/attendance/register")}>📅 Attendance Register</button>
      </div>
    </div>
  );
};

export default AdminStudentsPanel;
