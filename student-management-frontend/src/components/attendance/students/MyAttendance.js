import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../styles/Attendance.css";

export default function MyAttendance() {
  const [attendance, setAttendance] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  const student = JSON.parse(localStorage.getItem("student"));
  const rollNumber = student?.rollNumber;

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        // ✅ Fetch attendance records
        const attendanceRes = await axios.get(
          `http://localhost:8080/api/attendance/student/register?rollNumber=${rollNumber}`
        );
        setAttendance(attendanceRes.data);

        // ✅ Fetch summary data
        const summaryRes = await axios.get(
          `http://localhost:8080/api/student/attendance/summary?rollNumber=${rollNumber}`
        );
        setSummary(summaryRes.data);
      } catch (error) {
        console.error("❌ Error fetching attendance:", error);
      } finally {
        setLoading(false);
      }
    };

    if (rollNumber) fetchAttendanceData();
  }, [rollNumber]);

  if (loading) return <p>Loading your attendance...</p>;

  return (
    <div className="attendance-page">
      <h2>📅 My Attendance Register</h2>

      {/* ✅ Summary Card */}
      {summary && (
        <div className="attendance-summary-card">
          <div><strong>Total Days:</strong> {summary.totalDays}</div>
          <div><strong>Present Days:</strong> {summary.presentDays}</div>
          <div><strong>Attendance %:</strong> {summary.attendancePercentage.toFixed(2)}%</div>
          <div>
            <strong>Today:</strong>{" "}
            {summary.presentToday ? "✅ Present" : "❌ Absent"}
          </div>
        </div>
      )}

      {/* ✅ Attendance Table */}
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendance.length > 0 ? (
            attendance.map((record, index) => (
              <tr key={index}>
                <td>{record.date}</td>
                <td>{record.status === "Present" ? "✅ Present" : "❌ Absent"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No attendance records found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
