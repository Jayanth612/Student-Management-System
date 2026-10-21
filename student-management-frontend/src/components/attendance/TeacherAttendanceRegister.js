import React, { useState } from "react";
import axios from "axios";

function TeacherAttendanceRegister() {
  const [date, setDate] = useState("");
  const [records, setRecords] = useState([]);

  const handleView = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/attendance/teacher/register?date=${date}`
      );
      setRecords(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>📋 Teacher Attendance Register</h2>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <button onClick={handleView}>View</button>

      <table>
        <thead>
          <tr>
            <th>Teacher ID</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.id}>
              <td>{r.teacherId}</td>
              <td>{r.status}</td>
              <td>{r.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TeacherAttendanceRegister;
