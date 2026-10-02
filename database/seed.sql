INSERT INTO users (user_id, full_name, email, role) VALUES
  (1, 'Campus Administrator', 'admin@campussync.test', 'admin'),
  (2, 'Avery Teacher', 'teacher@campussync.test', 'teacher'),
  (3, 'Jordan Student', 'student@campussync.test', 'student'),
  (4, 'Casey Representative', 'cr@campussync.test', 'cr');

INSERT INTO courses (course_id, code, name, teacher_id) VALUES
  (1, 'SYS101', 'Introduction to Systems', 2),
  (2, 'DB202', 'Database Design', 2);

INSERT INTO rooms (room_id, name, capacity) VALUES
  (1, 'Room 101', 40),
  (2, 'Lab 204', 30);

INSERT INTO schedules (schedule_id, course_id, room_id, day_of_week, start_time, end_time) VALUES
  (1, 1, 1, 'Monday', '09:00', '10:30'),
  (2, 2, 2, 'Wednesday', '11:00', '12:30');

INSERT INTO enrollments (user_id, course_id) VALUES (3, 1), (3, 2);
