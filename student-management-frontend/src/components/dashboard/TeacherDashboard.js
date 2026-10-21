// src/components/dashboard/TeacherDashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/Dashboard.css";

export default function TeacherDashboard() {
  const [profile, setProfile] = useState(null);
  const [attendance, setAttendance] = useState(null);
  const [loading, setLoading] = useState(true);

  const teacherId = localStorage.getItem("teacherId");
  const storedTeacher = localStorage.getItem("teacher");

  useEffect(() => {
    // 1️⃣ Load profile from localStorage (set at login)
    if (storedTeacher) {
      try {
        const parsed = JSON.parse(storedTeacher);
        setProfile(parsed);
      } catch (e) {
        console.error("⚠️ Failed to parse teacher from localStorage:", e);
      }
    } else {
      console.warn("⚠️ No 'teacher' object found in localStorage");
    }

    // 2️⃣ Load overall attendance summary from backend and filter for THIS teacher
    const fetchAttendance = async () => {
      if (!teacherId) {
        console.warn("⚠️ No teacherId found in localStorage");
        setLoading(false);
        return;
      }

      try {
        const url = "http://localhost:8080/api/attendance/teacher/overall";
        console.log("📡 Fetching teacher overall attendance from:", url);

        const res = await axios.get(url);
        console.log("✅ Overall attendance list:", res.data);

        // Find the summary entry for the current teacher
        const teacherSummary = res.data.find(
          (rec) => String(rec.teacherId) === String(teacherId)
        );

        console.log("📌 Filtered teacher summary:", teacherSummary);
        setAttendance(teacherSummary || null);
      } catch (error) {
        console.error("❌ Error fetching teacher attendance summary:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [teacherId, storedTeacher]);

  if (loading) return <h2>Loading your dashboard...</h2>;

  if (!profile)
    return (
      <div className="dashboard-main">
        <h2>No teacher data found for ID: {teacherId || "N/A"}</h2>
      </div>
    );

  const overallPercent =
    attendance && attendance.attendancePercentage != null
      ? attendance.attendancePercentage
      : null;

  const presentTodayText =
    attendance && typeof attendance.presentToday !== "undefined"
      ? attendance.presentToday
        ? "✅ Yes"
        : "❌ No"
      : "N/A"; // backend /overall doesn't send this, so show N/A

  return (
    <div className="dashboard-main">
      {/* ===== HEADER ===== */}
      <div className="dashboard-header">
        <div>
          <h1>👩‍🏫 Teacher Dashboard</h1>
          <p className="dashboard-subtitle">
            Welcome,&nbsp;
            <span className="dashboard-highlight">
              {profile.name || "Teacher"}
            </span>{" "}
            (ID: {profile.teacherId || teacherId || "N/A"})
          </p>
        </div>

        <div className="dashboard-header-right">
          {overallPercent != null && (
            <div className="badge-attendance">
              Overall Attendance:&nbsp;
              <strong>{overallPercent.toFixed(2)}%</strong>
            </div>
          )}
          <p className="dashboard-date">
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* ===== PROFILE + OVERALL ATTENDANCE CARDS ===== */}
      <div className="stats-grid">
        <div className="card">
          <h3>👤 Name</h3>
          <p>{profile.name || "N/A"}</p>
        </div>
        <div className="card">
          <h3>🆔 Teacher ID</h3>
          <p>{profile.teacherId || "N/A"}</p>
        </div>
        <div className="card">
          <h3>🏫 Department</h3>
          <p>{profile.department || "N/A"}</p>
        </div>
        <div className="card">
          <h3>📚 Subject</h3>
          <p>{profile.subject || "N/A"}</p>
        </div>
        <div className="card">
          <h3>📧 Email</h3>
          <p>{profile.email || "N/A"}</p>
        </div>
        <div className="card">
          <h3>📞 Phone</h3>
          <p>{profile.phone || "N/A"}</p>
        </div>

        {/* ⭐ Overall Attendance in the main grid */}
        <div className="card">
          <h3>✅ Overall Attendance</h3>
          <p>
            {overallPercent != null ? `${overallPercent.toFixed(2)}%` : "N/A"}
          </p>
        </div>
      </div>

      {/* ===== DETAILED ATTENDANCE SUMMARY (using same summary entry) ===== */}
      {attendance && (
        <div className="attendance-summary">
          <h2 style={{ marginTop: "30px" }}>📅 Attendance Summary</h2>

          <div className="stats-grid">
            <div className="card">
              <h3>Total Working Days</h3>
              <p>{attendance.totalDays || 0}</p>
            </div>
            <div className="card">
              <h3>Days Present</h3>
              <p>{attendance.presentDays || 0}</p>
            </div>
            <div className="card">
              <h3>Attendance %</h3>
              <p>
                {overallPercent != null
                  ? overallPercent.toFixed(2)
                  : "0.00"}
                %
              </p>
            </div>
            <div className="card">
              <h3>Present Today</h3>
              <p>{presentTodayText}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
