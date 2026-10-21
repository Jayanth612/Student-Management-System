// src/components/attendance/MarkStudentAttendance.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../styles/Attendance.css";

function MarkStudentAttendance() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/students")
      .then((res) => {
        setStudents(res.data);
        const defaultAttendance = {};
        res.data.forEach((s) => {
          defaultAttendance[s.rollNumber] = "Present";
        });
        setAttendance(defaultAttendance);
      })
      .catch((err) => console.error("Error loading students:", err));
  }, []);

  const handleChange = (rollNumber, status) => {
    setAttendance((prev) => ({ ...prev, [rollNumber]: status }));
  };

  const handleSubmit = async () => {
    if (!selectedDate) {
      alert("⚠️ Please select a date before saving attendance!");
      return;
    }

    const attendanceList = students.map((student) => ({
      rollNumber: student.rollNumber,
      name: student.name,
      standard: student.standard,
      status: attendance[student.rollNumber] || "Present",
      date: selectedDate, // ✅ include selected date
    }));

    try {
      await axios.post(
        "http://localhost:8080/api/attendance/student/mark",
        attendanceList
      );
      alert(`✅ Attendance marked successfully for ${selectedDate}!`);
    } catch (error) {
      console.error("Error saving attendance:", error);
      alert("❌ Failed to mark attendance");
    }
  };

  return (
    <div className="attendance-container">
      <h2>🧾 Mark Student Attendance</h2>

      <div className="date-picker">
        <label>Select Date: </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          required
        />
      </div>

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
          {students.map((student) => (
            <tr key={student.rollNumber}>
              <td>{student.rollNumber}</td>
              <td>{student.name}</td>
              <td>{student.standard}</td>
              <td>
                <select
                  value={attendance[student.rollNumber] || "Present"}
                  onChange={(e) =>
                    handleChange(student.rollNumber, e.target.value)
                  }
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="save-btn" onClick={handleSubmit}>
        Save Attendance
      </button>
    </div>
  );
}

export default MarkStudentAttendance;
