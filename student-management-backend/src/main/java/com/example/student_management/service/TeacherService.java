package com.example.student_management.service;

import com.example.student_management.model.Teacher;
import com.example.student_management.model.User;
import com.example.student_management.repository.TeacherRepository;
import com.example.student_management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TeacherService {

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }

    public Optional<Teacher> getTeacherById(String teacherId) {
        return teacherRepository.findById(teacherId);
    }

    public Teacher addTeacher(Teacher teacher) {
        Teacher savedTeacher = teacherRepository.save(teacher);

        if (!userRepository.existsById(savedTeacher.getTeacherId())) {
            User user = new User(savedTeacher.getTeacherId(), savedTeacher.getTeacherId(), "TEACHER");
            userRepository.save(user);
        }

        return savedTeacher;
    }

    public Teacher updateTeacher(Teacher updatedTeacher) {
        Optional<Teacher> existingOpt = teacherRepository.findById(updatedTeacher.getTeacherId());
        if (existingOpt.isPresent()) {
            Teacher existing = existingOpt.get();

            existing.setName(updatedTeacher.getName());
            existing.setSubject(updatedTeacher.getSubject());
            existing.setEmail(updatedTeacher.getEmail());
            existing.setPhone(updatedTeacher.getPhone());
            existing.setGender(updatedTeacher.getGender());
            existing.setDepartment(updatedTeacher.getDepartment());
            existing.setQualification(updatedTeacher.getQualification());
            existing.setExperience(updatedTeacher.getExperience());
            existing.setDesignation(updatedTeacher.getDesignation());
            existing.setAddress(updatedTeacher.getAddress());

            return teacherRepository.save(existing);
        }
        return teacherRepository.save(updatedTeacher);
    }

    public void deleteTeacher(String teacherId) {
        teacherRepository.deleteById(teacherId);
        userRepository.deleteById(teacherId);
    }
}
