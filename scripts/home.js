document.addEventListener("DOMContentLoaded", () => {
  const features = document.querySelectorAll(".animate-feature");
  const testimonials = document.querySelectorAll(".animate-testimonial");

  const animateOnScroll = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = "running";
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(animateOnScroll, {
    root: null,
    threshold: 0.1,
    rootMargin: "0px",
  });

  features.forEach((feature) => {
    feature.style.animationPlayState = "paused";
    observer.observe(feature);
  });

  testimonials.forEach((testimonial) => {
    testimonial.style.animationPlayState = "paused";
    observer.observe(testimonial);
  });

  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
});
