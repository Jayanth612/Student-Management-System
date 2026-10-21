package com.example.student_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.student_management.model.Announcement;
import org.springframework.stereotype.Repository;

@Repository
public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
}
