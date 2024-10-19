document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Parallax scrolling effect for the hero section background
  const hero = document.querySelector(".hero");
  window.addEventListener("scroll", () => {
    const scrollPosition = window.pageYOffset;
    hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
  });

  // Animate features as they appear in the viewport
  const features = document.querySelectorAll(".feature");
  const animateFeatures = () => {
    const triggerBottom = (window.innerHeight / 5) * 4;
    features.forEach((feature) => {
      const featureTop = feature.getBoundingClientRect().top;
      if (featureTop < triggerBottom) {
        feature.style.opacity = "1";
        feature.style.transform = "translateY(0)";
      }
    });
  };

  window.addEventListener("scroll", animateFeatures);
  animateFeatures();
});

document.addEventListener("DOMContentLoaded", () => {
  // Retrieve user achievements from local storage or initialize default values
  let userAchievements = JSON.parse(
    localStorage.getItem("userAchievements")
  ) || {
    sessionsAttended: 0,
    questionsAsked: 0,
    studyRoomsJoined: 0,
  };

  // Update achievements based on user actions
  function updateAchievements(action) {
    switch (action) {
      case "attendSession":
        userAchievements.sessionsAttended++;
        checkAchievement("sessionsAttended", [1, 5, 10]);
        break;
      case "askQuestion":
        userAchievements.questionsAsked++;
        checkAchievement("questionsAsked", [1, 10, 50]);
        break;
      case "joinStudyRoom":
        userAchievements.studyRoomsJoined++;
        checkAchievement("studyRoomsJoined", [1, 5, 15]);
        break;
    }

    localStorage.setItem("userAchievements", JSON.stringify(userAchievements));
  }

  // Check if the user has reached an achievement level
  function checkAchievement(type, levels) {
    const value = userAchievements[type];
    for (let level of levels) {
      if (value === level) {
        showAchievementPopup(type, level);
        break;
      }
    }
  }

  // Display a popup when an achievement is unlocked
  function showAchievementPopup(type, level) {
    const popup = document.createElement("div");
    popup.classList.add("achievement-popup");
    popup.innerHTML = `
      <img src="../images/achievement-badge.svg" alt="Achievement">
      <span>Achievement Unlocked: ${getAchievementTitle(type, level)}</span>
    `;
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 5000);
  }

  // Get the title of the unlocked achievement based on type and level
  function getAchievementTitle(type, level) {
    const titles = {
      sessionsAttended: [
        "First Session",
        "Regular Learner",
        "Dedicated Student",
      ],
      questionsAsked: [
        "Curious Mind",
        "Inquisitive Thinker",
        "Master Inquirer",
      ],
      studyRoomsJoined: [
        "Team Player",
        "Collaboration Expert",
        "Study Group Maestro",
      ],
    };
    const index = Math.log2(level);
    return titles[type][index];
  }

  updateAchievements("attendSession");
  updateAchievements("askQuestion");
  updateAchievements("joinStudyRoom");
});
