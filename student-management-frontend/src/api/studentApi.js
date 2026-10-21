import axios from "axios";

const BASE_URL = "http://localhost:8080/api/student"; // Spring Boot backend

// Get Student Profile
export const getStudentProfile = async (rollNumber) => {
  try {
    const response = await axios.get(`${BASE_URL}/profile`, {
      params: { rollNumber },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching student profile:", error);
    throw error;
  }
};

// Get Attendance Summary
export const getAttendanceSummary = async (rollNumber) => {
  try {
    const response = await axios.get(`${BASE_URL}/attendance/summary`, {
      params: { rollNumber },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching attendance summary:", error);
    throw error;
  }
};
