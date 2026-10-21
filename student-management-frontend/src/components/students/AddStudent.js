// src/components/AddStudent.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddStudent.css";

function AddStudent({ addToast }) {
  const [student, setStudent] = useState({
    rollNumber: "",
    name: "",
    standard: "",
    email: "",
    gender: "",
    branch: "",
    section: "",
    grade: "",
    year: "",
    dob: "",
    phoneNumber: "",
    address: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/students", student);
      addToast("✅ Student added successfully!", "success");
      navigate("/");
    } catch (error) {
      console.error("Error adding student:", error);
      addToast("❌ Failed to add student", "error");
    }
  };

  return (
    <div className="form-container">
      <h2>➕ Add New Student</h2>
      <form onSubmit={handleSubmit} className="student-form">
        <input name="rollNumber" placeholder="Roll Number" value={student.rollNumber} onChange={handleChange} required />
        <input name="name" placeholder="Name" value={student.name} onChange={handleChange} required />
        <input name="standard" placeholder="Standard" value={student.standard} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={student.email} onChange={handleChange} required />

        <select name="gender" value={student.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input name="branch" placeholder="Branch" value={student.branch} onChange={handleChange} />
        <input name="section" placeholder="Section" value={student.section} onChange={handleChange} />
        <input type="number" name="grade" placeholder="Grade (CGPA)" value={student.grade} onChange={handleChange} />
        <input type="number" name="year" placeholder="Year" value={student.year} onChange={handleChange} />
        <input type="date" name="dob" value={student.dob} onChange={handleChange} />
        <input name="phoneNumber" placeholder="Phone Number" value={student.phoneNumber} onChange={handleChange} />
        <textarea name="address" placeholder="Address" value={student.address} onChange={handleChange}></textarea>

        <button type="submit" className="save-btn">Add Student</button>
      </form>
    </div>
  );
}

export default AddStudent;
