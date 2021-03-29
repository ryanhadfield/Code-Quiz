// DOM Elements
let startQuiz = document.querySelector("#startButton");
let nextQuestionEl = document.querySelector("#nextQuestion");
let timerEl = document.querySelector(".timer");
let questionsEl = document.querySelector("#questions");
let leadEl = document.querySelector(".lead");
let timerId = "";

// // Timer for the Quiz
// startQuiz.addEventListener("click", function () {
//         var timerInterval = setInterval(function() {
//           secondsLeft--;
//           timerEl.textContent = "Time Remaining: " + secondsLeft;

//           if(secondsLeft === 0) {
//             clearInterval(timerInterval);
//             sendMessage();
//           }
//         }, 1000);
//     });

// Questions & Answers
let questions = [
  {
    q: "What is an example of a variable in Javascript?",
    choices: ["var", "const", "let", "all of the above"],
    answer: 3,
  },
  {
    q: "What symbols would you use to create an array?",
    choices: ["{ }", "` `", "[ ]", "( )"],
    answer: 2,
  },
  {
    q:
      "The ________ method displays an box with a specified message and an OK button.",
    choices: ["prompt", "alert", "Console Log", "Warning"],
    answer: 1,
  },
  {
    q: "What symbols would you use to create an object?",
    choices: ["{ }", "` `", "[ ]", "( )"],
    answer: 0,
  },
  {
    q: "What does DOM stand for?",
    choices: [
      "Do Over Man",
      "Document Object Model",
      "Dominant Object Matrix",
      "Document Object Method",
    ],
    answer: 1,
  },
];

let questionsIndex = 0;
let score = 0;

// Timer is 15 seconds for each question
let secondsLeft = questions.length * 1;

// Game Functions
function startGame() {
  questionsEl.classList.remove("hide");
  startQuiz.classList.add("hide");
  leadEl.classList.add("hide");
  timerEl.classList.remove("hide"),
  setTimer();
}

function setTimer() {
  timerId = setInterval(countDown, 1000);
}

function countDown() {
  secondsLeft = secondsLeft - 1;
  timerEl.textContent = secondsLeft;
  if (secondsLeft === 0) {
    clearInterval(timerId);
  }
  nextQuestion();
}

function wrongAnswer() {}

function selectAnswer() {}

function nextQuestion() {
  questionsEl.innerHTML = `
  <h4 id="question">${questions[questionsIndex].q}</h4>
  <div class="d-grid gap-2 col-6 mx-auto">
      <button type="button" class = "btn btn-primary answers" id="a1">${questions[questionsIndex].choices[0]}</button>
      <button type="button" class = "btn btn-primary answers" id="a2">${questions[questionsIndex].choices[1]}</button>
      <button type="button" class = "btn btn-primary answers" id="a3">${questions[questionsIndex].choices[2]}</button>
      <button type="button" class = "btn btn-primary answers" id="a4">${questions[questionsIndex].choices[3]}</button>
  </div>`;

  let answersEl = document.querySelectorAll(".answers");

  for (let i = 0; i < answersEl.length; i++) {
    answersEl[i].addEventListener("click", function () {
      questionsIndex = questionsIndex + 1;
    });
  }
}

startQuiz.addEventListener("click", startGame);
