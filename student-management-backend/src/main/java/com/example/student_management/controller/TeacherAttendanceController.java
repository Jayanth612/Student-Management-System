package com.example.student_management.controller;

import com.example.student_management.model.TeacherAttendance;
import com.example.student_management.repository.TeacherAttendanceRepository;
import com.example.student_management.repository.TeacherRepository;
import com.example.student_management.model.Teacher;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.*;

@RestController
@RequestMapping("/api/attendance/teacher")
@CrossOrigin(origins = "http://localhost:3000")
public class TeacherAttendanceController {

    private final TeacherAttendanceRepository repo;
    private final TeacherRepository teacherRepository;

    public TeacherAttendanceController(TeacherAttendanceRepository repo, TeacherRepository teacherRepository) {
        this.repo = repo;
        this.teacherRepository = teacherRepository;
    }

    /**
     * ✅ Mark or update teacher attendance (no duplicates)
     */
    @PostMapping("/mark")
    @Transactional
    public String markAttendance(@RequestBody List<TeacherAttendance> attendanceList) {
        if (attendanceList == null || attendanceList.isEmpty()) {
            return "❌ No attendance data received.";
        }

        LocalDate date = attendanceList.get(0).getDate() != null
                ? attendanceList.get(0).getDate()
                : LocalDate.now();

        int inserted = 0, updated = 0;

        for (TeacherAttendance record : attendanceList) {
            if (record == null || record.getTeacherId() == null || record.getTeacherId().isBlank()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Every record needs a teacher ID");
            }
            Teacher teacher = teacherRepository.findById(record.getTeacherId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                            "Teacher not found: " + record.getTeacherId()));
            if (record.getDate() != null && !date.equals(record.getDate())) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "All attendance records must use the same date");
            }
            String teacherId = record.getTeacherId();
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
            record.setName(teacher.getName());
            record.setSubject(teacher.getSubject());

            Optional<TeacherAttendance> existingOpt = repo.findByTeacherIdAndDate(teacherId, date);

            if (existingOpt.isPresent()) {
                TeacherAttendance existing = existingOpt.get();
                existing.setStatus(record.getStatus());
                existing.setName(record.getName());
                existing.setSubject(record.getSubject());
                repo.save(existing);
                updated++;
            } else {
                repo.save(record);
                inserted++;
            }
        }

        return "✅ Teacher attendance for " + date +
                " | Inserted: " + inserted +
                " | Updated: " + updated;
    }

    /**
     * ✅ View teacher attendance by date
     */
    @GetMapping("/by-date")
    public List<TeacherAttendance> getAttendanceByDate(@RequestParam String date) {
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
     * ✅ View full teacher attendance history
     */
    @GetMapping("/history")
    public List<TeacherAttendance> getAllAttendance() {
        return repo.findAll();
    }

    /**
     * ✅ View overall teacher attendance percentages
     */
    @GetMapping("/overall")
    public List<Map<String, Object>> getOverallAttendance() {
        List<TeacherAttendance> allRecords = repo.findAll();
        Map<String, Long> totalCount = new HashMap<>();
        Map<String, Long> presentCount = new HashMap<>();
        Map<String, String> names = new HashMap<>();
        Map<String, String> subjects = new HashMap<>();

        for (TeacherAttendance record : allRecords) {
            String tid = record.getTeacherId();
            String status = record.getStatus();
            totalCount.put(tid, totalCount.getOrDefault(tid, 0L) + 1);
            names.put(tid, record.getName());
            subjects.put(tid, record.getSubject());

            if (status != null && "Present".equalsIgnoreCase(status.trim())) {
                presentCount.put(tid, presentCount.getOrDefault(tid, 0L) + 1);
            }
        }

        List<Map<String, Object>> result = new ArrayList<>();
        for (String tid : totalCount.keySet()) {
            long total = totalCount.get(tid);
            long present = presentCount.getOrDefault(tid, 0L);
            double percentage = total == 0 ? 0.0 : (present * 100.0 / total);

            Map<String, Object> data = new HashMap<>();
            data.put("teacherId", tid);
            data.put("name", names.get(tid));
            data.put("subject", subjects.get(tid));
            data.put("totalDays", total);
            data.put("presentDays", present);
            data.put("attendancePercentage", percentage);
            result.add(data);
        }

        return result;
    }
}
