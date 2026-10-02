document.addEventListener("DOMContentLoaded", () => {
  const teacher = getActiveTeacher();
  const assignments = window.CampusSyncMockData.teacherAssignments[teacher.email] || { courseIds: [], label: "No assigned courses" };
  const confirmationBody = document.querySelector("[data-confirmation-body]");
  const reservationBody = document.querySelector("[data-reservation-body]");
  const assignmentLabel = document.querySelector("[data-assignment-label]");

  if (assignmentLabel) {
    assignmentLabel.classList.remove("skeleton");
    assignmentLabel.textContent = `${teacher.name} · ${assignments.label}`;
  }
  if (confirmationBody) renderConfirmations(confirmationBody, assignments.courseIds);
  if (reservationBody) {
    renderReleasedSlots(reservationBody);
    initializeReservationBuilder();
  }
});

function getActiveTeacher() {
  const sessionUser = JSON.parse(window.sessionStorage.getItem("campusSyncUser") || "null");
  if (sessionUser?.role === "teacher") return sessionUser;
  return window.CampusSyncMockData.users.find((user) => user.role === "teacher");
}

function renderConfirmations(container, courseIds) {
  const confirmations = JSON.parse(window.sessionStorage.getItem("campusSyncConfirmations") || "{}");
  const rows = window.CampusSyncMockData.routine
    .filter((entry) => courseIds.includes(entry.courseId))
    .slice(0, 6);
  container.innerHTML = rows.length ? rows.map((entry) => {
    const key = entry.scheduleId;
    const status = confirmations[key] || "Pending";
    const statusClass = status === "Confirmed" ? "success" : status === "Declined" ? "danger" : "warning";
    const actions = status === "Pending" ? `<button class="button" data-confirm-class>Confirm</button> <button class="button secondary-button" data-decline-class>Decline</button>` : `<span class="text-muted">Decision saved</span>`;
    return `<tr data-confirmation-key="${key}"><td class="schedule-time">${entry.day}<br>${entry.time}</td><td><strong>${entry.courseName}</strong><span class="course-code">${entry.courseId} · Semester ${entry.semester}</span></td><td>${entry.room}</td><td><span class="status-badge ${statusClass}" data-status>${status}</span></td><td>${actions}</td></tr>`;
  }).join("") : `<tr><td colspan="5"><div class="empty-state">No scheduled classes are assigned to this teacher.</div></td></tr>`;
}

function renderReleasedSlots(container) {
  const reserved = JSON.parse(window.sessionStorage.getItem("campusSyncReservations") || "[]");
  const rows = window.CampusSyncMockData.releasedSlots;
  container.innerHTML = rows.map((entry) => {
    const isReserved = reserved.includes(entry.reservationId);
    return `<tr><td>${entry.date}</td><td class="schedule-time">${entry.startTime} - ${entry.endTime}</td><td>Semester ${entry.semester}</td><td>${entry.room}</td><td><strong>${entry.courseName}</strong><span class="course-code">${entry.courseId}</span></td><td><span class="status-badge ${isReserved ? "success" : "info"}" data-status>${isReserved ? "Reserved" : "Available"}</span></td><td><span class="text-muted">Select above</span></td></tr>`;
  }).join("");
}

function initializeReservationBuilder() {
  const timeSelect = document.querySelector("[data-reservation-time]");
  const roomSelect = document.querySelector("[data-reservation-room]");
  const semesterSelect = document.querySelector("[data-reservation-semester]");
  const courseSelect = document.querySelector("[data-reservation-course]");
  const reserveButton = document.querySelector("[data-reserve-selected]");
  const preview = document.querySelector("[data-reservation-preview]");
  if (!timeSelect || !roomSelect || !semesterSelect || !courseSelect || !reserveButton) return;

  const slots = window.CampusSyncMockData.releasedSlots;
  const reserved = () => JSON.parse(window.sessionStorage.getItem("campusSyncReservations") || "[]");
  const option = (value, label) => `<option value="${value}">${label}</option>`;
  const timeKey = (entry) => `${entry.date}|${entry.startTime}-${entry.endTime}`;
  const timeLabel = (entry) => `${entry.date} · ${entry.startTime}-${entry.endTime}`;

  [...new Map(slots.map((entry) => [timeKey(entry), entry])).values()].forEach((entry) => {
    timeSelect.insertAdjacentHTML("beforeend", option(timeKey(entry), timeLabel(entry)));
  });

  function resetSelect(select, label) {
    select.innerHTML = option("", label);
    select.disabled = true;
  }

  function refresh() {
    const selectedTime = timeSelect.value;
    const selectedRoom = roomSelect.value;
    const selectedSemester = semesterSelect.value;
    const selectedCourse = courseSelect.value;
    resetSelect(roomSelect, "Select a room or lab");
    resetSelect(semesterSelect, "Select a semester");
    resetSelect(courseSelect, "Select an available course");
    reserveButton.disabled = true;
    preview.textContent = "Choose a time to begin.";
    if (!selectedTime) return;

    [...new Set(slots.filter((entry) => timeKey(entry) === selectedTime).map((entry) => entry.room))].forEach((room) => roomSelect.insertAdjacentHTML("beforeend", option(room, room)));
    roomSelect.disabled = false;
    if (!selectedRoom) return;
    roomSelect.value = selectedRoom;

    [...new Set(slots.filter((entry) => timeKey(entry) === selectedTime && entry.room === selectedRoom).map((entry) => entry.semester))].forEach((semester) => semesterSelect.insertAdjacentHTML("beforeend", option(semester, `Semester ${semester}`)));
    semesterSelect.disabled = false;
    if (!selectedSemester) return;
    semesterSelect.value = selectedSemester;

    slots.filter((entry) => timeKey(entry) === selectedTime && entry.room === selectedRoom && String(entry.semester) === String(selectedSemester)).forEach((entry) => courseSelect.insertAdjacentHTML("beforeend", option(entry.reservationId, `${entry.courseId} · ${entry.courseName}`)));
    courseSelect.disabled = false;
    if (selectedCourse) courseSelect.value = selectedCourse;
    if (!courseSelect.value) return;
    const selected = slots.find((entry) => entry.reservationId === courseSelect.value);
    const alreadyReserved = reserved().includes(selected.reservationId);
    preview.textContent = alreadyReserved ? "This released schedule is already reserved in this session." : `${selected.date} · ${selected.startTime}-${selected.endTime} · ${selected.room} · Semester ${selected.semester}`;
    reserveButton.disabled = alreadyReserved;
    reserveButton.dataset.reservationKey = selected.reservationId;
  }

  [timeSelect, roomSelect, semesterSelect, courseSelect].forEach((select) => select.addEventListener("change", refresh));
  reserveButton.addEventListener("click", () => {
    const key = reserveButton.dataset.reservationKey;
    if (!key || reserved().includes(key)) return;
    const next = reserved();
    next.push(key);
    window.sessionStorage.setItem("campusSyncReservations", JSON.stringify(next));
    reserveButton.disabled = true;
    reserveButton.textContent = "Reserved";
    preview.textContent = "Reservation confirmed. The slot is now held for your extra class.";
    showToast("Extra class schedule reserved successfully.");
  });
}
