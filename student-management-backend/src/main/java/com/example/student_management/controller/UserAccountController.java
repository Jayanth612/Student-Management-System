package com.example.student_management.controller;

import com.example.student_management.dto.PasswordUpdateRequest;
import com.example.student_management.dto.UserAccountRequest;
import com.example.student_management.dto.UserAccountResponse;
import com.example.student_management.model.User;
import com.example.student_management.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Locale;

@RestController
@RequestMapping("/api/admin/users")
public class UserAccountController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserAccountController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping
    public List<UserAccountResponse> getUsers() {
        return userRepository.findAll().stream().map(UserAccountResponse::from).toList();
    }

    @PostMapping
    public ResponseEntity<UserAccountResponse> createUser(@RequestBody UserAccountRequest request) {
        validateRequest(request, true);
        if (userRepository.existsById(request.username().trim())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Username already exists");
        }
        User user = new User(request.username().trim(),
                passwordEncoder.encode(request.password()), normalizeRole(request.role()));
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(UserAccountResponse.from(userRepository.save(user)));
    }

    @PutMapping("/{username}/password")
    public UserAccountResponse resetPassword(@PathVariable String username,
                                              @RequestBody PasswordUpdateRequest request) {
        if (request == null || request.password() == null || request.password().length() < 8) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Password must contain at least 8 characters");
        }
        User user = userRepository.findById(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        user.setPassword(passwordEncoder.encode(request.password()));
        return UserAccountResponse.from(userRepository.save(user));
    }

    @PutMapping("/{username}/role")
    public UserAccountResponse changeRole(@PathVariable String username,
                                           @RequestBody UserAccountRequest request,
                                           Authentication authentication) {
        String role = normalizeRole(request == null ? null : request.role());
        if (authentication.getName().equals(username) && !"ADMIN".equals(role)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "The current admin cannot remove their own admin role");
        }
        User user = userRepository.findById(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        user.setRole(role);
        return UserAccountResponse.from(userRepository.save(user));
    }

    @DeleteMapping("/{username}")
    public ResponseEntity<Void> deleteUser(@PathVariable String username,
                                            Authentication authentication) {
        if (authentication.getName().equals(username)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "You cannot delete your own account");
        }
        if (!userRepository.existsById(username)) {
            return ResponseEntity.notFound().build();
        }
        userRepository.deleteById(username);
        return ResponseEntity.noContent().build();
    }

    private void validateRequest(UserAccountRequest request, boolean requirePassword) {
        if (request == null || request.username() == null || request.username().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username is required");
        }
        if (requirePassword && (request.password() == null || request.password().length() < 8)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Password must contain at least 8 characters");
        }
        normalizeRole(request.role());
    }

    private String normalizeRole(String role) {
        String normalized = role == null ? "" : role.trim().toUpperCase(Locale.ROOT);
        if (!List.of("ADMIN", "STUDENT", "TEACHER").contains(normalized)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Role must be ADMIN, STUDENT, or TEACHER");
        }
        return normalized;
    }
}
