package com.example.student_management.repository;

import com.example.student_management.model.StudentAttendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface StudentAttendanceRepository extends JpaRepository<StudentAttendance, Long> {
    Optional<StudentAttendance> findByRollNumberAndDate(String rollNumber, LocalDate date);
    List<StudentAttendance> findByDate(LocalDate date);
    void deleteByRollNumber(String rollNumber);
    List<StudentAttendance> findByRollNumber(String rollNumber);
}
