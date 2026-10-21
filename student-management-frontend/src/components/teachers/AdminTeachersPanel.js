import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/AdminPanel.css";

const AdminTeachersPanel = () => {
  const navigate = useNavigate();

  return (
    <div className="panel-container">
      <h1>👩‍🏫 Teacher Management</h1>
      <div className="panel-options">
        <button onClick={() => navigate("/teachers/view")}>👀 View Teachers</button>
        <button onClick={() => navigate("/teachers/attendance/mark")}>✅ Mark Attendance</button>
        <button onClick={() => navigate("/teachers/attendance/register")}>📅 Attendance Register</button>
      </div>
    </div>
  );
};

export default AdminTeachersPanel;
