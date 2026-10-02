let pendingDeclineRow = null;

document.addEventListener("DOMContentLoaded", () => {
  ensureSharedNavigation();
  bindNavigationEffects();
  refreshLocalStyles();
  loadBootstrap();
  const user = JSON.parse(window.sessionStorage.getItem("campusSyncUser") || "null");
  const fallbackRole = ["admin", "teacher", "student", "cr"].find((item) => window.location.pathname.includes(`/${item}/`)) || "student";
  const currentUser = user || window.CampusSyncMockData.users.find((item) => item.role === fallbackRole) || window.CampusSyncMockData.users[0];
  const name = document.querySelector("[data-user-name]");
  const role = document.querySelector("[data-user-role]");
  const avatar = document.querySelector("[data-user-avatar]");
  const menuButton = document.querySelector("[data-menu-button]");
  const sidebar = document.querySelector(".sidebar");
  const notificationCount = document.querySelector("[data-notification-count]");
  const topbarInner = document.querySelector(".topbar-inner");
  const sidebarLinks = document.querySelectorAll(".sidebar .sidebar-link");

  if (name) name.textContent = currentUser.name;
  if (role) role.textContent = currentUser.title;
  if (avatar) avatar.textContent = currentUser.initials;
  if (notificationCount) notificationCount.textContent = window.CampusSyncMockData.notifications.filter((item) => item.unread).length;
  if (menuButton && sidebar) menuButton.addEventListener("click", () => sidebar.classList.toggle("is-open"));
  ensureDeclineDialog();
  ensureNotificationPopover();

  if (topbarInner && sidebarLinks.length && !topbarInner.querySelector(".top-nav")) {
    const topNav = document.createElement("nav");
    topNav.className = "top-nav";
    topNav.setAttribute("aria-label", "Primary navigation");
    sidebarLinks.forEach((link) => topNav.appendChild(link.cloneNode(true)));
    topbarInner.insertBefore(topNav, topbarInner.querySelector(".topbar-actions"));
  }

  const profileMenu = document.querySelector(".profile-menu");
  if (profileMenu && !profileMenu.querySelector("[data-logout]")) {
    const logoutButton = document.createElement("button");
    logoutButton.className = "logout-button";
    logoutButton.type = "button";
    logoutButton.textContent = "Log out";
    logoutButton.setAttribute("data-logout", "true");
    profileMenu.appendChild(logoutButton);
  }
  document.querySelectorAll("[data-logout]").forEach((logoutButton) => {
    if (logoutButton.dataset.bound === "true") return;
    logoutButton.dataset.bound = "true";
    logoutButton.addEventListener("click", () => {
      window.sessionStorage.removeItem("campusSyncUser");
      window.location.href = "../login.html";
    });
  });

  document.querySelectorAll("[data-confirm-class]").forEach((button) => {
    button.addEventListener("click", () => {
      const row = button.closest("tr");
      const status = row.querySelector("[data-status]");
      saveConfirmation(row.dataset.confirmationKey, "Confirmed");
      status.textContent = "Confirmed";
      status.className = "status-badge success";
      button.remove();
      showToast("Class confirmed for tomorrow.");
    });
  });
  document.querySelectorAll("[data-decline-class]").forEach((button) => {
    button.addEventListener("click", () => {
      const row = button.closest("tr");
      openDeclineDialog(row);
    });
  });
  document.querySelectorAll("[data-reserve-slot]").forEach((button) => {
    button.addEventListener("click", () => {
      const reservationKey = button.dataset.reservationKey;
      const reservations = JSON.parse(window.sessionStorage.getItem("campusSyncReservations") || "[]");
      if (reservationKey && reservations.includes(reservationKey)) {
        showToast("This schedule has already been reserved.", true);
        return;
      }
      if (reservationKey) {
        reservations.push(reservationKey);
        window.sessionStorage.setItem("campusSyncReservations", JSON.stringify(reservations));
      }
      button.disabled = true;
      button.textContent = "Reserved";
      const status = button.closest("tr").querySelector("[data-status]");
      status.textContent = "Reserved";
      status.className = "status-badge success";
      showToast("Slot reserved successfully.");
    });
  });
});

