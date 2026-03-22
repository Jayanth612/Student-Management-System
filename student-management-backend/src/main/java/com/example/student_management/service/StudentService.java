package com.example.student_management.service;

import com.example.student_management.model.Student;
import com.example.student_management.model.User;
import com.example.student_management.repository.StudentRepository;
import com.example.student_management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private UserRepository userRepository;

    // ✅ Get all students
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // ✅ Get student by roll number
    public Optional<Student> getStudentById(String rollNumber) {
        return studentRepository.findById(rollNumber);
    }

    // ✅ Add new student + auto-create user account
    public Student addStudent(Student student) {
        Student savedStudent = studentRepository.save(student);

        if (!userRepository.existsById(savedStudent.getRollNumber())) {
            User user = new User(savedStudent.getRollNumber(), savedStudent.getRollNumber(), "STUDENT");
            userRepository.save(user);
        }

        return savedStudent;
    }

    // ✅ Update student info (all fields handled automatically via JPA)
    public Student updateStudent(Student updatedStudent) {
        Optional<Student> existingOpt = studentRepository.findById(updatedStudent.getRollNumber());
        if (existingOpt.isPresent()) {
            Student existing = existingOpt.get();

            // Update all editable fields
            existing.setName(updatedStudent.getName());
            existing.setStandard(updatedStudent.getStandard());
            existing.setEmail(updatedStudent.getEmail());
            existing.setGender(updatedStudent.getGender());
            existing.setBranch(updatedStudent.getBranch());
            existing.setSection(updatedStudent.getSection());
            existing.setGrade(updatedStudent.getGrade());
            existing.setYear(updatedStudent.getYear());
            existing.setDob(updatedStudent.getDob());
            existing.setPhoneNumber(updatedStudent.getPhoneNumber());
            existing.setAddress(updatedStudent.getAddress());

            return studentRepository.save(existing);
        }
        return studentRepository.save(updatedStudent);
    }

    // ✅ Delete student + user record
    public void deleteStudent(String rollNumber) {
        studentRepository.deleteById(rollNumber);
        userRepository.deleteById(rollNumber);
    }
}
