// src/components/attendance/MarkTeacherAttendance.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../styles/Attendance.css";

function MarkTeacherAttendance() {
  const [teachers, setTeachers] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/teachers")
      .then((res) => {
        setTeachers(res.data);
        const defaultAttendance = {};
        res.data.forEach((t) => {
          defaultAttendance[t.teacherId] = "Present";
        });
        setAttendance(defaultAttendance);
      })
      .catch((err) => console.error("Error loading teachers:", err));
  }, []);

  const handleChange = (teacherId, status) => {
    setAttendance((prev) => ({ ...prev, [teacherId]: status }));
  };

  const handleSubmit = async () => {
    if (!selectedDate) {
      alert("⚠️ Please select a date before saving attendance!");
      return;
    }

    const attendanceList = teachers.map((teacher) => ({
      teacherId: teacher.teacherId,
      name: teacher.name,
      subject: teacher.subject,
      status: attendance[teacher.teacherId] || "Present",
      date: selectedDate, // ✅ include selected date
    }));

    try {
      await axios.post(
        "http://localhost:8080/api/attendance/teacher/mark",
        attendanceList
      );
      alert(`✅ Teacher attendance marked successfully for ${selectedDate}!`);
    } catch (error) {
      console.error("Error saving attendance:", error);
      alert("❌ Failed to mark attendance");
    }
  };

  return (
    <div className="attendance-container">
      <h2>📋 Mark Teacher Attendance</h2>

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
            <th>ID</th>
            <th>Name</th>
            <th>Subject</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.teacherId}>
              <td>{teacher.teacherId}</td>
              <td>{teacher.name}</td>
              <td>{teacher.subject}</td>
              <td>
                <select
                  value={attendance[teacher.teacherId] || "Present"}
                  onChange={(e) =>
                    handleChange(teacher.teacherId, e.target.value)
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

export default MarkTeacherAttendance;
