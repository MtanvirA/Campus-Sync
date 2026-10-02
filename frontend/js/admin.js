document.addEventListener("DOMContentLoaded", () => {
  ensureAdminShell();
  loadAdminIcons();
  ensureAdminNotificationPopover();
  refreshAdminStyles();
  const view = document.querySelector("[data-admin-view]")?.dataset.adminView;
  const body = document.querySelector("[data-admin-body]");
  if (!view || !body) return;
  const data = window.CampusSyncMockData;
  const views = {
    users: { rows: data.users, cells: (item) => [item.name, item.role, item.email, "Active"] },
    teachers: { rows: data.teachers, cells: (item) => [item.name, item.department, item.courses, item.status] },
    students: { rows: data.students, cells: (item) => [item.name, item.id, `${item.batch} · Section ${item.section}`, item.status] },
    courses: { rows: data.courses, cells: (item) => [item.code, item.name, item.teacher, `${item.section} · ${item.students} students`, item.status] },
    rooms: { rows: data.rooms, cells: (item) => [item.name, item.type, item.building, item.capacity, item.status] },
    schedules: { rows: data.routine, cells: (item) => [item.day, `${item.startTime} - ${item.endTime}`, `${item.courseId} · ${item.courseName}`, item.room, item.status] },
    reservations: { rows: data.reservations, cells: (item) => [item.date, item.time, item.room, item.course, item.status] },
    notices: { rows: data.notices, cells: (item) => [item.title, item.audience, item.author, item.date, item.status] },
    audit: { rows: data.auditLog, cells: (item) => [item.action, item.actor, item.target, item.time] }
  };
  const selected = views[view];
  if (!selected) return;
  body.innerHTML = selected.rows.map((item) => `<tr>${selected.cells(item).map((cell, index) => `<td${index === 0 ? " class=\"primary-cell\"" : ""}>${index === 0 ? `<strong>${cell}</strong>` : cell}</td>`).join("")}<td><a class="row-action" href="#">View</a></td></tr>`).join("");
  const search = document.querySelector("[data-table-search]");
  if (search) search.addEventListener("input", () => body.querySelectorAll("tr").forEach((row) => { row.hidden = !row.textContent.toLowerCase().includes(search.value.toLowerCase()); }));
});

function ensureAdminNotificationPopover() {
  const trigger = document.querySelector('[aria-label="Notifications"]');
  if (!trigger || document.querySelector("#campus-notifications-popover")) return;
  const popover = document.createElement("div");
  popover.id = "campus-notifications-popover";
  popover.className = "notification-popover";
  popover.setAttribute("popover", "auto");
  popover.innerHTML = `<strong>Notifications</strong><span>Confirmation deadline approaching</span><span>Released room available for reservation</span><a href="notices.html">View all notifications</a>`;
  trigger.setAttribute("popovertarget", popover.id);
  trigger.setAttribute("aria-controls", popover.id);
  document.body.appendChild(popover);
  if (typeof popover.hidePopover === "function") popover.hidePopover();
}

function refreshAdminStyles() {
  document.querySelectorAll('link[rel="stylesheet"]').forEach((stylesheet) => {
    if (!stylesheet.href.startsWith(window.location.origin)) return;
    const url = new URL(stylesheet.href);
    url.searchParams.set("v", "campus-sync-ui-20261002-5");
    stylesheet.href = url.toString();
  });
}

function ensureAdminShell() {
  if (document.querySelector(".topbar")) return;
  const links = [["dashboard.html", "bi bi-speedometer2", "Overview"], ["users.html", "bi bi-people", "Users"], ["teachers.html", "bi bi-person-workspace", "Teachers"], ["students.html", "bi bi-mortarboard", "Students"], ["courses.html", "bi bi-journal-text", "Courses"], ["rooms.html", "bi bi-building", "Rooms & labs"], ["schedules.html", "bi bi-calendar3", "Schedules"], ["reservations.html", "bi bi-calendar-check", "Reservations"], ["notices.html", "bi bi-megaphone", "Notices"], ["audit-log.html", "bi bi-clock-history", "Audit log"]];
  const nav = links.map(([href, icon, label]) => `<a class="sidebar-link${window.location.pathname.endsWith(href) ? " active" : ""}" href="${href}"><i class="${icon}" aria-hidden="true"></i><span>${label}</span></a>`).join("");
  const header = document.createElement("header");
  header.className = "topbar";
  header.innerHTML = `<div class="topbar-inner"><a class="brand" href="dashboard.html"><span class="brand-mark">CS</span><span class="brand-name">Campus <span>Sync</span></span></a><nav class="top-nav" aria-label="Primary navigation">${nav}</nav><div class="topbar-actions"><button class="icon-button" aria-label="Notifications">&#128276;</button><div class="profile-menu"><span class="profile-avatar" data-user-avatar>SK</span><span class="profile-info"><strong class="profile-name" data-user-name>Samira Karim</strong><span class="profile-role" data-user-role>Department Administrator</span></span><button class="logout-button" type="button" data-logout>Log out</button></div></div></div>`;
  document.body.prepend(header);
  const user = JSON.parse(window.sessionStorage.getItem("campusSyncUser") || "null") || window.CampusSyncMockData.users.find((item) => item.role === "admin");
  header.querySelector("[data-user-name]").textContent = user.name;
  header.querySelector("[data-user-role]").textContent = user.title;
  header.querySelector("[data-user-avatar]").textContent = user.initials;
  header.querySelector("[data-logout]").addEventListener("click", () => { window.sessionStorage.removeItem("campusSyncUser"); window.location.href = "../login.html"; });
}

function loadAdminIcons() {
  if (document.querySelector("[data-bootstrap-icons]")) return;
  const icons = document.createElement("link");
  icons.rel = "stylesheet";
  icons.href = "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css";
  icons.setAttribute("data-bootstrap-icons", "true");
  document.head.appendChild(icons);
}
