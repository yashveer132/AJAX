document.addEventListener("DOMContentLoaded", () => {
  const featuresContainer = document.querySelector(".features");
  const testimonialsContainer = document.querySelector(
    ".testimonial-container"
  );

  fetch("data/features.json")
    .then((response) => response.json())
    .then((features) => displayFeatures(features))
    .catch((error) => console.error("Error loading features:", error));

  fetch("data/testimonials-home.json")
    .then((response) => response.json())
    .then((testimonials) => displayTestimonials(testimonials))
    .catch((error) => console.error("Error loading testimonials:", error));

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

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
});
