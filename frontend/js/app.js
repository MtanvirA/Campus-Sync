document.addEventListener("DOMContentLoaded", () => {
  refreshLocalStyles();
  const loginForm = document.querySelector("[data-login-form]");

  if (!loginForm) return;

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = loginForm.elements.email.value.trim();
    const password = loginForm.elements.password.value;
    const message = document.querySelector("[data-form-message]");
    const role = document.querySelector("[data-demo-role]").value;

    if (!email || !password) {
      message.textContent = "Enter your university email and password to continue.";
      message.className = "form-message form-message-error";
      return;
    }

    const user = window.CampusSyncMockData.users.find((item) => item.role === role);
    window.sessionStorage.setItem("campusSyncUser", JSON.stringify(user));
    window.location.href = `${role}/dashboard.html`;
  });
});

function refreshLocalStyles() {
  document.querySelectorAll('link[rel="stylesheet"]').forEach((stylesheet) => {
    if (!stylesheet.href.startsWith(window.location.origin)) return;
    const url = new URL(stylesheet.href);
    url.searchParams.set("v", "campus-sync-ui-20261002-5");
    stylesheet.href = url.toString();
  });
}
