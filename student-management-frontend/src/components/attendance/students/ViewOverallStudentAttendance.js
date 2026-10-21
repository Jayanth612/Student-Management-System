import React, { useEffect, useState } from "react";
import axios from "axios";

function ViewOverallStudentAttendance() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/attendance/student/overall")
      .then((res) => setData(res.data))
      .catch((err) =>
        console.error("Error loading overall attendance:", err)
      );
  }, []);

  return (
    <div className="attendance-container">
      <h2>📊 Overall Attendance Report</h2>
      <table border="1" cellPadding="8" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Roll Number</th>
            <th>Name</th>
            <th>Standard</th>
            <th>Present Days</th>
            <th>Total Days</th>
            <th>Attendance %</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r, i) => {
            const percentage =
              r.attendancePercentage ??
              r.percentage ??
              0; // fallback to 0 if undefined

            return (
              <tr key={i}>
                <td>{r.rollNumber}</td>
                <td>{r.name}</td>
                <td>{r.standard}</td>
                <td>{r.presentDays}</td>
                <td>{r.totalDays}</td>
                <td>{percentage.toFixed(2)}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ViewOverallStudentAttendance;
