// src/components/dashboard/AdminDashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/Dashboard.css";

export default function AdminDashboard() {
  // eslint-disable-next-line no-unused-vars
  const [section, setSection] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalStudents: 0, totalTeachers: 0 });
  const [recent, setRecent] = useState({ students: [], teachers: [] });
  // eslint-disable-next-line no-unused-vars
  const [students, setStudents] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  useEffect(() => {
    if (section === "students") fetchStudents();
    if (section === "teachers") fetchTeachers();
  }, [section]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [statsRes, recentRes] = await Promise.all([
        axios.get("http://localhost:8080/api/stats"),
        axios.get("http://localhost:8080/api/stats/recent"),
      ]);
      setStats(statsRes.data);
      setRecent(recentRes.data);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/students");
      setStudents(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTeachers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/teachers");
      setTeachers(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="dashboard-main">
      {/* OVERVIEW */}
      {section === "overview" && (
        <>
          <h1>Admin Overview</h1>
          <div className="stats-grid">
            <div className="card">
              <h2>Total Students</h2>
              <p className="count">{stats.totalStudents}</p>
            </div>
            <div className="card">
              <h2>Total Teachers</h2>
              <p className="count">{stats.totalTeachers}</p>
            </div>
          </div>

          <div className="recent-section">
            <h2>Recent Students</h2>
            <table>
              <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Name</th>
                  <th>Class</th>
                </tr>
              </thead>
              <tbody>
                {recent.students?.length ? (
                  recent.students.map((s) => (
                    <tr key={s.rollNumber}>
                      <td>{s.rollNumber}</td>
                      <td>{s.name}</td>
                      <td>{s.standard}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" style={{ textAlign: "center" }}>
                      No recent students
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <h2 style={{ marginTop: 40 }}>Recent Teachers</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Subject</th>
                </tr>
              </thead>
              <tbody>
                {recent.teachers?.length ? (
                  recent.teachers.map((t) => (
                    <tr key={t.teacherId}>
                      <td>{t.teacherId}</td>
                      <td>{t.name}</td>
                      <td>{t.subject}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" style={{ textAlign: "center" }}>
                      No recent teachers
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
