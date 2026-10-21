import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Form.css";

function Login({ setIsAuthenticated, theme, toggleTheme }) {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        credentials,
        { headers: { "Content-Type": "application/json" } }
      );

      if (!response.data || !response.data.token) {
        setError("Invalid Roll Number / ID or Password");
        return;
      }

      const { role, student, teacher, token, username } = response.data;

      if (!role) {
        setError("Unknown user role");
        return;
      }

      localStorage.setItem("authToken", token);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("role", role);
      localStorage.setItem("username", username);

      // Optional: keep IDs for fetching data later (not for auth persistence)
      if (role === "STUDENT" && student?.rollNumber) {
        localStorage.setItem("rollNumber", student.rollNumber);
        localStorage.setItem("student", JSON.stringify(student));
      }
      if (role === "TEACHER" && teacher?.teacherId) {
        localStorage.setItem("teacherId", teacher.teacherId);
        localStorage.setItem("teacher", JSON.stringify(teacher));
      }

      // Tell App.jsx: "user is logged in with this role"
      setIsAuthenticated(role);

      // Redirect based on role
      if (role === "ADMIN") {
        navigate("/admin");
      } else if (role === "STUDENT") {
        navigate("/student");
      } else if (role === "TEACHER") {
        navigate("/teacher");
      } else {
        setError("Unknown user role");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.error || "Login failed. Please check your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container" style={{ position: "relative" }}>
      {/* small theme toggle on login (top-right) */}
      {typeof toggleTheme === "function" && (
        <div style={{ position: "absolute", top: 12, right: 12 }}>
          <button className="toggle-btn" onClick={toggleTheme}>
            {theme === "light" ? "🌙" : "☀️"}
          </button>
        </div>
      )}

      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="student-form">
        <label>Roll Number / Teacher ID / Admin ID:</label>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          placeholder="Enter your Roll Number or ID"
          required
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />

        <button type="submit" className="save-btn" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Login"}
        </button>
      </form>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
  );
}

export default Login;
