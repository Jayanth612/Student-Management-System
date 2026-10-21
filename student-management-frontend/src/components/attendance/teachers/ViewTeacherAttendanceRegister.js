// src/components/attendance/teachers/ViewTeacherAttendanceRegister.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../styles/Attendance.css";

function ViewTeacherAttendanceRegister() {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // 👇 Get teacherId from localStorage (set at login)
  const teacherId = localStorage.getItem("teacherId");

  // 👇 Detect if we are in teacher panel (/teacher/...) => "My Attendance" mode
  const isTeacherPanel =
    typeof window !== "undefined" &&
    window.location.pathname.startsWith("/teacher");

  useEffect(() => {
    fetchAttendance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAttendance = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/attendance/teacher/history"
      );

      let records = res.data || [];

      // 👇 If opened from teacher panel, show only THIS teacher's records
      if (isTeacherPanel && teacherId) {
        records = records.filter(
          (rec) => String(rec.teacherId) === String(teacherId)
        );
      }

      setAttendanceRecords(records);
      setFilteredRecords(records);
    } catch (error) {
      console.error("Error fetching teacher attendance:", error);
      alert("❌ Failed to fetch teacher attendance data.");
    }
  };

  const handleFilter = () => {
    if (!fromDate || !toDate) {
      alert("⚠️ Please select both From and To dates!");
      return;
    }

    const from = new Date(fromDate);
    const to = new Date(toDate);

    const filtered = attendanceRecords.filter((record) => {
      const recordDate = new Date(record.date);
      return recordDate >= from && recordDate <= to;
    });

    setFilteredRecords(filtered);
  };

  const handleClearFilter = () => {
    setFilteredRecords(attendanceRecords);
    setFromDate("");
    setToDate("");
  };

  return (
    <div className="attendance-container">
      <h2>
        {isTeacherPanel ? "📘 My Attendance" : "📘 Teacher Attendance Register"}
      </h2>

      <div className="date-filter">
        <label>From: </label>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />

        <label>To: </label>
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />

        <button className="filter-btn" onClick={handleFilter}>
          Filter
        </button>
        <button className="clear-btn" onClick={handleClearFilter}>
          Clear
        </button>
      </div>

      <table className="attendance-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Teacher ID</th>
            <th>Name</th>
            <th>Subject</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.length > 0 ? (
            filteredRecords.map((record, index) => (
              <tr key={index}>
                <td>{record.date}</td>
                <td>{record.teacherId}</td>
                <td>{record.name}</td>
                <td>{record.subject}</td>
                <td
                  style={{
                    color: record.status === "Present" ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {record.status}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No attendance records found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ViewTeacherAttendanceRegister;
