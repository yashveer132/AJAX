document.addEventListener("DOMContentLoaded", () => {
  const mentorsGrid = document.querySelector(".mentors-grid");
  const spotlightContainer = document.querySelector(".spotlight-container");
  const testimonialsContainer = document.querySelector(".testimonial-slider");
  const specializationFilter = document.getElementById("specialization-filter");

  let mentorsData = [];
  const bookedSlotsData = {};

  Promise.all([
    fetch("../data/mentors.json").then((res) => res.json()),
    fetch("../data/testimonials.json").then((res) => res.json()),
  ])
    .then(([mentors, testimonials]) => {
      mentorsData = mentors;
      generateBookedSlotsData();
      displayMentors(mentors);
      displaySpotlight(mentors);
      displayTestimonials(testimonials);
    })
    .catch((error) => console.error("Error loading data:", error));

  const generateBookedSlotsData = () => {
    mentorsData.forEach((mentor) => {
      bookedSlotsData[mentor.id] = generateRandomBookedSlots();
    });
  };

  const generateRandomBookedSlots = () => {
    const bookedSlots = [];
    const allSlots = Array.from({ length: 9 }, (_, i) => `${i + 9}:00`);

    while (bookedSlots.length < Math.floor(Math.random() * 3) + 2) {
      const randomSlot = allSlots[Math.floor(Math.random() * allSlots.length)];
      if (!bookedSlots.includes(randomSlot)) {
        bookedSlots.push(randomSlot);
      }
    }

    return bookedSlots;
  };

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
    const timeSlotsHtml = generateTimeSlotsHtml(mentor);

    card.innerHTML = `
      <img src="${mentor.image}" alt="${mentor.name}" class="mentor-image" />
      <div class="mentor-info">
        <h3>${mentor.name}</h3>
        <p class="specialization">${mentor.specialization.join(", ")}</p>
        <p class="bio">${mentor.bio}</p>
        <div class="mentor-time-slots">
          ${timeSlotsHtml}
        </div>
      </div>
      <a href="booking.html" class="book-session-btn">Book a Session</a>
    `;

    return card;
  };

  const generateTimeSlotsHtml = (mentor) => {
    const bookedSlots = bookedSlotsData[mentor.id] || [];
    let timeSlotsHtml = "";

    for (let i = 9; i <= 17; i++) {
      const time = `${i.toString().padStart(2, "0")}:00`;
      const isBooked = bookedSlots.includes(time);
      const slotClass = isBooked ? "time-slot booked" : "time-slot";
      timeSlotsHtml += `<div class="${slotClass}">${time}</div>`;
    }

    return timeSlotsHtml;
  };

  const createSpotlight = (mentor) => {
    const timeSlotsHtml = generateTimeSlotsHtml(mentor);

    return `
      <img src="${mentor.image}" alt="${
      mentor.name
    }" class="spotlight-image animate-image" />
      <div class="spotlight-content">
        <h3>${mentor.name}</h3>
        <p class="specialization">${mentor.specialization.join(", ")}</p>
        <p class="bio">${mentor.bio}</p>
        <div class="mentor-time-slots">
          ${timeSlotsHtml}
        </div>
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
        mentor.specialization.some((spec) =>
          spec.toLowerCase().includes(selectedSpecialization)
        )
    );

    displayMentors(filteredMentors);
  });
});
