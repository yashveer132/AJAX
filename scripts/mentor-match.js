document.addEventListener("DOMContentLoaded", () => {
  const questionContainer = document.getElementById("question-container");
  const questionText = document.getElementById("question-text");
  const answerButtons = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");
  const quizProgress = document.getElementById("quiz-progress");
  const resultContainer = document.getElementById("result-container");
  const mentorMatchResult = document.getElementById("mentor-match-result");

  let questions = [];
  let mentors = [];
  let currentQuestionIndex = 0;
  let userResponses = [];

  function fetchData() {
    Promise.all([
      fetch("../data/quiz-questions.json").then((res) => res.json()),
      fetch("../data/mentors-quiz.json").then((res) => res.json()),
    ])
      .then(([quizData, mentorData]) => {
        questions = quizData;
        mentors = mentorData;
        startQuiz();
      })
      .catch((error) => console.error("Error loading data:", error));
  }

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
    Array.from(answerButtons.getElementsByTagName("button")).forEach((button) =>
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

    const matchedMentor =
      mentors.find((mentor) =>
        mentor.specialty.some((specialty) => userResponses.includes(specialty))
      ) || mentors[Math.floor(Math.random() * mentors.length)];

    mentorMatchResult.innerHTML = `
      <img src="${matchedMentor.image}" alt="${matchedMentor.name}">
      <h3>${matchedMentor.name}</h3>
      <p>Specialty: ${matchedMentor.specialty.join(", ")}</p>
      <p>Based on your responses, we think ${
        matchedMentor.name
      } would be an excellent mentor for you!</p>
    `;
  }

  fetchData();
});
