import React, { useEffect, useState } from "react";
import axios from "axios";

function ViewOverallTeacherAttendance() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/attendance/teacher/overall")
      .then((res) => setData(res.data))
      .catch((err) =>
        console.error("Error loading overall teacher attendance:", err)
      );
  }, []);

  return (
    <div className="attendance-container">
      <h2>📊 Overall Teacher Attendance Report</h2>
      <table border="1" cellPadding="8" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Teacher ID</th>
            <th>Name</th>
            <th>Subject</th>
            <th>Present Days</th>
            <th>Total Days</th>
            <th>Attendance %</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No attendance data found.
              </td>
            </tr>
          ) : (
            data.map((r, i) => (
              <tr key={i}>
                <td>{r.teacherId || "—"}</td>
                <td>{r.name || "—"}</td>
                <td>{r.subject || "—"}</td>
                <td>{r.presentDays ?? 0}</td>
                <td>{r.totalDays ?? 0}</td>
                <td>
                  {Number.isFinite(Number(r.attendancePercentage))
                    ? `${Number(r.attendancePercentage).toFixed(2)}%`
                    : "0.00%"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ViewOverallTeacherAttendance;
