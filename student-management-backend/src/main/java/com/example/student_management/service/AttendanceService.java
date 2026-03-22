package com.example.student_management.service;

import com.example.student_management.repository.StudentAttendanceRepository;
import com.example.student_management.repository.TeacherAttendanceRepository;
import org.springframework.stereotype.Service;

@Service
public class AttendanceService {
    private final StudentAttendanceRepository studentAttendanceRepo;
    private final TeacherAttendanceRepository teacherAttendanceRepo;

    public AttendanceService(StudentAttendanceRepository studentAttendanceRepo,
                             TeacherAttendanceRepository teacherAttendanceRepo) {
        this.studentAttendanceRepo = studentAttendanceRepo;
        this.teacherAttendanceRepo = teacherAttendanceRepo;
    }

    public long countStudentAttendance() {
        return studentAttendanceRepo.count();
    }

    public long countTeacherAttendance() {
        return teacherAttendanceRepo.count();
    }
}
