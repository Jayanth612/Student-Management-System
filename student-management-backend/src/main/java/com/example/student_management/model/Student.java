package com.example.student_management.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "students")
public class Student {

    @Id
    @Column(nullable = false, unique = true)
    private String rollNumber;  // roll number as PK

    @Column(nullable = false)
    private String name;

    private String standard;

    @Column(nullable = false, unique = true)
    private String email;

    private String gender;       // Male / Female / Other
    private String branch;       // e.g., CSE, ECE
    private String section;      // e.g., A, B
    private double grade;        // GPA or overall marks
    private int year;            // year of study (1–4)

    private LocalDate dob;       // proper date type
    private String phoneNumber;
    private String address;

    // --- Constructors ---
    public Student() {}

    public Student(String rollNumber, String name, String standard, String email, String gender, String branch,
                   String section, double grade, int year, LocalDate dob, String phoneNumber, String address) {
        this.rollNumber = rollNumber;
        this.name = name;
        this.standard = standard;
        this.email = email;
        this.gender = gender;
        this.branch = branch;
        this.section = section;
        this.grade = grade;
        this.year = year;
        this.dob = dob;
        this.phoneNumber = phoneNumber;
        this.address = address;
    }

    // --- Getters ---
    public String getRollNumber() { return rollNumber; }
    public String getName() { return name; }
    public String getStandard() { return standard; }
    public String getEmail() { return email; }
    public String getGender() { return gender; }
    public String getBranch() { return branch; }
    public String getSection() { return section; }
    public double getGrade() { return grade; }
    public int getYear() { return year; }
    public LocalDate getDob() { return dob; }
    public String getPhoneNumber() { return phoneNumber; }
    public String getAddress() { return address; }

    // --- Setters ---
    public void setRollNumber(String rollNumber) { this.rollNumber = rollNumber; }
    public void setName(String name) { this.name = name; }
    public void setStandard(String standard) { this.standard = standard; }
    public void setEmail(String email) { this.email = email; }
    public void setGender(String gender) { this.gender = gender; }
    public void setBranch(String branch) { this.branch = branch; }
    public void setSection(String section) { this.section = section; }
    public void setGrade(double grade) { this.grade = grade; }
    public void setYear(int year) { this.year = year; }
    public void setDob(LocalDate dob) { this.dob = dob; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    public void setAddress(String address) { this.address = address; }
}
