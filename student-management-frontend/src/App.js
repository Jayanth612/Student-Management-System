import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./api/axiosConfig";
import Toast from "./components/Toast";

// Layouts
import AdminLayout from "./components/layouts/AdminLayout";
import TeacherLayout from "./components/layouts/TeacherLayout";
import StudentLayout from "./components/layouts/StudentLayout";

// Auth & Profiles
import Login from "./components/Login";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import TeacherDashboard from "./components/dashboard/TeacherDashboard";
import StudentDashboard from "./components/dashboard/StudentDashboard";
import StudentProfile from "./components/students/StudentProfile";
import TeacherProfile from "./components/teachers/TeacherProfile";
import TeacherList from "./components/teachers/TeacherList";

// Attendance Components
import AttendanceDashboard from "./components/attendance/AttendanceDashboard";
import MarkStudentAttendance from "./components/attendance/students/MarkStudentAttendance";
import ViewStudentAttendanceByDate from "./components/attendance/students/ViewStudentAttendanceByDate";
import ViewStudentAttendanceRegister from "./components/attendance/students/ViewStudentAttendanceRegister";
import ViewOverallStudentAttendance from "./components/attendance/students/ViewOverallStudentAttendance";
import MyAttendance from "./components/attendance/students/MyAttendance";
import StudentAttendanceHome from "./components/attendance/students/StudentAttendanceHome";

import TeacherAttendanceHome from "./components/attendance/teachers/TeacherAttendanceHome";
import MarkTeacherAttendance from "./components/attendance/teachers/MarkTeacherAttendance";
import ViewTeacherAttendanceByDate from "./components/attendance/teachers/ViewTeacherAttendanceByDate";
import ViewTeacherAttendanceRegister from "./components/attendance/teachers/ViewTeacherAttendanceRegister";
import ViewOverallTeacherAttendance from "./components/attendance/teachers/ViewOverallTeacherAttendance";

// CRUD Components
import AddStudent from "./components/students/AddStudent";
import EditStudent from "./components/students/EditStudent";
import AddTeacher from "./components/teachers/AddTeacher";
import EditTeacher from "./components/teachers/EditTeacher";
import StudentList from "./components/students/StudentList";

