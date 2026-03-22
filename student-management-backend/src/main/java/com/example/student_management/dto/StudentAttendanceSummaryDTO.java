package com.example.student_management.dto;

public class StudentAttendanceSummaryDTO {
    private int totalDays;
    private int presentDays;
    private double attendancePercentage;
    private boolean presentToday;

    public int getTotalDays() {
        return totalDays;
    }

    public void setTotalDays(int totalDays) {
        this.totalDays = totalDays;
    }

    public int getPresentDays() {
        return presentDays;
    }

    public void setPresentDays(int presentDays) {
        this.presentDays = presentDays;
    }

    public double getAttendancePercentage() {
        return attendancePercentage;
    }

    public void setAttendancePercentage(double attendancePercentage) {
        this.attendancePercentage = attendancePercentage;
    }

    public boolean isPresentToday() {
        return presentToday;
    }

    public void setPresentToday(boolean presentToday) {
        this.presentToday = presentToday;
    }
}
