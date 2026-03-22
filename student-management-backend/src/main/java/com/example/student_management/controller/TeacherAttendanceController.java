package com.example.student_management.controller;

import com.example.student_management.model.TeacherAttendance;
import com.example.student_management.repository.TeacherAttendanceRepository;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/api/attendance/teacher")
@CrossOrigin(origins = "http://localhost:3000")
public class TeacherAttendanceController {

    private final TeacherAttendanceRepository repo;

    public TeacherAttendanceController(TeacherAttendanceRepository repo) {
        this.repo = repo;
    }

    /**
     * ✅ Mark or update teacher attendance (no duplicates)
     */
    @PostMapping("/mark")
    public String markAttendance(@RequestBody List<TeacherAttendance> attendanceList) {
        if (attendanceList == null || attendanceList.isEmpty()) {
            return "❌ No attendance data received.";
        }

        LocalDate date = attendanceList.get(0).getDate() != null
                ? attendanceList.get(0).getDate()
                : LocalDate.now();

        int inserted = 0, updated = 0;

        for (TeacherAttendance record : attendanceList) {
            String teacherId = record.getTeacherId();
            String status = (record.getStatus() != null &&
                    record.getStatus().trim().toLowerCase().startsWith("p"))
                    ? "Present" : "Absent";

            record.setStatus(status);
            record.setDate(date);

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
        LocalDate localDate = LocalDate.parse(date);
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

            if (status != null && status.trim().toLowerCase().startsWith("p")) {
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
