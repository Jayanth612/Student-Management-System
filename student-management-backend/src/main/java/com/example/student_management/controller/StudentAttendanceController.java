package com.example.student_management.controller;

import com.example.student_management.model.StudentAttendance;
import com.example.student_management.repository.StudentAttendanceRepository;
import com.example.student_management.repository.StudentRepository;
import com.example.student_management.model.Student;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.*;

@RestController
@RequestMapping("/api/attendance/student")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentAttendanceController {

    private final StudentAttendanceRepository repo;
    private final StudentRepository studentRepository;

    public StudentAttendanceController(StudentAttendanceRepository repo, StudentRepository studentRepository) {
        this.repo = repo;
        this.studentRepository = studentRepository;
    }

    /**
     * ✅ Mark or update attendance for students
     */
    @PostMapping("/mark")
    @Transactional
    public String markAttendance(@RequestBody List<StudentAttendance> attendanceList) {
        if (attendanceList == null || attendanceList.isEmpty()) {
            return "❌ No attendance data received.";
        }

        LocalDate date = attendanceList.get(0).getDate() != null
                ? attendanceList.get(0).getDate() : LocalDate.now();

        int inserted = 0, updated = 0;

        for (StudentAttendance record : attendanceList) {
            if (record == null || record.getRollNumber() == null || record.getRollNumber().isBlank()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Every record needs a roll number");
            }
            Student student = studentRepository.findById(record.getRollNumber())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                            "Student not found: " + record.getRollNumber()));
            if (record.getDate() != null && !date.equals(record.getDate())) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "All attendance records must use the same date");
            }
            String roll = record.getRollNumber();
            String normalizedStatus = record.getStatus() == null ? "" : record.getStatus().trim();
            String status;
            if ("present".equalsIgnoreCase(normalizedStatus)) {
                status = "Present";
            } else if ("absent".equalsIgnoreCase(normalizedStatus)) {
                status = "Absent";
            } else {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "Status must be Present or Absent");
            }

            record.setStatus(status);
            record.setDate(date);
            record.setName(student.getName());
            record.setStandard(student.getStandard());

            // ✅ Check if the student already has attendance for this date
            Optional<StudentAttendance> existingOpt = repo.findByRollNumberAndDate(roll, date);

            if (existingOpt.isPresent()) {
                StudentAttendance existing = existingOpt.get();

                // ✅ Update existing record instead of inserting
                existing.setStatus(record.getStatus());
                existing.setName(record.getName());
                existing.setStandard(record.getStandard());
                repo.save(existing);
                updated++;
            } else {
                // ✅ New attendance entry
                repo.save(record);
                inserted++;
            }
        }

        return "✅ Student attendance for " + date +
                " | Inserted: " + inserted +
                " | Updated: " + updated;
    }

    /**
     * ✅ View attendance for a specific date
     */
    @GetMapping("/by-date")
    public List<StudentAttendance> getAttendanceByDate(@RequestParam String date) {
        LocalDate localDate;
        try {
            localDate = LocalDate.parse(date);
        } catch (DateTimeParseException exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Date must use ISO format yyyy-MM-dd", exception);
        }
        return repo.findByDate(localDate);
    }

    /**
     * ✅ View complete attendance history
     */
    @GetMapping("/history")
    public List<StudentAttendance> getAllAttendance() {
        return repo.findAll();
    }
	
	/**
	* ✅ View attendance for a specific student (by roll number)
	*/
	@GetMapping("/register")
	public List<StudentAttendance> getAttendanceByRollNumber(@RequestParam String rollNumber) {
		return repo.findByRollNumber(rollNumber);
	}
	
    /**
     * ✅ View overall attendance percentages for all students
     */
    @GetMapping("/overall")
    public List<Map<String, Object>> getOverallAttendance() {
        List<StudentAttendance> allRecords = repo.findAll();
        Map<String, Long> totalCount = new HashMap<>();
        Map<String, Long> presentCount = new HashMap<>();
        Map<String, String> names = new HashMap<>();
        Map<String, String> standards = new HashMap<>();

        for (StudentAttendance record : allRecords) {
            String roll = record.getRollNumber();
            String status = record.getStatus();
            totalCount.put(roll, totalCount.getOrDefault(roll, 0L) + 1);
            names.put(roll, record.getName());
            standards.put(roll, record.getStandard());

            if (status != null && "Present".equalsIgnoreCase(status.trim())) {
                presentCount.put(roll, presentCount.getOrDefault(roll, 0L) + 1);
            }
        }

        List<Map<String, Object>> result = new ArrayList<>();
        for (String roll : totalCount.keySet()) {
            long total = totalCount.get(roll);
            long present = presentCount.getOrDefault(roll, 0L);
            double percentage = total == 0 ? 0.0 : (present * 100.0 / total);

            Map<String, Object> data = new HashMap<>();
            data.put("rollNumber", roll);
            data.put("name", names.get(roll));
            data.put("standard", standards.get(roll));
            data.put("totalDays", total);
            data.put("presentDays", present);
            data.put("attendancePercentage", percentage);
            result.add(data);
        }

        return result;
    }
}
