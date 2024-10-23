document.addEventListener("DOMContentLoaded", () => {
  const chatMessages = document.getElementById("chat-messages");
  const chatForm = document.getElementById("chat-form");
  const messageInput = document.getElementById("message-input");
  const mentorList = document.getElementById("mentor-list");

  let currentMentor = "birmohan-singh";
  let mentorResponses = {};

  fetch("../data/mentor-responses.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load mentor responses.");
      }
      return response.json();
    })
    .then((data) => {
      mentorResponses = data;
      console.log("Mentor responses loaded:", mentorResponses);
    })
    .catch((error) => console.error("Error loading mentor responses:", error));

  const addMessage = (content, isSent) => {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", isSent ? "sent" : "received");
    messageElement.textContent = content;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = messageInput.value.trim();

    if (message) {
      addMessage(message, true);
      messageInput.value = "";

      setTimeout(() => {
        const responses = mentorResponses[currentMentor];

        if (responses && responses.length > 0) {
          const randomResponse =
            responses[Math.floor(Math.random() * responses.length)];
          addMessage(randomResponse, false);
        } else {
          addMessage("I don't have a response for that yet.", false);
        }
      }, 1000);
    }
  });

  mentorList.addEventListener("click", (e) => {
    const mentorItem = e.target.closest(".mentor-item");

    if (mentorItem) {
      document.querySelector(".mentor-item.active").classList.remove("active");
      mentorItem.classList.add("active");

      currentMentor = mentorItem.dataset.mentor;
      chatMessages.innerHTML = "";

      addMessage(
        `You are now chatting with ${
          mentorItem.querySelector("h3").textContent
        }`,
        false
      );
    }
  });

  const tips = document.querySelectorAll(".animate-tip");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = "running";
        observer.unobserve(entry.target);
      }
    });
  });

  tips.forEach((tip) => observer.observe(tip));
});
