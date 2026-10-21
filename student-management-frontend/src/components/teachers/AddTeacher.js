// src/components/AddTeacher.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddTeacher.css";

function AddTeacher({ addToast }) {
  const [teacher, setTeacher] = useState({
    teacherId: "",
    name: "",
    subject: "",
    email: "",
    phone: "",
    gender: "",
    department: "",
    qualification: "",
    experience: "",
    designation: "",
    address: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacher((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/teachers", teacher);
      addToast("✅ Teacher added successfully! (Default password: teacher123)", "success");
      navigate("/");
    } catch (error) {
      console.error("Error adding teacher:", error);
      addToast("❌ Failed to add teacher", "error");
    }
  };

  return (
    <div className="form-container">
      <h2>➕ Add New Teacher</h2>
      <form onSubmit={handleSubmit} className="student-form">
        <input name="teacherId" placeholder="Teacher ID" value={teacher.teacherId} onChange={handleChange} required />
        <input name="name" placeholder="Name" value={teacher.name} onChange={handleChange} required />
        <input name="subject" placeholder="Subject" value={teacher.subject} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={teacher.email} onChange={handleChange} required />
        <input name="phone" placeholder="Phone" value={teacher.phone} onChange={handleChange} />
        
        <select name="gender" value={teacher.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <input name="department" placeholder="Department" value={teacher.department} onChange={handleChange} />
        <input name="qualification" placeholder="Qualification" value={teacher.qualification} onChange={handleChange} />
        <input type="number" name="experience" placeholder="Experience (years)" value={teacher.experience} onChange={handleChange} />
        <input name="designation" placeholder="Designation" value={teacher.designation} onChange={handleChange} />
        <textarea name="address" placeholder="Address" value={teacher.address} onChange={handleChange}></textarea>

        <button type="submit" className="save-btn">Add Teacher</button>
      </form>
    </div>
  );
}

export default AddTeacher;
