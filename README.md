# Campus Sync

### Academic Scheduling & Coordination Platform

Campus Sync is a web-based academic scheduling and coordination platform designed for the **CSE Department of Patuakhali Science and Technology University (PSTU)**.

The system aims to bring students, teachers, class representatives, and department administrators into one shared academic workspace where schedules, class confirmations, released time slots, courses, notices, assignments, and academic resources can be managed more efficiently.

> 🚧 **Status:** Active development

---

## 🌐 Live Demo

**[Open Campus Sync](YOUR_LIVE_LINK_HERE)**

> The current live version is a frontend prototype using mock data.
> Backend integration with ASP.NET Core and the production database is planned as development progresses.

---

## ✨ Project Overview

Academic schedules can change frequently because of teacher availability, room constraints, cancelled classes, makeup classes, and other departmental activities.

Campus Sync is designed to provide a centralized platform for handling these situations.

The core concept is the **Dynamic Schedule Confirmation System**:

1. Teachers receive their upcoming class schedule.
2. Teachers confirm or decline their assigned classes.
3. Unconfirmed or declined classes can be released.
4. Released slots can become available for eligible teachers.
5. The system checks scheduling conflicts before reservations are made.
6. Students and class representatives receive the updated academic information.

This creates a shared academic workflow instead of relying entirely on manual communication.

---

## 👥 User Roles

Campus Sync is designed around four major user roles:

| Role | Main Responsibilities |
|------|------------------------|
| 👨‍💼 Administrator | Manage users, courses, rooms, schedules, notices, and reservations |
| 👨‍🏫 Teacher | View schedules, confirm classes, reserve released slots, manage courses and resources |
| 👨‍🎓 Student | View timetable, courses, assignments, notices, resources, and notifications |
| 🧑‍💼 Class Representative | Coordinate class information, schedules, notices, and notifications |

---

## 🚀 Current Features

### Public & Authentication

- Campus Sync landing page
- University-oriented branding
- Login interface
- Demo role selection
- Responsive layout

### Administrator

- Dashboard
- User management
- Student management
- Teacher management
- Course management
- Room management
- Schedule management
- Reservation management
- Notices
- Audit log

### Teacher

- Teacher dashboard
- Schedule overview
- Class confirmation workflow
- Confirm / decline classes
- Released schedule slots
- Extra-class reservation workflow
- Course workspace
- Assignments
- Resources
- Notifications
- Profile

### Student

- Student dashboard
- Timetable
- Courses
- Assignments
- Resources
- Notices
- Notifications
- Profile

### Class Representative

- CR dashboard
- Schedule
- Notices
- Notifications
- Profile

---

## 🧠 Core Workflow

### Dynamic Schedule Confirmation

```text
Teacher receives upcoming schedule
                │
                ▼
       ┌─────────────────┐
       │ Confirm class?  │
       └────────┬────────┘
                │
       ┌────────┴────────┐
       │                 │
    Confirm           Decline /
       │              No Response
       ▼                 │
 Class remains           ▼
 scheduled          Slot released
                         │
                         ▼
                Eligible teachers
                    can reserve
                         │
                         ▼
                  Conflict check
                         │
                         ▼
                  Reservation