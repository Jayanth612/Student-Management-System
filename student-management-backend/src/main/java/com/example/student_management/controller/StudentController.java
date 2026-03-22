package com.example.student_management.controller;

import com.example.student_management.model.Student;
import com.example.student_management.model.User;
import com.example.student_management.repository.StudentRepository;
import com.example.student_management.repository.UserRepository;
import com.example.student_management.repository.StudentAttendanceRepository;
import com.example.student_management.service.StudentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentAttendanceRepository studentAttendanceRepository;

    // -------------------------------
    // ✅ Get all students
    // -------------------------------
    @GetMapping
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    // -------------------------------
    // ✅ Get single student by roll number
    // -------------------------------
    @GetMapping("/{rollNumber}")
    public ResponseEntity<Student> getStudentByRollNumber(@PathVariable String rollNumber) {
        return studentService.getStudentById(rollNumber)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // -------------------------------
    // ✅ Add new student and automatically create login record
    // -------------------------------
    @PostMapping
    public ResponseEntity<?> createStudent(@RequestBody Student student) {
        if (studentRepository.existsById(student.getRollNumber())) {
            return ResponseEntity.badRequest().body("❌ Student already exists!");
        }

        studentService.addStudent(student);
        return ResponseEntity.ok("✅ Student and user created successfully!");
    }

    // -------------------------------
    // ✅ Update student by roll number
    // -------------------------------
    @PutMapping("/{rollNumber}")
    public ResponseEntity<?> updateStudent(@PathVariable String rollNumber, @RequestBody Student updatedStudent) {
        if (!studentRepository.existsById(rollNumber)) {
            return ResponseEntity.notFound().build();
        }

        // Ensure correct roll number before saving
        updatedStudent.setRollNumber(rollNumber);
        studentService.updateStudent(updatedStudent);

        return ResponseEntity.ok("✅ Student updated successfully!");
    }

    // -------------------------------
    // ✅ Delete student and related attendance + user
    // -------------------------------
    @DeleteMapping("/{rollNumber}")
    @org.springframework.transaction.annotation.Transactional
    public ResponseEntity<?> deleteStudent(@PathVariable String rollNumber) {
        if (!studentRepository.existsById(rollNumber)) {
            return ResponseEntity.notFound().build();
        }

        try {
            // 1️⃣ Delete attendance records
            studentAttendanceRepository.deleteByRollNumber(rollNumber);

            // 2️⃣ Delete student and user
            studentService.deleteStudent(rollNumber);

            return ResponseEntity.ok("✅ Student and related attendance records deleted successfully!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError()
                    .body("❌ Error deleting student: " + e.getMessage());
        }
    }
}
