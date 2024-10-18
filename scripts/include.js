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
          setupActiveNavLink();
        }
      })
      .catch((error) => console.error(error));
  };

  loadComponent("../pages/header.html", "header-placeholder");
  loadComponent("../pages/footer.html", "footer-placeholder");

  function setupActiveNavLink() {
    const navLinks = document.querySelectorAll("nav ul li a");

    const clearActiveLinks = () => {
      navLinks.forEach((link) => link.classList.remove("active"));
    };

    navLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        clearActiveLinks();
        event.target.classList.add("active");
      });

      const currentPage = window.location.pathname.split("/").pop();
      if (link.getAttribute("href").includes(currentPage)) {
        link.classList.add("active");
      }
    });
  }
});
