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

  const today = new Date().toISOString().split("T")[0];
  dateInput.setAttribute("min", today);

  fetch("../data/mentors-session.json")
    .then((response) => response.json())
    .then((mentors) => populateMentorDropdown(mentors))
    .catch((error) => console.error("Error loading mentor data:", error));

  const populateMentorDropdown = (mentors) => {
    mentorSelect.innerHTML = '<option value="">Choose a mentor</option>';
    mentors.forEach((mentor) => {
      const option = document.createElement("option");
      option.value = mentor.id;
      option.textContent = `${mentor.name} (${mentor.specialty})`;
      mentorSelect.appendChild(option);
    });
  };

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

  const selectTimeSlot = (button, time) => {
    const previouslySelected = timeSlotsContainer.querySelector(".selected");
    if (previouslySelected) {
      previouslySelected.classList.remove("selected");
    }

    button.classList.add("selected");
    hiddenTimeInput.value = time;
  };

  mentorSelect.addEventListener("change", (e) => {
    selectedMentor = e.target.value;
    if (selectedMentor && selectedDate) {
      generateTimeSlots();
    } else {
      timeSlotsContainer.innerHTML = "";
    }
  });

  dateInput.addEventListener("change", (e) => {
    selectedDate = e.target.value;
    if (selectedMentor && selectedDate) {
      generateTimeSlots();
    } else {
      timeSlotsContainer.innerHTML = "";
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!hiddenTimeInput.value) {
      alert("Please select a time slot.");
      return;
    }

    const formData = new FormData(form);
    const bookingDetails = Object.fromEntries(formData.entries());

    if (!bookedSlotsData[bookingDetails.mentor]) {
      bookedSlotsData[bookingDetails.mentor] = {};
    }

    if (!bookedSlotsData[bookingDetails.mentor][bookingDetails.date]) {
      bookedSlotsData[bookingDetails.mentor][bookingDetails.date] = [];
    }

    bookedSlotsData[bookingDetails.mentor][bookingDetails.date].push(
      bookingDetails.time
    );

    confirmationDetails.innerHTML = `
      <p><strong>Mentor:</strong> ${mentorSelect.selectedOptions[0].text}</p>
      <p><strong>Date:</strong> ${bookingDetails.date}</p>
      <p><strong>Time:</strong> ${bookingDetails.time}</p>
      <p><strong>Topic:</strong> ${bookingDetails.topic}</p>
    `;
    modal.style.display = "block";

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
