document.addEventListener("DOMContentLoaded", () => {
  const mentorCards = document.querySelectorAll(".mentor-card");
  const testimonials = document.querySelectorAll(".testimonial");
  const spotlightImage = document.querySelector(".spotlight-image");

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

  mentorCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.style.animationPlayState = "paused";
    observer.observe(card);
  });

  testimonials.forEach((testimonial, index) => {
    testimonial.style.animationDelay = `${index * 0.1}s`;
    testimonial.style.animationPlayState = "paused";
    observer.observe(testimonial);
  });

  spotlightImage.style.animationPlayState = "paused";
  observer.observe(spotlightImage);

  const applyFiltersBtn = document.getElementById("apply-filters");
  const specializationFilter = document.getElementById("specialization-filter");
  const experienceFilter = document.getElementById("experience-filter");

  applyFiltersBtn.addEventListener("click", () => {
    const selectedSpecialization = specializationFilter.value.toLowerCase();
    const selectedExperience = experienceFilter.value;

    mentorCards.forEach((card) => {
      const cardSpecialization = card
        .querySelector(".specialization")
        .textContent.toLowerCase();
      const cardExperienceText = card.querySelector(".experience").textContent;
      const cardExperience = parseInt(cardExperienceText.match(/\d+/)[0]);

      const specializationMatch =
        !selectedSpecialization ||
        cardSpecialization.includes(selectedSpecialization);
      let experienceMatch = true;

      if (selectedExperience) {
        if (selectedExperience === "0-5") {
          experienceMatch = cardExperience >= 0 && cardExperience <= 5;
        } else if (selectedExperience === "5-10") {
          experienceMatch = cardExperience > 5 && cardExperience <= 10;
        } else if (selectedExperience === "10+") {
          experienceMatch = cardExperience > 10;
        }
      }

      if (specializationMatch && experienceMatch) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });

  const testimonialSlider = document.querySelector(".testimonial-slider");
  let isDown = false;
  let startX;
  let scrollLeft;

  testimonialSlider.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - testimonialSlider.offsetLeft;
    scrollLeft = testimonialSlider.scrollLeft;
  });

  testimonialSlider.addEventListener("mouseleave", () => {
    isDown = false;
  });

  testimonialSlider.addEventListener("mouseup", () => {
    isDown = false;
  });

  testimonialSlider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - testimonialSlider.offsetLeft;
    const walk = (x - startX) * 2;
    testimonialSlider.scrollLeft = scrollLeft - walk;
  });
});
