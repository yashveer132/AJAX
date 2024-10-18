document.addEventListener("DOMContentLoaded", async () => {
  const upcomingSessionsContainer = document.getElementById(
    "upcoming-sessions-container"
  );
  const pastSessionsContainer = document.getElementById(
    "past-sessions-container"
  );

  const sessions = await fetchSessionsData();

  const renderSessions = (sessions, container, status) => {
    const filteredSessions = sessions.filter(
      (session) => session.status === status
    );
    if (filteredSessions.length === 0) {
      container.innerHTML = "<p>No sessions found.</p>";
      return;
    }
    filteredSessions.forEach((session) => {
      const sessionCard = createSessionCard(session);
      container.appendChild(sessionCard);
    });
  };

  const createSessionCard = (session) => {
    const card = document.createElement("div");
    card.classList.add("session-card", "animate-card");
    card.innerHTML = `
          <h3>${session.topic}</h3>
          <div class="session-details">
            <p><strong>Student:</strong> ${session.studentName}</p>
            <p><strong>Date:</strong> ${session.date}</p>
            <p><strong>Time:</strong> ${session.time}</p>
          </div>
        `;

    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("session-actions");

    if (session.status === "upcoming") {
      const startLink = document.createElement("a");
      startLink.href = session.meetingLink;
      startLink.textContent = "Start Session";
      startLink.classList.add("start-button");

      const cancelButton = document.createElement("button");
      cancelButton.textContent = "Cancel Session";
      cancelButton.classList.add("cancel-button");
      cancelButton.addEventListener("click", () =>
        handleCancelSession(session.id)
      );

      actionsDiv.appendChild(startLink);
      actionsDiv.appendChild(cancelButton);
    } else {
      const notesLink = document.createElement("a");
      notesLink.href = "#";
      notesLink.textContent = "Add Notes";
      notesLink.classList.add("start-button");
      actionsDiv.appendChild(notesLink);
    }

    card.appendChild(actionsDiv);
    return card;
  };

  const handleCancelSession = (sessionId) => {
    if (
      confirm(
        "Are you sure you want to cancel this session? This action cannot be undone."
      )
    ) {
      const index = sessions.findIndex((session) => session.id === sessionId);
      if (index !== -1) {
        sessions.splice(index, 1);
        upcomingSessionsContainer.innerHTML = "";
        renderSessions(sessions, upcomingSessionsContainer, "upcoming");
      }
    }
  };

  async function fetchSessionsData() {
    try {
      const response = await fetch("../data/sessionsData-mentor.json");
      if (!response.ok) {
        throw new Error("Failed to load session data.");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  renderSessions(sessions, upcomingSessionsContainer, "upcoming");
  renderSessions(sessions, pastSessionsContainer, "past");
});
