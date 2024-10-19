document.addEventListener("DOMContentLoaded", () => {
  const featuresContainer = document.querySelector(".features");
  const testimonialsContainer = document.querySelector(
    ".testimonial-container"
  );

  // Fetch and display features data from JSON
  fetch("data/features.json")
    .then((response) => response.json())
    .then((features) => displayFeatures(features))
    .catch((error) => console.error("Error loading features:", error));

  // Fetch and display testimonials data from JSON
  fetch("data/testimonials-home.json")
    .then((response) => response.json())
    .then((testimonials) => displayTestimonials(testimonials))
    .catch((error) => console.error("Error loading testimonials:", error));

  // Dynamically generate and display features
  const displayFeatures = (features) => {
    features.forEach((feature) => {
      const featureDiv = document.createElement("div");
      featureDiv.classList.add("feature", "animate-feature");
      featureDiv.innerHTML = `
        <img src="${feature.image}" alt="${feature.alt}" class="feature-icon" />
        <h2>${feature.title}</h2>
        <p>${feature.description}</p>
      `;
      featuresContainer.appendChild(featureDiv);
    });
    animateOnScroll();
  };

  // Dynamically generate and display testimonials
  const displayTestimonials = (testimonials) => {
    testimonials.forEach((testimonial) => {
      const testimonialDiv = document.createElement("div");
      testimonialDiv.classList.add("testimonial", "animate-testimonial");
      testimonialDiv.innerHTML = `
        <img src="${testimonial.image}" alt="${testimonial.alt}" class="testimonial-image" />
        <p>"${testimonial.content}"</p>
        <h3>${testimonial.name}</h3>
        <p>${testimonial.course}</p>
      `;
      testimonialsContainer.appendChild(testimonialDiv);
    });
    animateOnScroll();
  };

  // Animate elements when they enter the viewport
  const animateOnScroll = () => {
    const elementsToAnimate = document.querySelectorAll(
      ".animate-feature, .animate-testimonial"
    );
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = "running";
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.1,
        rootMargin: "0px",
      }
    );

    elementsToAnimate.forEach((element) => {
      element.style.animationPlayState = "paused";
      observer.observe(element);
    });
  };

  // Wait until the header and footer are loaded dynamically
  const waitForHeaderAndFooter = () => {
    const intervalId = setInterval(() => {
      const header = document.querySelector("header");
      if (header) {
        setupHeaderScrollEffect(header);
        clearInterval(intervalId);
      }
    }, 100);
  };

  const setupHeaderScrollEffect = (header) => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  };

  waitForHeaderAndFooter();

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
});
