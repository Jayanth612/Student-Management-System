package com.example.student_management.controller;


import com.example.student_management.repository.StudentRepository;
import com.example.student_management.repository.TeacherRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.Map;


@RestController
@RequestMapping("/api/admin")
public class AdminController {
	
	
	private final StudentRepository studentRepository;
	private final TeacherRepository teacherRepository;
	
	
	public AdminController(StudentRepository studentRepository, TeacherRepository teacherRepository) {
		this.studentRepository = studentRepository;
		this.teacherRepository = teacherRepository;
	}
	
	
	@GetMapping("/stats")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<Map<String, Long>> getStats() {
		long studentCount = studentRepository.count();
		long teacherCount = teacherRepository.count();
		return ResponseEntity.ok(Map.of("students", studentCount, "teachers", teacherCount));
	}
}