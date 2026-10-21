package com.example.student_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.student_management.model.Marks;
import org.springframework.stereotype.Repository;

@Repository
public interface MarksRepository extends JpaRepository<Marks, String> {
}
