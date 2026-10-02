-- CampusSync relational schema
CREATE TABLE users (
  user_id INTEGER PRIMARY KEY,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL UNIQUE,
  role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'teacher', 'student', 'cr')),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE courses (
  course_id INTEGER PRIMARY KEY,
  code VARCHAR(20) NOT NULL UNIQUE,
  name VARCHAR(160) NOT NULL,
  teacher_id INTEGER REFERENCES users(user_id)
);

CREATE TABLE rooms (
  room_id INTEGER PRIMARY KEY,
  name VARCHAR(80) NOT NULL UNIQUE,
  capacity INTEGER NOT NULL CHECK (capacity > 0)
);

CREATE TABLE schedules (
  schedule_id INTEGER PRIMARY KEY,
  course_id INTEGER NOT NULL REFERENCES courses(course_id),
  room_id INTEGER NOT NULL REFERENCES rooms(room_id),
  day_of_week VARCHAR(12) NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  CHECK (end_time > start_time)
);

CREATE TABLE enrollments (
  user_id INTEGER NOT NULL REFERENCES users(user_id),
  course_id INTEGER NOT NULL REFERENCES courses(course_id),
  PRIMARY KEY (user_id, course_id)
);
