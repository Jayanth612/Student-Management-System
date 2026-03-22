package com.example.student_management.controller;

import com.example.student_management.repository.StudentRepository;
import com.example.student_management.repository.TeacherRepository;
import com.example.student_management.service.AttendanceService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:3000")
public class DashboardStatsController {

    private final StudentRepository studentRepo;
    private final TeacherRepository teacherRepo;
    private final AttendanceService attendanceService;

    public DashboardStatsController(StudentRepository studentRepo, 
                                    TeacherRepository teacherRepo, 
                                    AttendanceService attendanceService) {
        this.studentRepo = studentRepo;
        this.teacherRepo = teacherRepo;
        this.attendanceService = attendanceService;
    }

    @GetMapping("/stats")
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalStudents", studentRepo.count());
        stats.put("totalTeachers", teacherRepo.count());
        stats.put("studentAttendanceCount", attendanceService.countStudentAttendance());
        stats.put("teacherAttendanceCount", attendanceService.countTeacherAttendance());
        return stats;
    }
}
