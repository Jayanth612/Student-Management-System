package com.example.student_management.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "attendance")
public class Attendance {
    @Id
    private String rollNumber;

    private String date;
    private boolean present;

    public Attendance() {}

    public Attendance(String rollNumber, String date, boolean present) {
        this.rollNumber = rollNumber;
        this.date = date;
        this.present = present;
    }

    public String getRollNumber() {
        return rollNumber;
    }

    public void setRollNumber(String rollNumber) {
        this.rollNumber = rollNumber;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public boolean isPresent() {
        return present;
    }

    public void setPresent(boolean present) {
        this.present = present;
    }
}
