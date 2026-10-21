import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./StudentList.css";

function StudentList({ onLogout }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔍 Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBranch, setFilterBranch] = useState("All");
  const [filterStandard, setFilterStandard] = useState("All");
  const [filterGender, setFilterGender] = useState("All");

  const navigate = useNavigate();

  // ✅ Fetch all students
  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/students");
      setStudents(response.data || []);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ Delete a student
  const deleteStudent = async (rollNumber) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/students/${rollNumber}`);
      // refresh list after delete
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Failed to delete student.");
    }
  };

  // 📦 Filter logic
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.rollNumber?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBranch = filterBranch === "All" || s.branch === filterBranch;
    const matchesStandard =
      filterStandard === "All" || s.standard?.toString() === filterStandard;
    const matchesGender =
      filterGender === "All" || s.gender === filterGender;

    return matchesSearch && matchesBranch && matchesStandard && matchesGender;
  });

  useEffect(() => {
    fetchStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <div className="header-row">
        <h2 className="page-title">📚 Student List</h2>
      </div>

      {/* 🔍 Filters Section */}
      <div className="filter-section">
        <input
          type="text"
          placeholder="Search by name or roll number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={filterBranch}
          onChange={(e) => setFilterBranch(e.target.value)}
          className="filter-select"
        >
          <option value="All">All Branches</option>
          <option value="CSE">CSE</option>
          <option value="IT">IT</option>
          <option value="ECE">ECE</option>
          <option value="EEE">EEE</option>
          <option value="MECH">MECH</option>
          <option value="CIVIL">CIVIL</option>
        </select>

        <select
          value={filterStandard}
          onChange={(e) => setFilterStandard(e.target.value)}
          className="filter-select"
        >
          <option value="All">All Standards</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
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
            setFilterBranch("All");
            setFilterStandard("All");
            setFilterGender("All");
          }}
        >
          🔄 Reset Filters
        </button>
      </div>

      {/* ➕ Add Student Button */}
      <div className="add-student-row">
        <Link to="/admin/add-student">
          <button className="add-btn">➕ Add Student</button>
        </Link>
      </div>

      {/* 📋 Table Section */}
      {loading ? (
        <p>Loading students...</p>
      ) : (
        <div className="table-wrapper">
          <table className="student-table">
            <thead>
              <tr>
                <th>Roll No</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Branch</th>
                <th>Standard</th>
                <th>Grade</th>
                <th>Email</th>
                <th>Phone</th>
                <th>DOB</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.rollNumber}>
                    <td>{student.rollNumber}</td>
                    <td>{student.name}</td>
                    <td>{student.gender || "—"}</td>
                    <td>{student.branch || "—"}</td>
                    <td>{student.standard || "—"}</td>
                    <td>{student.grade || "—"}</td>
                    <td>{student.email || "—"}</td>
                    <td>{student.phoneNumber || "—"}</td>
                    <td>{student.dob || "—"}</td>
                    <td>{student.address || "—"}</td>

                    <td className="actions-cell">
                      <button
                        className="edit-btn"
                        onClick={() =>
                          navigate(`/admin/edit-student/${student.rollNumber}`)
                        }
                      >
                        ✏️ Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => deleteStudent(student.rollNumber)}
                      >
                        🗑 Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={11} style={{ textAlign: "center" }}>
                    No students found.
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

export default StudentList;
