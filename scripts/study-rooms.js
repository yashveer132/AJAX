document.addEventListener("DOMContentLoaded", () => {
  const createRoomBtn = document.getElementById("create-room-btn");
  const createRoomModal = document.getElementById("create-room-modal");
  const createRoomForm = document.getElementById("create-room-form");
  const roomsContainer = document.getElementById("rooms-container");
  const roomSearch = document.getElementById("room-search");

  let studyRooms = [];

  function displayRooms(rooms) {
    roomsContainer.innerHTML = "";
    rooms.forEach((room) => {
      const roomCard = document.createElement("div");
      roomCard.classList.add("room-card");
      roomCard.innerHTML = `
        <h3>${room.name}</h3>
        <p>Topic: ${room.topic}</p>
        <p>Participants: ${room.participants}/${room.capacity}</p>
        <button class="join-btn" ${
          room.participants >= room.capacity ? "disabled" : ""
        }>
          ${room.participants >= room.capacity ? "Full" : "Join Room"}
        </button>
      `;
      roomsContainer.appendChild(roomCard);
    });
  }

  fetch("../data/study-rooms.json")
    .then((response) => response.json())
    .then((data) => {
      studyRooms = data;
      displayRooms(studyRooms);
    })
    .catch((error) => console.error("Error loading rooms data:", error));

  createRoomBtn.addEventListener("click", () => {
    createRoomModal.style.display = "block";
  });

  createRoomForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newRoom = {
      id: studyRooms.length + 1,
      name: document.getElementById("room-name").value,
      topic: document.getElementById("room-topic").value,
      capacity: parseInt(document.getElementById("room-capacity").value),
      participants: 0,
    };

    studyRooms.unshift(newRoom);

    displayRooms(studyRooms);

    createRoomModal.style.display = "none";
    createRoomForm.reset();
  });

  roomSearch.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredRooms = studyRooms.filter(
      (room) =>
        room.name.toLowerCase().includes(searchTerm) ||
        room.topic.toLowerCase().includes(searchTerm)
    );
    displayRooms(filteredRooms);
  });

  window.addEventListener("click", (e) => {
    if (e.target === createRoomModal) {
      createRoomModal.style.display = "none";
    }
  });
});
