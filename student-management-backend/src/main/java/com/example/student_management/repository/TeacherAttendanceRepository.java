package com.example.student_management.repository;

import com.example.student_management.model.TeacherAttendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.*;

public interface TeacherAttendanceRepository extends JpaRepository<TeacherAttendance, Long> {
    List<TeacherAttendance> findByDate(LocalDate date);
    Optional<TeacherAttendance> findByTeacherIdAndDate(String teacherId, LocalDate date);

    @Query("SELECT ta FROM TeacherAttendance ta WHERE ta.teacherId = :teacherId ORDER BY ta.date DESC")
    List<TeacherAttendance> findByTeacherId(String teacherId);
	void deleteByTeacherId(String teacherId);

}
