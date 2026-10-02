function renderSchedule(container, entries) {
  if (!container) return;

  container.innerHTML = entries.map((entry) => `
    <article class="schedule-entry">
      <strong>${entry.courseName || entry.course}</strong>
      <span>${entry.courseId || ""} · ${entry.day} ${entry.time || `${entry.startTime} - ${entry.endTime}`}</span>
      <span>${entry.room}</span>
      <small>${entry.lecturerIdentifier || "Lecturer pending"}</small>
    </article>
  `).join("");
}

window.CampusSyncSchedule = { renderSchedule };
