const CampusSyncTimeSlots = {
  1: { startTime: "09:00", endTime: "09:40", label: "09:00-09:40" },
  2: { startTime: "09:45", endTime: "10:25", label: "09:45-10:25" },
  3: { startTime: "10:30", endTime: "11:10", label: "10:30-11:10" },
  4: { startTime: "11:15", endTime: "11:55", label: "11:15-11:55" },
  5: { startTime: "12:00", endTime: "12:40", label: "12:00-12:40" },
  6: { startTime: "14:15", endTime: "14:55", label: "14:15-14:55" },
  7: { startTime: "15:05", endTime: "15:45", label: "15:05-15:45" }
};

const CampusSyncCourseCatalog = [
  { semester: 1, courses: [
    ["PHY111", "Physics-I", "3.00"], ["PHY112", "Physics-I Sessional", "0.75"], ["CHE111", "Chemistry", "3.00"], ["CHE112", "Chemistry Sessional", "0.75"], ["MAT111", "Mathematics-I", "3.00"], ["EEE111", "Basic Electrical Engineering", "3.00"], ["EEE112", "Basic Electrical Engineering Sessional", "1.50"], ["CIT111", "Programming Language", "3.00"], ["CIT112", "Programming Language Sessional", "1.50"], ["CCE112", "Engineering Drawing", "0.75"]
  ] },
  { semester: 2, courses: [
    ["PHY121", "Physics-II", "3.00"], ["PHY122", "Physics-II Sessional", "0.75"], ["MAT121", "Mathematics-II", "3.00"], ["CIT121", "Discrete Mathematics", "3.00"], ["LCM121", "Communicative English", "2.00"], ["EEE121", "Electronic Device and Circuits", "3.00"], ["EEE122", "Electronic Device and Circuits Sessional", "1.50"], ["CCE121", "Object Oriented Programming", "3.00"], ["CCE122", "Object Oriented Programming Sessional", "1.50"], ["CCE124", "Computer Programming Contest-I", "-"]
  ] },
  { semester: 3, courses: [
    ["CIT211", "Data Structure and Algorithms", "3.00"], ["CIT212", "Data Structure and Algorithms Sessional", "1.50"], ["CIT213", "Software Engineering", "3.00"], ["EEE221", "Data Communication and Engineering", "3.00"], ["MAT211", "Mathematics-III", "3.00"], ["EEE211", "Electrical Technology", "3.00"], ["EEE212", "Electrical Technology Sessional", "1.50"], ["AIS211", "Accounting and Management", "3.00"]
  ] },
  { semester: 4, courses: [
    ["CCE221", "Digital Logic Design", "3.00"], ["CCE222", "Digital Logic Design Sessional", "1.50"], ["CCE223", "Database System", "3.00"], ["CCE224", "Database System Sessional", "1.50"], ["AES221", "Government and Economics", "3.00"], ["MAT221", "Mathematics-IV", "3.00"], ["CIT220", "Web Programming Project", "1.50"], ["CIT221", "Information System Analysis and Design", "3.00"], ["CIT222", "Information System Analysis and Design Sessional", "1.50"], ["CIT224", "Computer Programming Contest-II", "-"]
  ] },
  { semester: 5, courses: [
    ["CIT311", "Microprocessors and Assembly Language", "3.00"], ["CIT312", "Microprocessors and Assembly Language Sessional", "1.50"], ["CIT313", "Computer Organization and Architecture", "3.00"], ["CIT315", "Artificial Intelligence", "3.00"], ["CIT316", "Artificial Intelligence Sessional", "3.00"], ["CCE310", "Software Development Project-I", "1.50"], ["CCE311", "Numerical Methods", "3.00"], ["CCE312", "Numerical Methods Sessional", "0.75"], ["CCE313", "Computer Networks", "3.00"], ["CCE314", "Computer Networks Sessional", "1.50"]
  ] },
  { semester: 6, courses: [
    ["CIT320", "Software Development Project-II", "1.50"], ["CIT321", "Operating System", "3.00"], ["CIT322", "Operating System Sessional", "1.50"], ["CIT323", "Simulation and Modeling", "3.00"], ["CIT324", "Simulation and Modeling Sessional", "1.50"], ["EEE321", "Digital Electronics and Pulse Techniques", "3.00"], ["EEE322", "Digital Electronics and Pulse Techniques Sessional", "0.75"], ["CCE320", "Computer Programming Contest-III", "-"], ["CCE321", "Computer Peripheral and Interfacing", "3.00"], ["CCE322", "Computer Peripheral and Interfacing Sessional", "1.50"], ["CCE323", "Optical Fiber Communication", "3.00"]
  ] },
  { semester: 7, courses: [
    ["CSE410", "Project/Thesis", "3.00"], ["CSE412", "Industrial Training", "1.00"], ["CCE411", "Algorithm Engineering", "3.00"], ["CCE413", "VLSI Design", "3.00"], ["CCE415", "Network Routing and Switching", "3.00"], ["CCE416", "Network Routing and Switching Sessional", "1.50"], ["CCE417", "Data Warehousing and Mining", "3.00"], ["CIT411", "Compiler Design and Automata Theory", "3.00"], ["CIT412", "Compiler Design and Automata Theory Sessional", "1.50"]
  ] }
].map((semester) => ({
  semester: semester.semester,
  courses: semester.courses.map(([courseId, courseName, credits]) => ({ courseId, courseName, credits }))
}));

