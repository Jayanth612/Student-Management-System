// src/services/studentService.js
import axios from "axios";

const API_URL = "http://localhost:8080/api/students";

// Fetch all students
export const getStudents = async () => {
  const response = await axios.get(API_URL);
  return response.data; // return only data
};

// Fetch student by roll number
export const getStudentByRollNumber = async (rollNumber) => {
  const response = await axios.get(`${API_URL}/${rollNumber}`);
  return response.data; // return only data
};

// Add new student
export const addStudent = async (student) => {
  const response = await axios.post(API_URL, student);
  return response.data;
};

// Update student
export const updateStudent = async (rollNumber, student) => {
  const response = await axios.put(`${API_URL}/${rollNumber}`, student);
  return response.data;
};

// Delete student
export const deleteStudent = async (rollNumber) => {
  const response = await axios.delete(`${API_URL}/${rollNumber}`);
  return response.data;
};
