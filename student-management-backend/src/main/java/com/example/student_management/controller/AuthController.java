// src/main/java/com/example/student_management/controller/AuthController.java
package com.example.student_management.controller;

import com.example.student_management.model.User;
import com.example.student_management.model.Student;
import com.example.student_management.model.Teacher;
import com.example.student_management.repository.UserRepository;
import com.example.student_management.repository.StudentRepository;
import com.example.student_management.repository.TeacherRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    // ✅ LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginRequest) {
        Optional<User> userOpt = userRepository.findById(loginRequest.getUsername());

        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid username or password"));
        }

        User user = userOpt.get();

        if (!user.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid username or password"));
        }

        // ✅ ADMIN LOGIN
        if ("ADMIN".equalsIgnoreCase(user.getRole())) {
            List<Student> students = studentRepository.findAll();
            return ResponseEntity.ok(Map.of(
                    "username", user.getUsername(),
                    "role", "ADMIN",
                    "students", students
            ));
        }

        // ✅ STUDENT LOGIN
        if ("STUDENT".equalsIgnoreCase(user.getRole())) {
            Optional<Student> studentOpt = studentRepository.findById(user.getUsername());
            if (studentOpt.isPresent()) {
                return ResponseEntity.ok(Map.of(
                        "username", user.getUsername(),
                        "role", "STUDENT",
                        "student", studentOpt.get()
                ));
            } else {
                return ResponseEntity.badRequest().body(Map.of("error", "Student not found"));
            }
        }

        // ✅ TEACHER LOGIN
        if ("TEACHER".equalsIgnoreCase(user.getRole())) {
            Optional<Teacher> teacherOpt = teacherRepository.findById(user.getUsername());
            if (teacherOpt.isPresent()) {
                return ResponseEntity.ok(Map.of(
                        "username", user.getUsername(),
                        "role", "TEACHER",
                        "teacher", teacherOpt.get()
                ));
            } else {
                return ResponseEntity.badRequest().body(Map.of("error", "Teacher not found"));
            }
        }

        return ResponseEntity.badRequest().body(Map.of("error", "Unknown user role"));
    }

    // ✅ CHANGE PASSWORD
    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> req) {
        String username = req.get("username");
        String oldPassword = req.get("oldPassword");
        String newPassword = req.get("newPassword");

        Optional<User> userOpt = userRepository.findById(username);

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of(
                    "success", false,
                    "message", "User not found"
            ));
        }

        User user = userOpt.get();

        if (!user.getPassword().equals(oldPassword)) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Old password is incorrect"
            ));
        }

        user.setPassword(newPassword);
        userRepository.save(user);

        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Password changed successfully!"
        ));
    }
}