const CampusSyncRoutineRooms = {
  1: "Library 1st Floor",
  2: "CR-301",
  4: "PME Lab",
  6: "CR-303/501",
  7: "CR-302"
};

const CampusSyncLecturerIdentifiers = {
  MAM: "Professor Dr. Md. Abdul Masud",
  MMR: "Md. Mahbubur Rahman",
  MSZ: "Professor Dr. Md. Sobuz",
  MIB: "Prof. Golam Md. Muradul Bashir",
  MAB: "Md. Ashiqur Rahman",
  SMT: "Prof. Dr. S.M. Islam",
  NR: "Md. Naimur Rahman",
  BDZ: "Prof. Dr. Badiuzzaman",
  ABK: "Professor Abdul Basher Khan",
  FSM: "Dr. Farzana Sultana Mim",
  AAJ: "Abdullah Al Jaid Juna",
  DKH: "Prof. Dr. Khokon Hossain",
  ORC: "Prof. Dr. Oly Roy Chowdhury",
  MTS: "MTS Muhtasim",
  SMZ: "Prof. Dr Muhammed",
  MB: "Muradul Bashir",
  MAR: "Md. Ashiqur Rahman",
  SM: "Sorna Mozumder",
  MNU: "MNU",
  AES: "Ashequr-E-Elahi"
};

const CampusSyncRoutineStatusValues = ["Pending", "Confirmed", "Declined", "Released", "Reserved", "Conflict", "Cancelled"];

function createRoutineEntry(day, slotNumber, semester, room, courseId, courseName, lecturerIdentifier, options = {}) {
  const time = CampusSyncTimeSlots[slotNumber];
  return {
    scheduleId: `${day.toLowerCase()}-${semester}-${slotNumber}-${courseId}`,
    day,
    slotNumber,
    startTime: time?.startTime || "",
    endTime: time?.endTime || "",
    time: time?.label || "",
    semester,
    room,
    courseId,
    courseName,
    lecturerIdentifier,
    status: options.status || "Confirmed",
    confirmationStatus: options.confirmationStatus || "Confirmed",
    isReleased: options.isReleased || false,
    reservationStatus: options.reservationStatus || "",
    isVerified: options.isVerified !== false,
    notes: options.notes || ""
  };
}

