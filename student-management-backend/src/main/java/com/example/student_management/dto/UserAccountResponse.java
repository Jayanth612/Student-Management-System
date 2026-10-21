package com.example.student_management.dto;

import com.example.student_management.model.User;

public record UserAccountResponse(String username, String role) {
    public static UserAccountResponse from(User user) {
        return new UserAccountResponse(user.getUsername(), user.getRole());
    }
}
