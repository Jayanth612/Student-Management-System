import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AttendanceReports.css";

export default function AttendanceReports() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Fetch all attendance data
  const fetchAttendance = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/attendance/all");
      setAttendanceData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = attendanceData;

    if (roleFilter !== "ALL") {
      filtered = filtered.filter((item) => item.role === roleFilter);
    }

    if (startDate) {
      filtered = filtered.filter((item) => item.date >= startDate);
    }

    if (endDate) {
      filtered = filtered.filter((item) => item.date <= endDate);
    }

    setFilteredData(filtered);
  }, [roleFilter, startDate, endDate, attendanceData]);

  // Export CSV
  const exportToCSV = () => {
    if (filteredData.length === 0) {
      alert("No data to export.");
      return;
    }

    const header = ["Name", "Role", "Date", "Status"];
    const csvRows = [header.join(",")];

    filteredData.forEach((item) => {
      csvRows.push([item.name, item.role, item.date, item.status].join(","));
    });

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "attendance_report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Reset filters
  const resetFilters = () => {
    setRoleFilter("ALL");
    setStartDate("");
    setEndDate("");
    setFilteredData(attendanceData);
  };

  return (
    <div className="attendance-reports-container">
      <h2 className="reports-title">📊 Attendance Reports</h2>

      <div className="filters">
        <div className="filter-item">
          <label>Role:</label>
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
            <option value="ALL">All</option>
            <option value="STUDENT">Student</option>
            <option value="TEACHER">Teacher</option>
          </select>
        </div>

        <div className="filter-item">
          <label>From:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="filter-item">
          <label>To:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <button className="apply-btn" onClick={resetFilters}>Reset</button>
        <button className="export-btn" onClick={exportToCSV}>Export CSV</button>
      </div>

      <div className="attendance-table-wrapper">
        {filteredData.length > 0 ? (
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((record, index) => (
                <tr key={index}>
                  <td>{record.name}</td>
                  <td>{record.role}</td>
                  <td>{record.date}</td>
                  <td
                    className={
                      record.status === "PRESENT"
                        ? "status-present"
                        : "status-absent"
                    }
                  >
                    {record.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-data">No attendance records found.</p>
        )}
      </div>
    </div>
  );
}
