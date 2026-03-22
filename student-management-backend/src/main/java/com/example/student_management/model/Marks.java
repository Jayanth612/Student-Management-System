package com.example.student_management.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "marks")
public class Marks {
    @Id
    private String rollNumber;
    private String subject;
    private int marks;

    public Marks() {}

    public Marks(String rollNumber, String subject, int marks) {
        this.rollNumber = rollNumber;
        this.subject = subject;
        this.marks = marks;
    }

    public String getRollNumber() {
        return rollNumber;
    }

    public void setRollNumber(String rollNumber) {
        this.rollNumber = rollNumber;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public int getMarks() {
        return marks;
    }

    public void setMarks(int marks) {
        this.marks = marks;
    }
}
