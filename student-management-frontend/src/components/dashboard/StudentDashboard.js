// src/components/dashboard/StudentDashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/Dashboard.css";

export default function StudentDashboard() {
  const [profile, setProfile] = useState(null);
  const [attendance, setAttendance] = useState(null);
  const [loading, setLoading] = useState(true);

  const rollNumber = localStorage.getItem("rollNumber");

  useEffect(() => {
    if (!rollNumber) {
      console.error("⚠️ No roll number found in localStorage");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const [profileRes, attendanceRes] = await Promise.all([
          axios.get(`http://localhost:8080/api/student/profile?rollNumber=${rollNumber}`),
          axios.get(`http://localhost:8080/api/student/attendance/summary?rollNumber=${rollNumber}`)
        ]);

        setProfile(profileRes.data);
        setAttendance(attendanceRes.data);
      } catch (error) {
        console.error("❌ Error fetching student dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [rollNumber]);

  if (loading) return <h2>Loading your dashboard...</h2>;

  if (!profile)
    return (
      <div className="dashboard-main">
        <h2>No student data found for roll number: {rollNumber || "N/A"}</h2>
      </div>
    );

  return (
    <div className="dashboard-main">
      <h1>🎓 Student Dashboard</h1>

      {/* 🧩 PROFILE SECTION */}
      <div className="stats-grid">
        <div className="card">
          <h3>👤 Name</h3>
          <p>{profile.name || "N/A"}</p>
        </div>
        <div className="card">
          <h3>🎓 Roll Number</h3>
          <p>{profile.rollNumber || "N/A"}</p>
        </div>
        <div className="card">
          <h3>🏫 Class</h3>
          <p>{profile.className || "Not Assigned"}</p>
        </div>
        <div className="card">
          <h3>📧 Email</h3>
          <p>{profile.email || "N/A"}</p>
        </div>
        <div className="card">
          <h3>⭐ GPA</h3>
          <p>{profile.gpa || "N/A"}</p>
        </div>
        <div className="card">
          <h3>🏫 Branch</h3>
          <p>{profile.branch || "N/A"}</p>
        </div>
      </div>

      {/* 🧩 ATTENDANCE SUMMARY */}
      {attendance && (
        <div className="attendance-summary">
          <h2 style={{ marginTop: "30px" }}>📅 Attendance Summary</h2>

          <div className="stats-grid">
            <div className="card">
              <h3>Total Days</h3>
              <p>{attendance.totalDays || 0}</p>
            </div>
            <div className="card">
              <h3>Days Present</h3>
              <p>{attendance.presentDays || 0}</p>
            </div>
            <div className="card">
              <h3>Attendance %</h3>
              <p>{attendance.attendancePercentage?.toFixed(2)}%</p>
            </div>
            <div className="card">
              <h3>Present Today</h3>
              <p>{attendance.presentToday ? "✅ Yes" : "❌ No"}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
