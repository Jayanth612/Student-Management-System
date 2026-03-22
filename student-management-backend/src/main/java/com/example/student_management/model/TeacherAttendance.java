package com.example.student_management.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "teacher_attendance")
public class TeacherAttendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String teacherId;
    private String name;
    private String subject;
    private String status; // Present / Absent
    private LocalDate date;

    public TeacherAttendance() {}

    public TeacherAttendance(String teacherId, String name, String subject, String status, LocalDate date) {
        this.teacherId = teacherId;
        this.name = name;
        this.subject = subject;
        this.status = status;
        this.date = date;
    }

    public Long getId() {
        return id;
    }

    public String getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(String teacherId) {
        this.teacherId = teacherId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }
	
	public void setId(Long id) {
		this.id = id;
	}
	
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
