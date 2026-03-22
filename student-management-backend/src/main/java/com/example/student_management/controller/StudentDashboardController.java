package com.example.student_management.controller;

import com.example.student_management.dto.StudentProfileDTO;
import com.example.student_management.dto.StudentAttendanceSummaryDTO;
import com.example.student_management.service.StudentDashboardService;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api/student")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentDashboardController {

    @Autowired
    private StudentDashboardService dashboardService;

    // GET /api/student/profile?rollNumber=ABC123
    @GetMapping("/profile")
    public StudentProfileDTO getStudentProfile(@RequestParam String rollNumber) {
        return dashboardService.getStudentProfile(rollNumber);
    }

    // GET /api/student/attendance/summary?rollNumber=ABC123
    @GetMapping("/attendance/summary")
    public StudentAttendanceSummaryDTO getStudentAttendanceSummary(@RequestParam String rollNumber) {
        return dashboardService.getStudentAttendanceSummary(rollNumber);
    }
}
