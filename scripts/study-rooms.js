document.addEventListener("DOMContentLoaded", () => {
  const createRoomBtn = document.getElementById("create-room-btn");
  const createRoomModal = document.getElementById("create-room-modal");
  const createRoomForm = document.getElementById("create-room-form");
  const roomsContainer = document.getElementById("rooms-container");
  const roomSearch = document.getElementById("room-search");

  let studyRooms = [
    {
      id: 1,
      name: "AI Study Group",
      topic: "Machine Learning",
      capacity: 5,
      participants: 3,
    },
    {
      id: 2,
      name: "Web Dev Workshop",
      topic: "React Hooks",
      capacity: 8,
      participants: 6,
    },
    {
      id: 3,
      name: "Data Science Club",
      topic: "Data Visualization",
      capacity: 6,
      participants: 2,
    },
    {
      id: 4,
      name: "Cybersecurity Forum",
      topic: "Ethical Hacking",
      capacity: 4,
      participants: 4,
    },
    {
      id: 5,
      name: "Cloud Computing",
      topic: "AWS Fundamentals",
      capacity: 7,
      participants: 5,
    },
    {
      id: 6,
      name: "Blockchain Meet-up",
      topic: "Smart Contracts",
      capacity: 10,
      participants: 8,
    },
    {
      id: 7,
      name: "Game Dev Guild",
      topic: "Unity 3D",
      capacity: 9,
      participants: 7,
    },
    {
      id: 8,
      name: "AI Ethics Roundtable",
      topic: "AI Regulations",
      capacity: 6,
      participants: 4,
    },
  ];

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
    studyRooms.push(newRoom);
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

  displayRooms(studyRooms);
});
