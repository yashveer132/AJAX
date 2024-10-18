document.addEventListener("DOMContentLoaded", () => {
  const mentorsGrid = document.querySelector(".mentors-grid");
  const spotlightContainer = document.querySelector(".spotlight-container");
  const testimonialsContainer = document.querySelector(".testimonial-slider");

  const specializationFilter = document.getElementById("specialization-filter");

  let mentorsData = [];

  Promise.all([
    fetch("../data/mentors.json").then((res) => res.json()),
    fetch("../data/testimonials.json").then((res) => res.json()),
  ])
    .then(([mentors, testimonials]) => {
      mentorsData = mentors;
      displayMentors(mentors);
      displaySpotlight(mentors);
      displayTestimonials(testimonials);
    })
    .catch((error) => console.error("Error loading data:", error));

  const displayMentors = (mentors) => {
    mentorsGrid.innerHTML = "";
    mentors.forEach((mentor) => {
      const card = createMentorCard(mentor);
      mentorsGrid.appendChild(card);
    });
  };

  const displaySpotlight = (mentors) => {
    const spotlightMentor = mentors.find(
      (mentor) => mentor.spotlight === "yes"
    );
    if (spotlightMentor) {
      const spotlight = createSpotlight(spotlightMentor);
      spotlightContainer.innerHTML = spotlight;
    }
  };

  const displayTestimonials = (testimonials) => {
    testimonials.forEach((testimonial) => {
      const testimonialElement = createTestimonial(testimonial);
      testimonialsContainer.appendChild(testimonialElement);
    });
  };

  const createMentorCard = (mentor) => {
    const card = document.createElement("div");
    card.classList.add("mentor-card", "animate-card");
    card.innerHTML = `
      <img src="${mentor.image}" alt="${mentor.name}" class="mentor-image" />
      <div class="mentor-info">
        <h3>${mentor.name}</h3>
        <p class="specialization">${mentor.specialization}</p>
        
        <p class="bio">${mentor.bio}</p>
      </div>
      <a href="booking.html" class="book-session-btn">Book a Session</a>
    `;
    return card;
  };

  const createSpotlight = (mentor) => {
    return `
      <img src="${mentor.image}" alt="${mentor.name}" class="spotlight-image animate-image" />
      <div class="spotlight-content">
        <h3>${mentor.name}</h3>
        <p class="specialization">${mentor.specialization}</p>
        
        <p class="bio">${mentor.bio}</p>
        <a href="booking.html" class="cta-button animate-button">Book a Special Session</a>
      </div>
    `;
  };

  const createTestimonial = (testimonial) => {
    const testimonialDiv = document.createElement("div");
    testimonialDiv.classList.add("testimonial", "animate-testimonial");
    testimonialDiv.innerHTML = `
      <p>"${testimonial.content}"</p>
      <p class="student-name">- ${testimonial.student}</p>
    `;
    return testimonialDiv;
  };

  specializationFilter.addEventListener("change", () => {
    const selectedSpecialization = specializationFilter.value.toLowerCase();

    const filteredMentors = mentorsData.filter(
      (mentor) =>
        !selectedSpecialization ||
        mentor.specialization.toLowerCase().includes(selectedSpecialization)
    );

    displayMentors(filteredMentors);
  });
});
