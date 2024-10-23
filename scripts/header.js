document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("mobile-menu");
  const nav = document.querySelector("nav ul.nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("show-menu");
      menuToggle.classList.toggle("active");
    });
  }
  const currentLocation = location.href;
  const menuItem = document.querySelectorAll(".nav li a");
  const menuLength = menuItem.length;
  for (let i = 0; i < menuLength; i++) {
    if (menuItem[i].href === currentLocation) {
      menuItem[i].classList.add("active");
    }
  }
});
