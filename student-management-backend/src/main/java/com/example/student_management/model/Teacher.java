package com.example.student_management.model;

import jakarta.persistence.*;

@Entity
@Table(name = "teachers")
public class Teacher {

    @Id
    @Column(nullable = false, unique = true)
    private String teacherId;  // acts as username

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String subject;

    @Column(nullable = false, unique = true)
    private String email;

    private String phone;
    private String gender;           // Male / Female / Other
    private String department;       // e.g., CSE, Maths
    private String qualification;    // M.Tech, PhD, etc.
    private int experience;          // years of experience
    private String designation;      // e.g., Assistant Professor
    private String address;

    // --- Constructors ---
    public Teacher() {}

    public Teacher(String teacherId, String name, String subject, String email, String phone,
                   String gender, String department, String qualification, int experience,
                   String designation, String address) {
        this.teacherId = teacherId;
        this.name = name;
        this.subject = subject;
        this.email = email;
        this.phone = phone;
        this.gender = gender;
        this.department = department;
        this.qualification = qualification;
        this.experience = experience;
        this.designation = designation;
        this.address = address;
    }

    // --- Getters ---
    public String getTeacherId() { return teacherId; }
    public String getName() { return name; }
    public String getSubject() { return subject; }
    public String getEmail() { return email; }
    public String getPhone() { return phone; }
    public String getGender() { return gender; }
    public String getDepartment() { return department; }
    public String getQualification() { return qualification; }
    public int getExperience() { return experience; }
    public String getDesignation() { return designation; }
    public String getAddress() { return address; }

    // --- Setters ---
    public void setTeacherId(String teacherId) { this.teacherId = teacherId; }
    public void setName(String name) { this.name = name; }
    public void setSubject(String subject) { this.subject = subject; }
    public void setEmail(String email) { this.email = email; }
    public void setPhone(String phone) { this.phone = phone; }
    public void setGender(String gender) { this.gender = gender; }
    public void setDepartment(String department) { this.department = department; }
    public void setQualification(String qualification) { this.qualification = qualification; }
    public void setExperience(int experience) { this.experience = experience; }
    public void setDesignation(String designation) { this.designation = designation; }
    public void setAddress(String address) { this.address = address; }
}
