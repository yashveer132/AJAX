document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("mentorship-booking-form");
  const dateInput = document.getElementById("date");
  const timeSlotsContainer = document.getElementById("time-slots");
  const hiddenTimeInput = document.getElementById("time");
  const modal = document.getElementById("booking-confirmation");
  const closeModal = document.getElementById("close-modal");
  const confirmationDetails = document.getElementById("confirmation-details");
  const mentorSelect = document.getElementById("mentor");

  let selectedMentor = "";
  let selectedDate = "";
  const bookedSlotsData = {};

  // Set minimum date to today's date
  const today = new Date().toISOString().split("T")[0];
  dateInput.setAttribute("min", today);

  // Fetch mentor data from external JSON file
  fetch("../data/mentors-session.json")
    .then((response) => response.json())
    .then((mentors) => populateMentorDropdown(mentors))
    .catch((error) => console.error("Error loading mentor data:", error));

  // Populate the mentor dropdown with available mentors
  const populateMentorDropdown = (mentors) => {
    mentorSelect.innerHTML = '<option value="">Choose a mentor</option>';
    mentors.forEach((mentor) => {
      const option = document.createElement("option");
      option.value = mentor.id;
      option.textContent = `${mentor.name} (${mentor.specialty})`;
      mentorSelect.appendChild(option);
    });
  };

  // Generate available time slots for the selected mentor and date
  const generateTimeSlots = () => {
    if (!selectedMentor || !selectedDate) {
      timeSlotsContainer.innerHTML = "";
      return;
    }

    timeSlotsContainer.innerHTML = "";

    if (!bookedSlotsData[selectedMentor]) {
      bookedSlotsData[selectedMentor] = {};
    }

    if (!bookedSlotsData[selectedMentor][selectedDate]) {
      const bookedSlotsForMentor = generateRandomBookedSlots();
      bookedSlotsData[selectedMentor][selectedDate] = bookedSlotsForMentor;
    }

    const bookedSlotsForMentor = bookedSlotsData[selectedMentor][selectedDate];

    // Generate time slots from 9:00 AM to 5:00 PM
    for (let i = 9; i <= 17; i++) {
      const time = `${i.toString().padStart(2, "0")}:00`;
      const isBooked = bookedSlotsForMentor.includes(time);

      const button = document.createElement("button");
      button.type = "button";
      button.classList.add("time-slot");
      button.textContent = isBooked ? `${time} (Booked)` : time;
      button.disabled = isBooked;

      if (isBooked) {
        button.classList.add("booked");
      } else {
        button.addEventListener("click", () => selectTimeSlot(button, time));
      }

      timeSlotsContainer.appendChild(button);
    }
  };

  // Generate random booked slots for demo purposes
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

  // Handle time slot selection
  const selectTimeSlot = (button, time) => {
    const previouslySelected = timeSlotsContainer.querySelector(".selected");
    if (previouslySelected) {
      previouslySelected.classList.remove("selected");
    }

    button.classList.add("selected");
    hiddenTimeInput.value = time;
  };

  // Update selected mentor and regenerate time slots if applicable
  mentorSelect.addEventListener("change", (e) => {
    selectedMentor = e.target.value;
    if (selectedMentor && selectedDate) {
      generateTimeSlots();
    } else {
      timeSlotsContainer.innerHTML = "";
    }
  });

  // Update selected date and regenerate time slots if applicable
  dateInput.addEventListener("change", (e) => {
    selectedDate = e.target.value;
    if (selectedMentor && selectedDate) {
      generateTimeSlots();
    } else {
      timeSlotsContainer.innerHTML = "";
    }
  });

  // Handle form submission to confirm booking
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!hiddenTimeInput.value) {
      alert("Please select a time slot.");
      return;
    }

    const formData = new FormData(form);
    const bookingDetails = Object.fromEntries(formData.entries());

    // Store booked slot to prevent future bookings at the same time
    if (!bookedSlotsData[bookingDetails.mentor]) {
      bookedSlotsData[bookingDetails.mentor] = {};
    }

    if (!bookedSlotsData[bookingDetails.mentor][bookingDetails.date]) {
      bookedSlotsData[bookingDetails.mentor][bookingDetails.date] = [];
    }

    bookedSlotsData[bookingDetails.mentor][bookingDetails.date].push(
      bookingDetails.time
    );

    // Display confirmation modal with booking details
    confirmationDetails.innerHTML = `
      <p><strong>Mentor:</strong> ${mentorSelect.selectedOptions[0].text}</p>
      <p><strong>Date:</strong> ${bookingDetails.date}</p>
      <p><strong>Time:</strong> ${bookingDetails.time}</p>
      <p><strong>Topic:</strong> ${bookingDetails.topic}</p>
    `;
    modal.style.display = "block";

    // Reset form and internal state after submission
    form.reset();
    hiddenTimeInput.value = "";
    selectedMentor = "";
    selectedDate = "";
    timeSlotsContainer.innerHTML = "";
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