import ChangePassword from "./components/ChangePassword";
import UserManagement from "./components/admin/UserManagement";
import "./styles/Theme.css";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => Boolean(localStorage.getItem("authToken"))
  );
  const [role, setRole] = useState(() => localStorage.getItem("role"));
  const [toasts, setToasts] = useState([]);
  const [theme, setTheme] = useState("light");

  // ✅ Only load THEME from localStorage, NOT auth
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.body.className = savedTheme;
  }, []);

  // Theme toggle
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.className = newTheme;
  };

  // ✅ Logout only clears session state
  const handleLogout = () => {
    setIsAuthenticated(false);
    setRole(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("rollNumber");
    localStorage.removeItem("teacherId");
    localStorage.removeItem("student");
    localStorage.removeItem("teacher");
  };

  // Toast utilities
  const addToast = (msg, type = "success") =>
    setToasts((prev) => [...prev, { id: Date.now(), message: msg, type }]);
  const removeToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <Router>
      <Toast toasts={toasts} removeToast={removeToast} />

      <Routes>
        {/* ✅ Root path: decide where to go */}
        <Route
          path="/"
          element={
            isAuthenticated && role
              ? <Navigate to={`/${role.toLowerCase()}`} replace />
              : <Navigate to="/login" replace />
          }
        />

        {/* 🔹 LOGIN PAGE */}
        <Route
          path="/login"
          element={
            <Login
              setIsAuthenticated={(roleFromLogin) => {
                setIsAuthenticated(true);
                setRole(roleFromLogin);
              }}
              theme={theme}
              toggleTheme={toggleTheme}
            />
          }
        />


        {/* 🔹 PROTECTED ROUTES (only when logged in) */}
        {isAuthenticated && (
          <>
            {/* 🧩 ADMIN ROUTES */}
            {role === "ADMIN" && (
              <Route
                path="/admin/*"
                element={
                  <AdminLayout
                    theme={theme}
                    toggleTheme={toggleTheme}
                    handleLogout={handleLogout}
                  />
                }
              >
                {/* 🏠 Dashboard */}
                <Route index element={<AdminDashboard />} />

                {/* 👨‍🎓 Students Section */}
                <Route path="students" element={<StudentList />} />
                <Route path="add-student" element={<AddStudent addToast={addToast} />} />
                <Route path="edit-student/:rollNumber" element={<EditStudent />} />

                {/* 👩‍🏫 Teachers Section */}
                <Route path="teachers" element={<TeacherList />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="add-teacher" element={<AddTeacher addToast={addToast} />} />
                <Route path="edit-teacher/:teacherId" element={<EditTeacher />} />

                {/* 📋 Attendance Section */}
                <Route path="attendance" element={<AttendanceDashboard />}>
                  <Route index element={<StudentAttendanceHome />} />
                  <Route path="students" element={<StudentAttendanceHome />} />
                  <Route path="students/mark" element={<MarkStudentAttendance />} />
                  <Route path="students/view" element={<ViewStudentAttendanceByDate />} />
                  <Route path="students/register" element={<ViewStudentAttendanceRegister />} />
                  <Route path="students/overall" element={<ViewOverallStudentAttendance />} />
                  <Route path="teachers" element={<TeacherAttendanceHome />} />
                  <Route path="teachers/mark" element={<MarkTeacherAttendance />} />
                  <Route path="teachers/view" element={<ViewTeacherAttendanceByDate />} />
                  <Route path="teachers/register" element={<ViewTeacherAttendanceRegister />} />
                  <Route path="teachers/overall" element={<ViewOverallTeacherAttendance />} />
                </Route>

                {/* 🔍 Student Attendance Routes */}
                <Route path="students/mark-attendance" element={<MarkStudentAttendance />} />
                <Route path="students/view-attendance" element={<ViewStudentAttendanceByDate />} />
                <Route path="students/attendance-register" element={<ViewStudentAttendanceRegister />} />
                <Route path="students/overall-attendance" element={<ViewOverallStudentAttendance />} />
                <Route path="student/attendance" element={<MyAttendance />} />

                {/* 🔍 Teacher Attendance Routes */}
                <Route path="teachers/mark-attendance" element={<MarkTeacherAttendance />} />
                <Route path="teachers/view-attendance" element={<ViewTeacherAttendanceByDate />} />
                <Route path="teachers/attendance-register" element={<ViewTeacherAttendanceRegister />} />
                <Route path="teachers/overall-attendance" element={<ViewOverallTeacherAttendance />} />
              </Route>
            )}

            {/* 🧩 TEACHER ROUTES */}
            {role === "TEACHER" && (
              <Route
                path="/teacher/*"
                element={
                  <TeacherLayout
                    theme={theme}
                    toggleTheme={toggleTheme}
                    handleLogout={handleLogout}
                  />
                }
              >
                <Route index element={<TeacherDashboard />} />
                <Route path="dashboard" element={<TeacherDashboard />} />
                <Route path="profile" element={<TeacherProfile />} />
                <Route path="mark-student-attendance" element={<MarkStudentAttendance />} />
                <Route path="view-student-attendance-by-date" element={<ViewStudentAttendanceByDate />} />
                <Route path="view-student-attendance-register" element={<ViewStudentAttendanceRegister />} />
                <Route path="view-overall-student-attendance" element={<ViewOverallStudentAttendance />} />
                <Route path="change-password" element={<ChangePassword addToast={addToast} />} />
                <Route path="my-attendance" element={<ViewTeacherAttendanceRegister />} />

              </Route>
            )}

            {/* 🧩 STUDENT ROUTES */}
            {role === "STUDENT" && (
              <Route
                path="/student/*"
                element={
                  <StudentLayout
                    theme={theme}
                    toggleTheme={toggleTheme}
                    handleLogout={handleLogout}
                  />
                }
              >
                <Route index element={<StudentDashboard />} />
                <Route path="dashboard" element={<StudentDashboard />} />
                <Route path="attendance" element={<MyAttendance />} />
                <Route path="profile" element={<StudentProfile />} />
                <Route path="change-password" element={<ChangePassword />} />
              </Route>
            )}
          </>
        )}

        {/* 🧩 FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
