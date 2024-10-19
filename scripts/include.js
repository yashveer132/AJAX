document.addEventListener("DOMContentLoaded", () => {
  // Function to load an HTML component into a specified placeholder
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

  // Load header and footer components
  loadComponent("../pages/header.html", "header-placeholder");
  loadComponent("../pages/footer.html", "footer-placeholder");

  // Setup mobile menu toggle functionality
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

  // Setup active navigation link highlighting based on the current page
  function setupActiveNavLink() {
    const navLinks = document.querySelectorAll("nav ul li a");

    const clearActiveLinks = () => {
      navLinks.forEach((link) => link.classList.remove("active"));
    };

    // Attach event listeners to each navigation link
    navLinks.forEach((link) => {
      link.addEventListener("click", function (event) {
        clearActiveLinks();
        this.classList.add("active");
      });

      // Automatically highlight the link matching the current page
      const currentPage = window.location.pathname.split("/").pop();
      if (link.getAttribute("href").includes(currentPage)) {
        link.classList.add("active");
      }
    });
  }
});
