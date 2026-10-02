-- Common CampusSync queries
SELECT u.full_name, u.email, u.role
FROM users u
ORDER BY u.role, u.full_name;

SELECT c.code, c.name, s.day_of_week, s.start_time, s.end_time, r.name AS room
FROM schedules s
JOIN courses c ON c.course_id = s.course_id
JOIN rooms r ON r.room_id = s.room_id
ORDER BY s.day_of_week, s.start_time;

SELECT c.code, c.name
FROM enrollments e
JOIN courses c ON c.course_id = e.course_id
WHERE e.user_id = :student_id
ORDER BY c.code;
