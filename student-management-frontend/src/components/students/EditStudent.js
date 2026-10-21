// src/components/EditStudent.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditStudent({ setToast }) {
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

  const { rollNumber } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/api/students/${rollNumber}`)
      .then(res => setStudent(res.data))
      .catch(err => console.error("Error fetching student:", err));
  }, [rollNumber]);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/students/${rollNumber}`, student);
      if (setToast) setToast({ message: "✏️ Student updated successfully", type: "success" });
      navigate("/");
    } catch (error) {
      console.error("Error updating student:", error);
      if (setToast) setToast({ message: "❌ Failed to update student", type: "error" });
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit} className="student-form">
        <input name="rollNumber" value={student.rollNumber} readOnly />
        <input name="name" value={student.name} onChange={handleChange} />
        <input name="standard" value={student.standard} onChange={handleChange} />
        <input name="email" type="email" value={student.email} onChange={handleChange} />

        <select name="gender" value={student.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <input name="branch" value={student.branch} onChange={handleChange} />
        <input name="section" value={student.section} onChange={handleChange} />
        <input type="number" name="grade" value={student.grade} onChange={handleChange} />
        <input type="number" name="year" value={student.year} onChange={handleChange} />
        <input type="date" name="dob" value={student.dob} onChange={handleChange} />
        <input name="phoneNumber" value={student.phoneNumber} onChange={handleChange} />
        <textarea name="address" value={student.address} onChange={handleChange}></textarea>

        <button type="submit" className="save-btn">Update</button>
      </form>
    </div>
  );
}

export default EditStudent;
