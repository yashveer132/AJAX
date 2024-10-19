document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("mobile-menu");
  const nav = document.querySelector("nav ul");

  if (menuToggle && nav) {
    // Toggle menu visibility and button active state on click
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("show-menu");
      menuToggle.classList.toggle("active");
    });
  }
});
