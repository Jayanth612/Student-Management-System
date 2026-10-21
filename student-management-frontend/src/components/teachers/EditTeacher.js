import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditTeacher() {
  const { teacherId } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/teachers/${teacherId}`);
        const data = res.data;

        // ✅ Normalize keys so they match frontend state
        setTeacher({
          teacherId: data.teacherId || data.id || "",
          name: data.name || "",
          subject: data.subject || "",
          email: data.email || "",
          phone: data.phone || "",
          gender: data.gender || "",
          department: data.department || "",
          qualification: data.qualification || "",
          experience: data.experience || "",
          designation: data.designation || "",
          address: data.address || "",
        });
      } catch (err) {
        console.error("❌ Error fetching teacher:", err);
        alert("Failed to load teacher details.");
      }
    };

    fetchTeacher();
  }, [teacherId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacher((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/teachers/${teacherId}`, teacher);
      alert("✅ Teacher updated successfully!");
      navigate("/admin/teachers");
    } catch (error) {
      console.error("Error updating teacher:", error);
      alert("❌ Failed to update teacher.");
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Teacher</h2>
      <form onSubmit={handleSubmit} className="student-form">
        <input name="teacherId" value={teacher.teacherId} readOnly />
        <input name="name" value={teacher.name} onChange={handleChange} placeholder="Enter name" />
        <input name="subject" value={teacher.subject} onChange={handleChange} placeholder="Enter subject" />
        <input name="email" type="email" value={teacher.email} onChange={handleChange} placeholder="Enter email" />
        <input name="phone" value={teacher.phone} onChange={handleChange} placeholder="Enter phone" />

        <select name="gender" value={teacher.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <input name="department" value={teacher.department} onChange={handleChange} placeholder="Enter department" />
        <input name="qualification" value={teacher.qualification} onChange={handleChange} placeholder="Enter qualification" />
        <input type="number" name="experience" value={teacher.experience} onChange={handleChange} placeholder="Enter experience" />
        <input name="designation" value={teacher.designation} onChange={handleChange} placeholder="Enter designation" />
        <textarea name="address" value={teacher.address} onChange={handleChange} placeholder="Enter address"></textarea>

        <button type="submit" className="save-btn">
          Update Teacher
        </button>
      </form>
    </div>
  );
}

export default EditTeacher;
