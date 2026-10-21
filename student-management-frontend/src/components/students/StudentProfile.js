// src/components/students/StudentProfile.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import navigate hook
import { FaIdCard, FaUserGraduate, FaLayerGroup, FaEnvelope } from "react-icons/fa";
import "./StudentProfile.css";

function StudentProfile({ onLogout }) {
  const [student, setStudent] = useState(null);
  const navigate = useNavigate(); // ✅ Initialize navigate

  useEffect(() => {
    const stored = localStorage.getItem("student");
    if (stored) {
      setStudent(JSON.parse(stored));
    }
  }, []);

  if (!student) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      {/* Header Row */}
      <div className="header-row">
        <h2 className="profile-title">👨‍🎓 My Profile</h2>
        
      </div>
      <div>
          
          <button
            className="change-btn"
            onClick={() => navigate("/student/change-password")}
          >
            🔑 Change Password
          </button>


        </div>
      {/* Profile Card */}
      <div className="profile-card">
        <div className="profile-item">
          <FaIdCard className="profile-icon" />
          <span><strong>Roll Number:</strong> {student.rollNumber}</span>
        </div>
        <div className="profile-item">
          <FaUserGraduate className="profile-icon" />
          <span><strong>Name:</strong> {student.name}</span>
        </div>
        <div className="profile-item">
          <FaLayerGroup className="profile-icon" />
          <span><strong>Standard:</strong> {student.standard}</span>
        </div>
        <div className="profile-item">
          <FaEnvelope className="profile-icon" />
          <span><strong>Email:</strong> {student.email}</span>
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;
