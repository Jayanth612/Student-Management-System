// src/components/attendance/ViewStudentAttendanceByDate.js
import React, { useState } from "react";
import axios from "axios";
import "../../../styles/Attendance.css";

function ViewStudentAttendanceByDate() {
  const [date, setDate] = useState("");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAttendance = async () => {
    if (!date) {
      alert("⚠️ Please select a date first!");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/api/attendance/student/by-date?date=${date}`
      );
      setRecords(response.data);
    } catch (error) {
      console.error("❌ Error fetching attendance:", error);
      alert("Failed to load attendance records!");
    }
    setLoading(false);
  };

  return (
    <div className="attendance-container">
      <h2>📘 View Student Attendance by Date</h2>

      <div className="date-picker">
        <label>Select Date: </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button className="save-btn" onClick={fetchAttendance}>
          View Attendance
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : records.length > 0 ? (
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Roll Number</th>
              <th>Name</th>
              <th>Standard</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr key={index}>
                <td>{record.rollNumber}</td>
                <td>{record.name}</td>
                <td>{record.standard}</td>
                <td
                  style={{
                    color:
                      record.status === "Present" ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {record.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        date && <p>No records found for this date.</p>
      )}
    </div>
  );
}

export default ViewStudentAttendanceByDate;
