import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../styles/Attendance.css";

function StudentAttendance() {
  const [attendance, setAttendance] = useState([]);
  const student = JSON.parse(localStorage.getItem("student"));

  useEffect(() => {
    if (student) {
      axios
        .get(`http://localhost:8080/api/student-attendance/${student.rollNumber}`)
        .then((res) => setAttendance(res.data))
        .catch((err) => console.error("Error fetching student attendance:", err));
    }
  }, [student]);

  return (
    <div className="attendance-container">
      <h2>📅 My Attendance</h2>
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((record) => (
            <tr key={record.id}>
              <td>{record.date}</td>
              <td>{record.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentAttendance;
