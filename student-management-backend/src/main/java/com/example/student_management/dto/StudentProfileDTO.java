package com.example.student_management.dto;

public class StudentProfileDTO {
    private String rollNumber;
    private String name;
    private String email;
    private String className;
    private double gpa;
	private String branch;

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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

	public String getBranch(){
		return branch;
	}
	
	public void setBranch(String branch){
		this.branch = branch;
	}
	
    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public double getGpa() {
        return gpa;
    }

    public void setGpa(double gpa) {
        this.gpa = gpa;
    }
}