function saveConfirmation(scheduleId, status) {
  if (!scheduleId) return;
  const confirmations = JSON.parse(window.sessionStorage.getItem("campusSyncConfirmations") || "{}");
  confirmations[scheduleId] = status;
  window.sessionStorage.setItem("campusSyncConfirmations", JSON.stringify(confirmations));
}

function ensureDeclineDialog() {
  if (document.querySelector("#confirm-decline-modal")) return;
  const dialog = document.createElement("dialog");
  dialog.id = "confirm-decline-modal";
  dialog.className = "modern-dialog";
  dialog.innerHTML = `<h2>Decline class?</h2><p>This class slot will be released for another eligible teacher after you decline it.</p><div class="dialog-actions"><form method="dialog"><button class="button secondary-button" value="cancel">Keep class</button><button class="button button-danger" value="confirm">Yes, release slot</button></form></div>`;
  dialog.addEventListener("close", () => {
    if (dialog.returnValue !== "confirm" || !pendingDeclineRow) return;
    const status = pendingDeclineRow.querySelector("[data-status]");
    saveConfirmation(pendingDeclineRow.dataset.confirmationKey, "Declined");
    status.textContent = "Declined";
    status.className = "status-badge danger";
    pendingDeclineRow.querySelectorAll("button").forEach((action) => action.remove());
    pendingDeclineRow = null;
    showToast("Class declined and slot released.");
  });
  document.body.appendChild(dialog);
}

function openDeclineDialog(row) {
  const dialog = document.querySelector("#confirm-decline-modal");
  if (!dialog || typeof dialog.showModal !== "function") return;
  pendingDeclineRow = row;
  dialog.showModal();
}

function bindNavigationEffects() {
  document.querySelectorAll(".top-nav .sidebar-link").forEach((link) => {
    link.addEventListener("pointerenter", () => link.classList.add("is-hovered"));
    link.addEventListener("pointerleave", () => link.classList.remove("is-hovered"));
  });
}

function refreshLocalStyles() {
  document.querySelectorAll('link[rel="stylesheet"]').forEach((stylesheet) => {
    if (!stylesheet.href.startsWith(window.location.origin)) return;
    const url = new URL(stylesheet.href);
    url.searchParams.set("v", "campus-sync-ui-20261002-5");
    stylesheet.href = url.toString();
  });
}

function ensureSharedNavigation() {
  const role = getCurrentRole();
  const navItems = getNavigationItems(role).map(([href, icon, label]) => `<a class="sidebar-link${window.location.pathname.endsWith(href) ? " active" : ""}" href="${href}"><i class="${icon}" aria-hidden="true"></i><span>${label}</span></a>`).join("");
  const existingSidebar = document.querySelector(".sidebar");
  const existingTopbar = document.querySelector(".topbar");
  if (existingTopbar) {
    const topbarInner = existingTopbar.querySelector(".topbar-inner");
    let topNav = topbarInner?.querySelector(".top-nav");
    if (topbarInner && !topNav) {
      topNav = document.createElement("nav");
      topNav.className = "top-nav";
      topNav.setAttribute("aria-label", "Primary navigation");
      topbarInner.insertBefore(topNav, topbarInner.querySelector(".topbar-actions"));
    }
    if (topNav) topNav.innerHTML = navItems;
    if (existingSidebar) document.body.classList.add("has-sidebar");
    return;
  }

  const header = document.createElement("header");
  header.className = "topbar";
  header.innerHTML = `<div class="topbar-inner"><a class="brand" href="dashboard.html"><span class="brand-mark">CS</span><span class="brand-name">Campus <span>Sync</span></span></a><nav class="top-nav" aria-label="Primary navigation">${navItems}</nav><div class="topbar-actions"><button class="icon-button" aria-label="Notifications">&#128276;<span class="notification-count" data-notification-count></span></button><div class="profile-menu"><span class="profile-avatar" data-user-avatar></span><span class="profile-info"><strong class="profile-name" data-user-name></strong><span class="profile-role" data-user-role></span></span><button class="logout-button" type="button" data-logout>Log out</button></div></div></div>`;
  document.body.prepend(header);
  document.body.classList.add("standalone-shell");
}

