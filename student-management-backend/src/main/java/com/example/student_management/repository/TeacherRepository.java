package com.example.student_management.repository;

import java.util.List;
import com.example.student_management.model.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, String> {
    Teacher findByTeacherId(String teacherId);
    List<Teacher> findTop5ByOrderByTeacherIdDesc(); // ✅ fixed field name
}
