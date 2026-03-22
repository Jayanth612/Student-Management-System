package com.example.student_management.service;

import com.example.student_management.dto.StudentAttendanceSummaryDTO;
import com.example.student_management.dto.StudentProfileDTO;
import com.example.student_management.model.Student;
import com.example.student_management.model.StudentAttendance;
import com.example.student_management.repository.StudentAttendanceRepository;
import com.example.student_management.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@Service
public class StudentDashboardService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private StudentAttendanceRepository attendanceRepository;

    /**
     * Build StudentProfileDTO from Student (by rollNumber).
     * Returns null if student not found.
     */
    public StudentProfileDTO getStudentProfile(String rollNumber) {
        Student student = studentRepository.findByRollNumber(rollNumber);
        if (student == null) return null;

        StudentProfileDTO dto = new StudentProfileDTO();
        dto.setRollNumber(student.getRollNumber());
        dto.setName(student.getName());
        dto.setEmail(student.getEmail());
        dto.setClassName(student.getStandard());
        // Student uses 'grade' field (getter getGrade). Map it to DTO.gpa
        dto.setGpa(student.getGrade());
		dto.setBranch(student.getBranch());

        return dto;
    }

    /**
     * Returns attendance summary for a student identified by rollNumber.
     * Always returns a DTO (never null) — fields default to 0/false when no records.
     */
    public StudentAttendanceSummaryDTO getStudentAttendanceSummary(String rollNumber) {
        List<StudentAttendance> allRecords = attendanceRepository.findByRollNumber(rollNumber);

        StudentAttendanceSummaryDTO summary = new StudentAttendanceSummaryDTO();
        if (allRecords == null || allRecords.isEmpty()) {
            summary.setTotalDays(0);
            summary.setPresentDays(0);
            summary.setAttendancePercentage(0.0);
            summary.setPresentToday(false);
            return summary;
        }

        int totalDays = allRecords.size();
        int presentDays = (int) allRecords.stream()
                .filter(a -> a != null && "Present".equalsIgnoreCase(a.getStatus()))
                .count();

        double percentage = (totalDays == 0) ? 0.0 : (presentDays * 100.0 / totalDays);

        boolean presentToday = allRecords.stream()
                .anyMatch(a -> a != null && a.getDate() != null
                        && a.getDate().equals(LocalDate.now())
                        && "Present".equalsIgnoreCase(a.getStatus()));

        summary.setTotalDays(totalDays);
        summary.setPresentDays(presentDays);
        summary.setAttendancePercentage(percentage);
        summary.setPresentToday(presentToday);

        return summary;
    }
}
