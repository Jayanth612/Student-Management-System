// src/components/teachers/TeacherProfile.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaIdCard, FaChalkboardTeacher, FaBookOpen, FaEnvelope, FaPhone, FaUserGraduate } from "react-icons/fa";
import "./TeacherProfile.css"; // ✅ Optional if you have a separate CSS file, else reuse StudentProfile.css

function TeacherProfile({ onLogout }) {
  const [teacher, setTeacher] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("teacher");
    if (stored) {
      setTeacher(JSON.parse(stored));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  if (!teacher) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      {/* Header Row */}
      <div className="header-row">
        <h2 className="profile-title">👩‍🏫 Teacher Profile</h2>
      </div>

      {/* Change Password Button */}
      <div>
        <button className="change-btn" onClick={() => navigate("/change-password")}>
          🔑 Change Password
        </button>
      </div>

      {/* Profile Card */}
      <div className="profile-card">
        <div className="profile-item">
          <FaIdCard className="profile-icon" />
          <span><strong>Teacher ID:</strong> {teacher.teacherId}</span>
        </div>
        <div className="profile-item">
          <FaUserGraduate className="profile-icon" />
          <span><strong>Name:</strong> {teacher.name}</span>
        </div>
        <div className="profile-item">
          <FaBookOpen className="profile-icon" />
          <span><strong>Subject:</strong> {teacher.subject}</span>
        </div>
        <div className="profile-item">
          <FaEnvelope className="profile-icon" />
          <span><strong>Email:</strong> {teacher.email}</span>
        </div>
        <div className="profile-item">
          <FaPhone className="profile-icon" />
          <span><strong>Phone:</strong> {teacher.phone || "Not provided"}</span>
        </div>
        <div className="profile-item">
          <FaChalkboardTeacher className="profile-icon" />
          <span><strong>Qualification:</strong> {teacher.qualification || "Not provided"}</span>
        </div>
      </div>
    </div>
  );
}

export default TeacherProfile;