const CampusSyncRoutine = [
  ["Sunday", 1, 4, "PME Lab", "CCE221", "Digital Logic Design", "MAM / MMR"], ["Sunday", 2, 4, "PME Lab", "CCE221", "Digital Logic Design", "MAM / MMR"], ["Sunday", 3, 4, "PME Lab", "CCE223", "Database System", "MSZ / MIB"], ["Sunday", 4, 4, "PME Lab", "CCE223", "Database System", "MSZ / MIB"], ["Sunday", 5, 4, "PME Lab", "CCE222", "Digital Logic Design Sessional", "MIB / MMR"], ["Sunday", 6, 4, "PME Lab", "CCE222", "Digital Logic Design Sessional", "MAB / MMR"], ["Sunday", 7, 4, "PME Lab", "CCE222", "Digital Logic Design Sessional", "MAB / MMR"],
  ["Sunday", 2, 7, "CR-302", "CIT323", "Simulation and Modeling", "MAM / FSM"], ["Sunday", 5, 7, "CR-302", "CCE415", "Network Routing and Switching", "SMZ / MIB"],
  ["Sunday", 2, 1, "Library 1st Floor", "EEE112", "Basic Electrical Engineering Sessional", "AAJ / NR"], ["Sunday", 3, 1, "Library 1st Floor", "EEE112", "Basic Electrical Engineering Sessional", "AAJ / NR"], ["Sunday", 4, 1, "Library 1st Floor", "EEE112", "Basic Electrical Engineering Sessional", "AAJ / NR"], ["Sunday", 5, 1, "Library 1st Floor", "MAT111", "Mathematics-I", "M? / MMR"],
  ["Sunday", 1, 6, "CR-303/501", "CIT323", "Simulation and Modeling", "MAM / FSM"], ["Sunday", 2, 6, "CR-303/501", "CIT321", "Operating System", "SMT / NR"], ["Sunday", 3, 6, "CR-303/501", "CIT321", "Operating System", "MAM / MTS"], ["Sunday", 5, 6, "CR-303/501", "CIT324", "Simulation and Modeling Sessional", "MAM / MMR"], ["Sunday", 6, 6, "CR-303/501", "CIT324", "Simulation and Modeling Sessional", "MAM / MMR"], ["Sunday", 7, 6, "CR-303/501", "CIT324", "Simulation and Modeling Sessional", "MAM / MMR"],
  ["Sunday", 1, 2, "CR-301", "CCE122", "Object Oriented Programming Sessional", "MSZ / SM"], ["Sunday", 2, 2, "CR-301", "CCE122", "Object Oriented Programming Sessional", "MSZ / SM"], ["Sunday", 3, 2, "CR-301", "CCE122", "Object Oriented Programming Sessional", "MSZ / SM"], ["Sunday", 4, 2, "CR-301", "PHY121", "Physics-II", "DKH / ORC"], ["Sunday", 5, 2, "CR-301", "MAT121", "Mathematics-II", "MBH / MMR"],
  ["Monday", 1, 4, "PME Lab", "MAT221", "Mathematics-IV", "MBH / MMR"], ["Monday", 2, 4, "PME Lab", "AES221", "Government and Economics", "BDZ / ABK"], ["Monday", 3, 4, "PME Lab", "CCE221", "Digital Logic Design", "MIB / MMR"], ["Monday", 5, 4, "PME Lab", "CCE224", "Database System Sessional", "MSZ / MIB"],
  ["Monday", 1, 7, "CR-302", "CCE413", "VLSI Design", "MB / MSZ"], ["Monday", 2, 7, "CR-302", "CCE413", "VLSI Design", "MB / MSZ"], ["Monday", 3, 7, "CR-302", "CCE415", "Network Routing and Switching", "SMZ / MIB"], ["Monday", 4, 7, "CR-302", "CIT411", "Compiler Design and Automata Theory", "MAM / MB"], ["Monday", 6, 7, "CR-302", "PHY?", "To verify from original routine", "VERIFY FROM ORIGINAL ROUTINE", { isVerified: false, notes: "Verify from original routine." }],
  ["Monday", 2, 1, "Library 1st Floor", "PHY112", "Physics-II Sessional", "DKH / M?H"], ["Monday", 3, 1, "Library 1st Floor", "PHY112", "Physics-II Sessional", "DKH / M?H"], ["Monday", 4, 1, "Library 1st Floor", "PHY112", "Physics-II Sessional", "DKH / M?H"], ["Monday", 5, 1, "Library 1st Floor", "EEE111", "Basic Electrical Engineering", "AAJ / NR"], ["Monday", 6, 1, "Library 1st Floor", "PHY111", "Physics-I", "DKH / M?H"], ["Monday", 7, 1, "Library 1st Floor", "MAT111", "Mathematics-I", "MBH / MMR"],
  ["Monday", 1, 6, "CR-303/501", "CIT322", "Operating System Sessional", "SMT / NR"], ["Monday", 2, 6, "CR-303/501", "CIT323", "Simulation and Modeling", "MAM / FSM"], ["Monday", 4, 6, "CR-303/501", "CCE322", "Computer Peripheral and Interfacing Sessional", "MSZ / MIB"], ["Monday", 5, 6, "CR-303/501", "CCE?", "To verify from original routine", "VERIFY FROM ORIGINAL ROUTINE", { isVerified: false, notes: "Verify from original routine." }],
  ["Monday", 1, 2, "CR-301", "PHY122", "Physics-II Sessional", "DKH / ORC"], ["Monday", 2, 2, "CR-301", "PHY122", "Physics-II Sessional", "DKH / ORC"],
  ["Tuesday", 1, 4, "PME Lab", "AES221", "Government and Economics", "BDZ / ABK"], ["Tuesday", 2, 4, "PME Lab", "CCE223", "Database System", "MSZ / MIB"], ["Tuesday", 3, 4, "PME Lab", "CIT221", "Information System Analysis and Design", "MTS / MIB"], ["Tuesday", 5, 4, "PME Lab", "MAT221", "Mathematics-IV", "MBH / MMR"],
  ["Tuesday", 1, 7, "CR-302", "CCE413", "VLSI Design", "MB / MSZ"], ["Tuesday", 4, 7, "CR-302", "CCE417", "Data Warehousing and Mining", "SM / MB"],
  ["Tuesday", 1, 1, "Library 1st Floor", "CIT112", "Programming Language Sessional", "MAM / MMR"], ["Tuesday", 2, 1, "Library 1st Floor", "CIT112", "Programming Language Sessional", "MAM / MMR"], ["Tuesday", 3, 1, "Library 1st Floor", "CIT112", "Programming Language Sessional", "MAM / MMR"], ["Tuesday", 4, 1, "Library 1st Floor", "CIT111", "Programming Language", "MAM / MMR"],
  ["Tuesday", 1, 6, "CR-303/501", "CIT323", "Simulation and Modeling", "SMT / NR"], ["Tuesday", 3, 6, "CR-303/501", "CCE321", "Computer Peripheral and Interfacing", "MSZ / MIB"], ["Tuesday", 4, 6, "CR-303/501", "CCE321", "Computer Peripheral and Interfacing", "MSZ / MIB"], ["Tuesday", 5, 6, "CR-303/501", "CCE322", "Computer Peripheral and Interfacing Sessional", "SMT / NR"], ["Tuesday", 6, 6, "CR-303/501", "CCE322", "Computer Peripheral and Interfacing Sessional", "SMT / NR"], ["Tuesday", 7, 6, "CR-303/501", "CCE322", "Computer Peripheral and Interfacing Sessional", "SMT / NR"],
  ["Tuesday", 1, 2, "CR-301", "CIT121", "Discrete Mathematics", "FSM / M?H"], ["Tuesday", 2, 2, "CR-301", "MAT121", "Mathematics-II", "MBH / MMR"],
  ["Wednesday", 1, 4, "PME Lab", "CIT221", "Information System Analysis and Design", "MTS / MIB"], ["Wednesday", 2, 4, "PME Lab", "CIT221", "Information System Analysis and Design", "MTS / MIB"], ["Wednesday", 4, 4, "PME Lab", "MAT221", "Mathematics-IV", "MBH / MMR"], ["Wednesday", 5, 4, "PME Lab", "CIT222", "Information System Analysis and Design Sessional", "MTS / MIB"],
  ["Wednesday", 1, 7, "CR-302", "CIT411", "Compiler Design and Automata Theory", "MAM / FSM"], ["Wednesday", 3, 7, "CR-302", "CCE415", "Network Routing and Switching", "SMZ / MIB"], ["Wednesday", 4, 7, "CR-302", "CIT411", "Compiler Design and Automata Theory", "MAM / FSM"], ["Wednesday", 5, 7, "CR-302", "CCE416", "Network Routing and Switching Sessional", "SMZ / MIB"],
  ["Wednesday", 1, 1, "Library 1st Floor", "CHE112", "Chemistry Sessional", "MNU / MTS"], ["Wednesday", 2, 1, "Library 1st Floor", "CHE112", "Chemistry Sessional", "MNU / MTS"], ["Wednesday", 3, 1, "Library 1st Floor", "CHE112", "Chemistry Sessional", "MNU / MTS"], ["Wednesday", 5, 1, "Library 1st Floor", "PHY111", "Physics-I", "DKH / MTS"],
  ["Wednesday", 2, 6, "CR-303/501", "CCE321", "Computer Peripheral and Interfacing", "MSZ / SM"], ["Wednesday", 3, 6, "CR-303/501", "CCE321", "Computer Peripheral and Interfacing", "MSZ / SM"], ["Wednesday", 4, 6, "CR-303/501", "CIT321", "Operating System", "M? / MTS"], ["Wednesday", 5, 6, "CR-303/501", "CIT320", "Software Development Project-II", "MTS / M?K"],
  ["Wednesday", 1, 2, "CR-301", "PHY121", "Physics-II", "DKH / ORC"], ["Wednesday", 2, 2, "CR-301", "PHY121", "Physics-II", "DKH / ORC"], ["Wednesday", 3, 2, "CR-301", "CIT121", "Discrete Mathematics", "FSM / M?H"], ["Wednesday", 4, 2, "CR-301", "CCE121", "Object Oriented Programming", "MSZ / SM"], ["Wednesday", 5, 2, "CR-301", "EEE121", "Electronic Device and Circuits", "AES / NR"],
  ["Thursday", 1, 4, "PME Lab", "AES221", "Government and Economics", "BDZ / ABK"], ["Thursday", 2, 4, "PME Lab", "MAT221", "Mathematics-IV", "MBH / MMR"], ["Thursday", 5, 4, "PME Lab", "CIT220", "Web Programming Project", "MAR / MMR"],
  ["Thursday", 1, 7, "CR-302", "CCE417", "Data Warehousing and Mining", "SM / MB"], ["Thursday", 2, 7, "CR-302", "CCE417", "Data Warehousing and Mining", "SM / MB"], ["Thursday", 3, 7, "CR-302", "CCE411", "Algorithm Engineering", "MAM / MB"], ["Thursday", 4, 7, "CR-302", "CCE411", "Algorithm Engineering", "MAM / MB"], ["Thursday", 5, 7, "CR-302", "CCE412", "Algorithm Engineering Sessional", "DKH / FSM"], ["Thursday", 6, 7, "CR-302", "CCE412", "Algorithm Engineering Sessional", "DKH / FSM"],
  ["Thursday", 1, 1, "Library 1st Floor", "CCE112", "Engineering Drawing", "MSZ / MIB"], ["Thursday", 2, 1, "Library 1st Floor", "CCE112", "Engineering Drawing", "MSZ / MIB"], ["Thursday", 3, 1, "Library 1st Floor", "CCE112", "Engineering Drawing", "MSZ / MIB"], ["Thursday", 5, 1, "Library 1st Floor", "EEE111", "Basic Electrical Engineering", "AAJ / NR"],
  ["Thursday", 1, 6, "CR-303/501", "CCE?", "To verify from original routine", "VERIFY FROM ORIGINAL ROUTINE", { isVerified: false, notes: "Verify from original routine." }], ["Thursday", 2, 6, "CIT?", "CIT?", "To verify from original routine", "VERIFY FROM ORIGINAL ROUTINE", { isVerified: false, notes: "Verify from original routine." }], ["Thursday", 3, 6, "CR-303/501", "CCE321", "Computer Peripheral and Interfacing", "MSZ / SM"], ["Thursday", 4, 6, "CR-303/501", "CIT321", "Operating System", "MAM / MTS"], ["Thursday", 5, 6, "CR-303/501", "CIT320", "Software Development Project-II", "MTS / M?K"],
  ["Thursday", 1, 2, "CR-301", "CCE122", "Object Oriented Programming Sessional", "MSZ / SM"], ["Thursday", 2, 2, "CR-301", "CCE?", "To verify from original routine", "VERIFY FROM ORIGINAL ROUTINE", { isVerified: false, notes: "Verify from original routine." }], ["Thursday", 3, 2, "CR-301", "EEE121", "Electronic Device and Circuits", "AES / NR"]
].map(([day, slotNumber, semester, room, courseId, courseName, lecturerIdentifier, options]) => createRoutineEntry(day, slotNumber, semester, room, courseId, courseName, lecturerIdentifier, options));

