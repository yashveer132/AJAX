document.addEventListener("DOMContentLoaded", () => {
  const questionContainer = document.getElementById("question-container");
  const questionText = document.getElementById("question-text");
  const answerButtons = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");
  const quizProgress = document.getElementById("quiz-progress");
  const resultContainer = document.getElementById("result-container");
  const mentorMatchResult = document.getElementById("mentor-match-result");

  const questions = [
    {
      question: "What is your primary area of interest?",
      answers: [
        "Artificial Intelligence",
        "Web Development",
        "Data Science",
        "Cybersecurity",
      ],
    },
    {
      question: "What is your current academic year?",
      answers: ["1st Year", "2nd Year", "3rd Year", "4th Year"],
    },
    {
      question: "What type of guidance are you looking for?",
      answers: [
        "Career Advice",
        "Technical Skills",
        "Research Opportunities",
        "Industry Connections",
      ],
    },
    {
      question: "What is your preferred mentorship style?",
      answers: [
        "Hands-on Practical",
        "Theoretical Discussion",
        "Project-based",
        "Career-oriented",
      ],
    },
    {
      question: "How often would you like to meet with your mentor?",
      answers: ["Weekly", "Bi-weekly", "Monthly", "As needed"],
    },
  ];

  let currentQuestionIndex = 0;
  let userResponses = [];

  function startQuiz() {
    currentQuestionIndex = 0;
    userResponses = [];
    showQuestion(questions[currentQuestionIndex]);
    nextButton.style.display = "none";
    resultContainer.style.display = "none";
    updateProgress();
  }

  function showQuestion(question) {
    questionText.textContent = `Question ${currentQuestionIndex + 1}: ${
      question.question
    }`;
    answerButtons.innerHTML = "";
    question.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.textContent = answer;
      button.classList.add("answer-btn");
      button.addEventListener("click", selectAnswer);
      answerButtons.appendChild(button);
    });
  }

  function selectAnswer(e) {
    const selectedButton = e.target;
    const allButtons = answerButtons.getElementsByTagName("button");
    Array.from(allButtons).forEach((button) =>
      button.classList.remove("selected")
    );
    selectedButton.classList.add("selected");
    nextButton.style.display = "block";
  }

  function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    quizProgress.style.setProperty("--progress", `${progress}%`);
  }

  nextButton.addEventListener("click", () => {
    const selectedAnswer = answerButtons.querySelector(".selected");
    if (selectedAnswer) {
      userResponses.push(selectedAnswer.textContent);
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
        nextButton.style.display = "none";
        updateProgress();
      } else {
        showResult();
      }
    }
  });

  function showResult() {
    questionContainer.style.display = "none";
    nextButton.style.display = "none";
    resultContainer.style.display = "block";

    const mentors = [
      {
        name: "Dr. Anita Sharma",
        specialty: "Artificial Intelligence",
        image: "../images/female.png",
      },
      {
        name: "Prof. Rajesh Kumar",
        specialty: "Web Development",
        image: "../images/male.jpg",
      },
      {
        name: "Dr. Priya Patel",
        specialty: "Data Science",
        image: "../images/female.png",
      },
      {
        name: "Prof. Amit Singh",
        specialty: "Cybersecurity",
        image: "../images/male.jpg",
      },
    ];

    const matchedMentor = mentors[Math.floor(Math.random() * mentors.length)];

    mentorMatchResult.innerHTML = `
            <img src="${matchedMentor.image}" alt="${matchedMentor.name}">
            <h3>${matchedMentor.name}</h3>
            <p>Specialty: ${matchedMentor.specialty}</p>
            <p>Based on your responses, we think ${matchedMentor.name} would be an excellent mentor for you!</p>
        `;
  }

  startQuiz();
});
