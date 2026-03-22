package com.example.student_management.controller;

import com.example.student_management.model.Teacher;
import com.example.student_management.model.User;
import com.example.student_management.repository.TeacherRepository;
import com.example.student_management.repository.UserRepository;
import com.example.student_management.repository.TeacherAttendanceRepository;
import com.example.student_management.service.TeacherService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/teachers")
@CrossOrigin(origins = "http://localhost:3000")
public class TeacherController {

    @Autowired
    private TeacherService teacherService;

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TeacherAttendanceRepository teacherAttendanceRepository;

    // ✅ Get all teachers
    @GetMapping
    public List<Teacher> getAllTeachers() {
        return teacherService.getAllTeachers();
    }

    // ✅ Add new teacher + create login
    @PostMapping
    public ResponseEntity<String> createTeacher(@RequestBody Teacher teacher) {
        if (teacherRepository.existsById(teacher.getTeacherId())) {
            return ResponseEntity.badRequest().body("❌ Teacher already exists!");
        }

        teacherService.addTeacher(teacher);
        return ResponseEntity.ok("✅ Teacher and user created successfully!");
    }

    // ✅ Get teacher by ID
    @GetMapping("/{teacherId}")
    public ResponseEntity<Teacher> getTeacherById(@PathVariable String teacherId) {
        Optional<Teacher> teacher = teacherService.getTeacherById(teacherId);
        return teacher.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ✅ Update teacher details
    @PutMapping("/{teacherId}")
    public ResponseEntity<String> updateTeacher(@PathVariable String teacherId, @RequestBody Teacher updatedTeacher) {
        if (!teacherRepository.existsById(teacherId)) {
            return ResponseEntity.notFound().build();
        }

        updatedTeacher.setTeacherId(teacherId);
        teacherService.updateTeacher(updatedTeacher);

        return ResponseEntity.ok("✅ Teacher updated successfully!");
    }

    // ✅ Delete teacher and related attendance + user
    @DeleteMapping("/{teacherId}")
    @org.springframework.transaction.annotation.Transactional
    public ResponseEntity<?> deleteTeacher(@PathVariable String teacherId) {
        if (!teacherRepository.existsById(teacherId)) {
            return ResponseEntity.notFound().build();
        }

        try {
            teacherAttendanceRepository.deleteByTeacherId(teacherId);
            teacherService.deleteTeacher(teacherId);

            return ResponseEntity.ok("✅ Teacher and related attendance records deleted successfully!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError()
                    .body("❌ Error deleting teacher: " + e.getMessage());
        }
    }
}
