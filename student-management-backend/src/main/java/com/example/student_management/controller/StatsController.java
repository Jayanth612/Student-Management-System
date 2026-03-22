package com.example.student_management.controller;

import com.example.student_management.repository.StudentRepository;
import com.example.student_management.repository.TeacherRepository;
import com.example.student_management.model.Student;
import com.example.student_management.model.Teacher;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/stats")
@CrossOrigin(origins = "http://localhost:3000")
public class StatsController {

    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;

    public StatsController(StudentRepository studentRepository, TeacherRepository teacherRepository) {
        this.studentRepository = studentRepository;
        this.teacherRepository = teacherRepository;
    }

    // ✅ Total counts
    @GetMapping
    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalStudents", studentRepository.count());
        stats.put("totalTeachers", teacherRepository.count());
        return stats;
    }

    // ✅ Get latest 5 students and teachers
    @GetMapping("/recent")
    public Map<String, Object> getRecentData() {
        List<Student> recentStudents = studentRepository.findTop5ByOrderByRollNumberDesc();
        List<Teacher> recentTeachers = teacherRepository.findTop5ByOrderByTeacherIdDesc();

        Map<String, Object> recent = new HashMap<>();
        recent.put("students", recentStudents);
        recent.put("teachers", recentTeachers);
        return recent;
    }
}
