document.addEventListener("DOMContentLoaded", () => {
  const chatMessages = document.getElementById("chat-messages");
  const chatForm = document.getElementById("chat-form");
  const messageInput = document.getElementById("message-input");
  const mentorList = document.getElementById("mentor-list");

  let currentMentor = "anita-sharma";

  const mentorResponses = {
    "anita-sharma": [
      "That's an interesting question about AI. Let me explain...",
      "In machine learning, we often use techniques like...",
      "When it comes to neural networks, it's important to understand...",
    ],
    "rajesh-kumar": [
      "For web development, I would recommend starting with...",
      "React is a powerful framework that allows you to...",
      "When optimizing website performance, consider techniques like...",
    ],
    "priya-patel": [
      "In data science, the first step is usually to...",
      "For that kind of analysis, I would suggest using...",
      "Data visualization is crucial because it allows us to...",
    ],
    "sunil-mathur": [
      "In cybersecurity, it’s essential to stay updated on the latest threats.",
      "Ethical hacking can help identify vulnerabilities before attackers do.",
      "Always follow the best practices for password management and encryption.",
    ],
    "meena-verma": [
      "Cloud computing offers scalability and flexibility for businesses.",
      "AWS and Azure are two of the most popular cloud platforms.",
      "When working with cloud resources, cost management is crucial.",
    ],
    "amit-singh": [
      "Blockchain technology ensures data integrity and decentralization.",
      "Smart contracts are self-executing contracts with the terms directly written in code.",
      "For blockchain development, I suggest learning Solidity.",
    ],
    "sneha-das": [
      "Game development requires a blend of creativity and technical skills.",
      "Unity 3D is a great engine to start with for beginners.",
      "When designing games, focus on user experience and performance optimization.",
    ],
  };

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
        const randomResponse =
          responses[Math.floor(Math.random() * responses.length)];
        addMessage(randomResponse, false);
      }, 1000);
    }
  });

  mentorList.addEventListener("click", (e) => {
    const mentorItem = e.target.closest(".mentor-item");
    if (mentorItem) {
      document.querySelector(".mentor-item.active").classList.remove("active");
      mentorItem.classList.add("active");
      currentMentor = mentorItem.dataset.mentor;
      chatMessages.innerHTML = ""; // Clear chat when switching mentors
      addMessage(
        `You are now chatting with ${
          mentorItem.querySelector("h3").textContent
        }`,
        false
      );
    }
  });

  const tips = document.querySelectorAll(".animate-tip");
  const animateOnScroll = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = `${
          Array.from(tips).indexOf(entry.target) * 0.1
        }s`;
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(animateOnScroll, {
    root: null,
    threshold: 0.1,
    rootMargin: "0px",
  });

  tips.forEach((tip) => {
    observer.observe(tip);
  });

  const animateText = document.querySelectorAll(".animate-text");
  animateText.forEach((text, index) => {
    text.style.animationDelay = `${index * 0.3}s`;
  });

  addMessage("Welcome to the chat! How can I assist you today?", false);
});
