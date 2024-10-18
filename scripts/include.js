document.addEventListener("DOMContentLoaded", () => {
  const loadComponent = (url, placeholderId) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to load ${url}`);
        return response.text();
      })
      .then((data) => {
        document.getElementById(placeholderId).innerHTML = data;

        if (placeholderId === "header-placeholder") {
          setupHeader();
          setupActiveNavLink();
        }

        if (placeholderId === "footer-placeholder") {
        }
      })
      .catch((error) => console.error(error));
  };

  loadComponent("../pages/header.html", "header-placeholder");
  loadComponent("../pages/footer.html", "footer-placeholder");

  function setupHeader() {
    const menuToggle = document.getElementById("mobile-menu");
    const nav = document.querySelector("nav ul");

    if (menuToggle && nav) {
      menuToggle.addEventListener("click", () => {
        nav.classList.toggle("show-menu");
        menuToggle.classList.toggle("active");
      });
    }
  }

  function setupActiveNavLink() {
    const navLinks = document.querySelectorAll("nav ul li a");

    const clearActiveLinks = () => {
      navLinks.forEach((link) => link.classList.remove("active"));
    };

    navLinks.forEach((link) => {
      link.addEventListener("click", function (event) {
        clearActiveLinks();
        this.classList.add("active");
      });

      const currentPage = window.location.pathname.split("/").pop();
      if (link.getAttribute("href").includes(currentPage)) {
        link.classList.add("active");
      }
    });
  }
});
