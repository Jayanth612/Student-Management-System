package com.example.student_management.config;

import com.example.student_management.model.User;
import com.example.student_management.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminAccountInitializer implements CommandLineRunner {
    private static final Logger log = LoggerFactory.getLogger(AdminAccountInitializer.class);

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final String adminPassword;

    public AdminAccountInitializer(UserRepository userRepository,
                                   PasswordEncoder passwordEncoder,
                                   @Value("${app.admin.password}") String adminPassword) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.adminPassword = adminPassword;
    }

    @Override
    public void run(String... args) {
        if (adminPassword == null || adminPassword.length() < 8) {
            log.warn("Admin account is disabled because app.admin.password is shorter than 8 characters.");
            return;
        }

        User admin = userRepository.findById("Admin").orElseGet(() ->
                new User("Admin", "", "ADMIN"));

        boolean passwordNeedsRepair = admin.getPassword() == null
                || !passwordEncoder.matches(adminPassword, admin.getPassword());
        if (passwordNeedsRepair || !"ADMIN".equalsIgnoreCase(admin.getRole())) {
            admin.setPassword(passwordEncoder.encode(adminPassword));
            admin.setRole("ADMIN");
            userRepository.save(admin);
            log.info("Admin account was created or repaired.");
        }
    }
}