function getCurrentRole() {
  return ["admin", "teacher", "student", "cr"].find((item) => window.location.pathname.includes(`/${item}/`)) || "student";
}

function getNavigationItems(role) {
  return {
    admin: [["dashboard.html", "bi bi-speedometer2", "Overview"], ["users.html", "bi bi-people", "Users"], ["teachers.html", "bi bi-person-workspace", "Teachers"], ["students.html", "bi bi-mortarboard", "Students"], ["courses.html", "bi bi-journal-text", "Courses"], ["rooms.html", "bi bi-building", "Rooms & labs"], ["schedules.html", "bi bi-calendar3", "Schedules"], ["reservations.html", "bi bi-calendar-check", "Reservations"], ["notices.html", "bi bi-megaphone", "Notices"], ["audit-log.html", "bi bi-clock-history", "Audit log"]],
    teacher: [["dashboard.html", "bi bi-speedometer2", "Overview"], ["schedule.html", "bi bi-calendar-week", "My schedule"], ["confirmations.html", "bi bi-check2-square", "Confirmations"], ["reservations.html", "bi bi-calendar-plus", "Reserve a slot"], ["courses.html", "bi bi-journal-text", "My courses"], ["assignments.html", "bi bi-clipboard-check", "Assignments"], ["resources.html", "bi bi-folder2-open", "Resources"], ["notifications.html", "bi bi-bell", "Notifications"]],
    student: [["dashboard.html", "bi bi-speedometer2", "Overview"], ["timetable.html", "bi bi-calendar3", "Timetable"], ["courses.html", "bi bi-journal-text", "My courses"], ["assignments.html", "bi bi-clipboard-check", "Assignments"], ["resources.html", "bi bi-folder2-open", "Resources"], ["notices.html", "bi bi-megaphone", "Notices"], ["notifications.html", "bi bi-bell", "Notifications"]],
    cr: [["dashboard.html", "bi bi-speedometer2", "Overview"], ["schedule.html", "bi bi-calendar-week", "Class schedule"], ["notices.html", "bi bi-megaphone", "Class notices"], ["notifications.html", "bi bi-bell", "Notifications"], ["profile.html", "bi bi-person-circle", "My profile"]]
  }[role];
}

function loadBootstrap() {
  if (!document.querySelector("[data-bootstrap-css]")) {
    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css";
    stylesheet.setAttribute("data-bootstrap-css", "true");
    document.head.appendChild(stylesheet);
  }
  if (!document.querySelector("[data-bootstrap-icons]")) {
    const icons = document.createElement("link");
    icons.rel = "stylesheet";
    icons.href = "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css";
    icons.setAttribute("data-bootstrap-icons", "true");
    document.head.appendChild(icons);
  }
}

function showToast(message, isError = false) {
  let region = document.querySelector(".toast-region");
  if (!region) { region = document.createElement("div"); region.className = "toast-region"; document.body.appendChild(region); }
  const toast = document.createElement("div");
  toast.className = `app-toast${isError ? " error" : ""}`;
  toast.textContent = message;
  region.appendChild(toast);
  window.setTimeout(() => toast.remove(), 3200);
}

function ensureNotificationPopover() {
  const trigger = document.querySelector('[aria-label="Notifications"]');
  if (!trigger || document.querySelector("#campus-notifications-popover")) return;
  const popover = document.createElement("div");
  popover.id = "campus-notifications-popover";
  popover.className = "notification-popover";
  popover.setAttribute("popover", "auto");
  popover.innerHTML = `<strong>Notifications</strong><span>Confirmation deadline approaching</span><span>Released room available for reservation</span><a href="notifications.html">View all notifications</a>`;
  trigger.setAttribute("popovertarget", popover.id);
  trigger.setAttribute("aria-controls", popover.id);
  document.body.appendChild(popover);
  if (typeof popover.hidePopover === "function") popover.hidePopover();
}