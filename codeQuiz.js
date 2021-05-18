// DOM Elements
let startQuiz = document.querySelector("#startButton");
let nextQuestionEl = document.querySelector("#nextQuestion");
let timerEl = document.querySelector("#timer");
let questionsEl = document.querySelector("#questions");
let leadEl = document.querySelector(".lead");
// let inputEl = document.querySelector("#inputdiv")
let highScoreEl = document.querySelector("#highscores")
let timerId = "";

// Timer for the Quiz
startQuiz.addEventListener("click", startGame);

// Questions & Answers
let questions = [
  {
    q: "What is an example of a variable in Javascript?",
    choices: ["var", "const", "let", "all of the above"],
    answer: "all of the above",
  },
  {
    q: "What symbols would you use to create an array?",
    choices: ["{ }", "` `", "[ ]", "( )"],
    answer: "[ ]",
  },
  {
    q:
      "The ________ method displays an box with a specified message and an OK button.",
    choices: ["prompt", "alert", "Console Log", "Warning"],
    answer: "alert",
  },
  {
    q: "What symbols would you use to create an object?",
    choices: ["{ }", "` `", "[ ]", "( )"],
    answer: "{ }",
  },
  {
    q: "What does DOM stand for?",
    choices: [
      "Do Over Man",
      "Document Object Model",
      "Dominant Object Matrix",
      "Document Object Method",
    ],
    answer: "Document Object Model",
  },
];

let questionsIndex = 0;
// let score = 0;

// Timer is 15 seconds for each question
let secondsLeft = questions.length * 15;

// Game Functions
function startGame() {
  questionsEl.classList.remove("hide");
  startQuiz.classList.add("hide");
  leadEl.classList.add("hide");
  timerEl.classList.remove("hide");
  setTimer();
}


function setTimer() {
  timerId = setInterval(countDown, 1000);
}

function countDown() {

  if (secondsLeft > 0) {
    secondsLeft = secondsLeft - 1;
  } else {
    secondsLeft = 0
  }

  timerEl.textContent = secondsLeft;
  if (secondsLeft === 0 || questionsIndex >= questions.length) {
    questionsEl.classList.add("hide");
    timerEl.classList.add("hide");
    // inputEl.classList.remove("hide");
    highScoreEl.classList.remove("hide");
    clearInterval(timerId);
    endGame();
  } else {
    nextQuestion();
  }
}


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
      console.log(this.textContent, questions[questionsIndex].answer)

      if (this.textContent != questions[questionsIndex].answer) {
        secondsLeft = secondsLeft - 15
      }

      if (questionsIndex < questions.length) {
        questionsIndex = questionsIndex + 1;
      } else {
        questionsEl.classList.add("hide");
        timerEl.classList.add("hide");
        // inputEl.classList.remove("hide");
        highScoreEl.classList.remove("hide");
        endGame();
        clearInterval(timerId);
      }
    });
  }
}

function endGame() {
  clearInterval(timerId);
  highScoreEl.innerHTML = `
  <h2>Game over!</h2>
  <h3>Your score is  ${secondsLeft}</h3>
  <input type="text" id="name" placeholder="First name"> 
  <button onclick="setScore()">Set score!</button>`;

}

function setScore() {
  localStorage.setItem("highscore", secondsLeft);
  localStorage.setItem("highscoreName", document.getElementById('name').value);
  getScore();
}

function getScore() {
  let quizContent = `
  <h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
  <h1>` + localStorage.getItem("highscore") + `</h1><br>  
  `;

  highScoreEl.innerHTML = quizContent;
}



// startQuiz.addEventListener("click", startGame);
