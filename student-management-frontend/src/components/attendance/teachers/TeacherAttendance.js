import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../styles/Attendance.css";

function TeacherAttendance() {
  const [attendance, setAttendance] = useState([]);
  const teacher = JSON.parse(localStorage.getItem("teacher"));

  useEffect(() => {
    if (teacher) {
      axios
        .get(`http://localhost:8080/api/teacher-attendance/${teacher.teacherId}`)
        .then((res) => setAttendance(res.data))
        .catch((err) => console.error("Error fetching teacher attendance:", err));
    }
  }, [teacher]);

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

export default TeacherAttendance;
