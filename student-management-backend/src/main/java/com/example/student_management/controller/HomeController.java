// "student-management\student-management-backend\src\main\java\com\example\student_management\controller\HomeController.java"

package com.example.student_management.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/api/welcome")
    public String home() {
        return "Welcome to Student Management System!";
    }
}
