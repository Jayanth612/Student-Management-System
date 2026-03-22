package com.example.student_management.controller;

import com.example.student_management.model.StudentAttendance;
import com.example.student_management.repository.StudentAttendanceRepository;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/api/attendance/student")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentAttendanceController {

    private final StudentAttendanceRepository repo;

    public StudentAttendanceController(StudentAttendanceRepository repo) {
        this.repo = repo;
    }

    /**
     * ✅ Mark or update attendance for students
     */
    @PostMapping("/mark")
    public String markAttendance(@RequestBody List<StudentAttendance> attendanceList) {
        if (attendanceList == null || attendanceList.isEmpty()) {
            return "❌ No attendance data received.";
        }

        LocalDate date = attendanceList.get(0).getDate() != null
                ? attendanceList.get(0).getDate()
                : LocalDate.now();

        int inserted = 0, updated = 0;

        for (StudentAttendance record : attendanceList) {
            String roll = record.getRollNumber();
            String status = (record.getStatus() != null &&
                    record.getStatus().trim().toLowerCase().startsWith("p"))
                    ? "Present" : "Absent";

            record.setStatus(status);
            record.setDate(date);

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
        LocalDate localDate = LocalDate.parse(date);
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

            if (status != null && status.trim().toLowerCase().startsWith("p")) {
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