const CampusSyncTeacherAssignments = {
  "ayesha.rahman@pstu.ac.bd": { lecturerIdentifiers: ["MTS", "MIB"], courseIds: ["CIT221", "CIT222"], label: "Information System Analysis and Design" },
  "teacher@campussync.test": { lecturerIdentifiers: ["MTS", "MIB"], courseIds: ["CIT221", "CIT222"], label: "Information System Analysis and Design" },
  "farhan.kabir@pstu.ac.bd": { lecturerIdentifiers: ["MSZ", "SMZ"], courseIds: ["CCE223", "CCE224", "CCE415"], label: "Database and Network Systems" }
};

const CampusSyncReleasedSlots = CampusSyncRoutine
  .filter((entry) => ["CIT221", "CIT222", "CCE223", "CCE415"].includes(entry.courseId) && entry.isVerified)
  .slice(0, 12)
  .map((entry, index) => ({
    ...entry,
    reservationId: `released-${index + 1}-${entry.scheduleId}`,
    status: "Available",
    reservationStatus: "Available",
    isReleased: true,
    date: index % 2 === 0 ? "01 Oct 2026" : "02 Oct 2026"
  }));

window.CampusSyncMockData = {
  timeSlots: CampusSyncTimeSlots,
  courseCatalog: CampusSyncCourseCatalog,
  routineRooms: CampusSyncRoutineRooms,
  lecturerIdentifiers: CampusSyncLecturerIdentifiers,
  routineStatusValues: CampusSyncRoutineStatusValues,
  routine: CampusSyncRoutine,
  teacherAssignments: CampusSyncTeacherAssignments,
  releasedSlots: CampusSyncReleasedSlots,
  schedule: CampusSyncRoutine.filter((entry) => entry.semester === 4),
  users: [
    { name: "Dr. Ayesha Rahman", role: "teacher", title: "Assistant Professor", initials: "AR", email: "ayesha.rahman@pstu.ac.bd" },
    { name: "Nafis Ahmed", role: "student", title: "CSE 10th Batch", initials: "NA", email: "nafis.ahmed@pstu.ac.bd" },
    { name: "Samira Karim", role: "admin", title: "Department Administrator", initials: "SK", email: "samira.karim@pstu.ac.bd" },
    { name: "Rafiul Hasan", role: "cr", title: "Class Representative", initials: "RH", email: "rafiul.hasan@pstu.ac.bd" }
  ],
  teachers: [
    { name: "Dr. Ayesha Rahman", department: "Computer Science & Engineering", courses: 4, status: "Active" },
    { name: "Dr. Farhan Kabir", department: "Computer Science & Engineering", courses: 3, status: "Active" },
    { name: "Nusrat Jahan", department: "Computer Science & Engineering", courses: 2, status: "On leave" }
  ],
  students: [
    { name: "Nafis Ahmed", id: "2302015", batch: "CSE 10th", section: "A", status: "Active" },
    { name: "Sadia Sultana", id: "2302031", batch: "CSE 10th", section: "A", status: "Active" },
    { name: "Tanvir Hasan", id: "2302077", batch: "CSE 10th", section: "B", status: "Active" }
  ],
  courses: [
    { code: "CSE 306", name: "Computer Networks", teacher: "Dr. Ayesha Rahman", section: "B", students: 34, status: "Active" },
    { code: "CSE 310", name: "Database Systems", teacher: "Dr. Farhan Kabir", section: "A", students: 38, status: "Active" },
    { code: "CIT 221", name: "Information System Analysis and Design", teacher: "MTS Muhtasim", section: "A", students: 36, status: "Active" },
    { code: "CIT 222", name: "Information System Analysis and Design Sessional", teacher: "MTS Muhtasim", section: "A", students: 36, status: "Active" }
  ],
  rooms: [
    { name: "Room 105", type: "Classroom", capacity: 40, building: "Academic Building 1", status: "Available" },
    { name: "Room 204", type: "Classroom", capacity: 45, building: "Academic Building 2", status: "In use" },
    { name: "PME Lab", type: "Laboratory", capacity: 40, building: "CSE Building", status: "In use" },
    { name: "CR-301", type: "Classroom", capacity: 50, building: "CSE Building", status: "Available" },
    { name: "CR-302", type: "Classroom", capacity: 50, building: "CSE Building", status: "Available" },
    { name: "CR-303/501", type: "Classroom", capacity: 50, building: "CSE Building", status: "In use" },
    { name: "Library 1st Floor", type: "Study space", capacity: 60, building: "Central Library", status: "Available" }
  ],
  reservations: [
    { date: "01 Oct 2026", time: "14:15 - 14:55", room: "CR-302", course: "Network Routing and Switching", teacher: "Available slot", status: "Available" },
    { date: "02 Oct 2026", time: "09:00 - 09:40", room: "PME Lab", course: "Digital Logic Design", teacher: "Dr. Farhan Kabir", status: "Reserved" },
    { date: "02 Oct 2026", time: "11:15 - 11:55", room: "CR-301", course: "Object Oriented Programming", teacher: "Available slot", status: "Available" }
  ],
  notices: [
    { title: "Midterm examination outline", audience: "CSE 10th Batch", author: "Department Office", date: "30 Sep 2026", status: "Published" },
    { title: "Lab 2 room change", audience: "CSE 10th, Section A", author: "Rafiul Hasan", date: "29 Sep 2026", status: "Published" },
    { title: "Project proposal submission", audience: "CSE 10th Batch", author: "Department Office", date: "27 Sep 2026", status: "Draft" }
  ],
  auditLog: [
    { action: "Class confirmation", actor: "Dr. Ayesha Rahman", target: "CIT 221 · Sunday", time: "18 min ago" },
    { action: "Room released", actor: "System", target: "CR-302 · 01 Oct", time: "42 min ago" },
    { action: "Notice published", actor: "Rafiul Hasan", target: "Section A", time: "1 hr ago" },
    { action: "Routine record updated", actor: "Samira Karim", target: "CIT 222 · Wednesday", time: "Yesterday" }
  ],
  notifications: [
    { title: "Confirmation deadline approaching", text: "Confirm tomorrow's class before 9:00 PM.", type: "warning", time: "12 min ago", unread: true },
    { title: "Room released", text: "CR-302 is available for a makeup class tomorrow.", type: "info", time: "1 hr ago", unread: true },
    { title: "New course notice", text: "The CIT 221 course outline is now available.", type: "success", time: "Yesterday", unread: false }
  ]
};
