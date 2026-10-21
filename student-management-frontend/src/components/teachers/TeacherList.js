import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./TeacherList.css";

function TeacherList({ onLogout }) {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔍 Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("All");
  const [filterGender, setFilterGender] = useState("All");

  const navigate = useNavigate();

  // ✅ Fetch all teachers
  const fetchTeachers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/teachers");
      setTeachers(response.data || []);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ Delete a teacher
  const deleteTeacher = async (teacherId) => {
    if (!window.confirm("Are you sure you want to delete this teacher?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/teachers/${teacherId}`);
      fetchTeachers();
    } catch (error) {
      console.error("Error deleting teacher:", error);
      alert("Failed to delete teacher.");
    }
  };

  // 📦 Filter logic
  const filteredTeachers = teachers.filter((t) => {
    const matchesSearch =
      t.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.teacherId?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      filterDepartment === "All" || t.department === filterDepartment;
    const matchesGender = filterGender === "All" || t.gender === filterGender;

    return matchesSearch && matchesDepartment && matchesGender;
  });

  useEffect(() => {
    fetchTeachers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <div className="header-row">
        <h2 className="page-title">👩‍🏫 Teacher List</h2>
      </div>

      {/* 🔍 Filters Section */}
      <div className="filter-section">
        <input
          type="text"
          placeholder="Search by name or ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={filterDepartment}
          onChange={(e) => setFilterDepartment(e.target.value)}
          className="filter-select"
        >
          <option value="All">All Departments</option>
          <option value="CSE">CSE</option>
          <option value="IT">IT</option>
          <option value="ECE">ECE</option>
          <option value="EEE">EEE</option>
          <option value="MECH">MECH</option>
          <option value="CIVIL">CIVIL</option>
        </select>

        <select
          value={filterGender}
          onChange={(e) => setFilterGender(e.target.value)}
          className="filter-select"
        >
          <option value="All">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <button
          className="reset-btn"
          onClick={() => {
            setSearchTerm("");
            setFilterDepartment("All");
            setFilterGender("All");
          }}
        >
          🔄 Reset Filters
        </button>
      </div>

      {/* ➕ Add Teacher Button */}
      <div className="add-btn-container">
        <Link to="/admin/add-teacher">
          <button className="add-btn">➕ Add Teacher</button>
        </Link>
      </div>

      {/* 📋 Table Section */}
      {loading ? (
        <p>Loading teachers...</p>
      ) : (
        <div className="table-wrapper">
          <table className="teacher-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Department</th>
                <th>Subject</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Experience</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeachers.length > 0 ? (
                filteredTeachers.map((teacher) => (
                  <tr key={teacher.teacherId}>
                    <td>{teacher.teacherId}</td>
                    <td>{teacher.name}</td>
                    <td>{teacher.gender || "—"}</td>
                    <td>{teacher.department || "—"}</td>
                    <td>{teacher.subject || "—"}</td>
                    <td>{teacher.email || "—"}</td>
                    <td>{teacher.phone || "—"}</td>
                    <td>{teacher.experience || "—"}</td>
                    <td>{teacher.address || "—"}</td>

                    <td className="actions-cell">
                      <button
                        className="edit-btn"
                        onClick={() => navigate(`/admin/edit-teacher/${teacher.teacherId}`)}
                      >
                        ✏️ Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => deleteTeacher(teacher.teacherId)}
                      >
                        🗑 Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} style={{ textAlign: "center" }}>
                    No teachers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TeacherList;
