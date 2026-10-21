// src/components/attendance/students/ViewStudentAttendanceRegister.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../styles/Attendance.css";

function ViewStudentAttendanceRegister() {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/attendance/student/history");
      setAttendanceRecords(res.data);
      setFilteredRecords(res.data); // show all by default
    } catch (error) {
      console.error("Error fetching attendance:", error);
      alert("❌ Failed to fetch attendance data.");
    }
  };

  const handleFilter = () => {
    if (!fromDate || !toDate) {
      alert("⚠️ Please select both From and To dates!");
      return;
    }

    const filtered = attendanceRecords.filter((record) => {
      const recordDate = new Date(record.date);
      return recordDate >= new Date(fromDate) && recordDate <= new Date(toDate);
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
      <h2>📘 Student Attendance Register</h2>

      <div className="date-filter">
        <label>From: </label>
        <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />

        <label>To: </label>
        <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />

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
            <th>Roll Number</th>
            <th>Name</th>
            <th>Standard</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.length > 0 ? (
            filteredRecords.map((record, index) => (
              <tr key={index}>
                <td>{record.date}</td>
                <td>{record.rollNumber}</td>
                <td>{record.name}</td>
                <td>{record.standard}</td>
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

export default ViewStudentAttendanceRegister;
