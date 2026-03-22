// src/main/java/com/example/student_management/repository/UserRepository.java
package com.example.student_management.repository;

import com.example.student_management.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
    User findByUsernameAndPassword(String username, String password);
}
