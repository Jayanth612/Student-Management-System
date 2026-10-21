package com.example.student_management.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "student_attendance",
        uniqueConstraints = @UniqueConstraint(name = "uk_student_attendance_roll_date",
                columnNames = {"roll_number", "date"}))
public class StudentAttendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String rollNumber;
    private String name;
    private String standard;
    private String status;  // "Present" or "Absent"
    private LocalDate date;

    public StudentAttendance() {
    }

    public StudentAttendance(String rollNumber, String name, String standard, String status, LocalDate date) {
        this.rollNumber = rollNumber;
        this.name = name;
        this.standard = standard;
        this.status = status;
        this.date = date;
    }

    public Long getId() {
        return id;
    }

    public String getRollNumber() {
        return rollNumber;
    }

    public void setRollNumber(String rollNumber) {
        this.rollNumber = rollNumber;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStandard() {
        return standard;
    }

    public void setStandard(String standard) {
        this.standard = standard;
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
