var i = 0;
var questions = [
  {
    qText: "Inside which HTML element do we put the JavaScript?",
    choices: ["<script>", "<js>", "<javascript>", "<scripting>"],
    correct: "<script>",
  },
  {
    qText: "The external JavaScript file must contain the <script> tag.",
    choices: ["true", "false"],
    correct: "false",
  },
  {
    qText: "How do you create a function in JavaScript?",
    choices: [
      "function:myFunction()",
      "function = myFunction()",
      "function myFunction()",
    ],
    correct: "function myFunction()",
  },
  {
    qText: "How do you call a function named 'myFunction'?",
    choices: [
      "call function myFunction()",
      "call myFunction()",
      "myFunction()",
    ],
    correct: "myFunction()",
  },
  {
    qText: "How to write an IF statement in JavaScript?",
    choices: ["if i = 5", "if i == 5 then", "if i = 5 then", "if (i == 5)"],
    correct: "if (i == 5)",
  },
  {
    qText: "How does a FOR loop start?",
    choices: [
      "for (i = 0; i <= 5; i++)",
      "for (i = 0; i <= 5)",
      "for (i <= 5; i++)",
      "for i=1 to 5",
    ],
    correct: "for (i = 0; i <= 5; i++)",
  },
  {
    qText: "How can you add a comment in a JavaScript?",
    choices: [
      "//This is a comment",
      "'This is a comment'",
      "<!--This is a comment-->",
    ],
    correct: "//This is a comment",
  },
  {
    qText: "JavaScript is the same as Java",
    choices: ["True", "False"],
    correct: "False",
  },
  {
    qText: "Which event occurs when the user clicks on an HTML element?",
    choices: ["onmouseover", "onmouseclick", "onclick", "onchange"],
    correct: "onclick",
  },
  {
    qText: "How do you declare a JavaScript variable?",
    choices: ["variable carName;", "var carName;", "v carName;"],
    correct: "var carName;",
  },
];

console.log(questions);

var displayQuestion = document.getElementById("question-box");
var displayChoices = document.getElementById("choice-box");
var timerEl = document.getElementById("time-clock");
var startButtonEl = document.getElementById("quiz-start");
var qContainerEl = document.getElementById("question-container");
var endGameEl = document.getElementById("game-end");
var finalScoreEl = document.getElementById("final-score");
var timeLeft = 74;

//display questions and answer choices in a button
function questionCycle(i) {
  var displayedQuestion = questions[i].qText;
  var answerChoices = questions[i].choices;
  var correctChoice = questions[i].correct;

  displayQuestion.textContent = displayedQuestion;

  for (var aI = 0; aI < answerChoices.length; aI++) {
    var ansButton = document.createElement("li");
    ansButton.setAttribute("class", "single-answer");
    if (correctChoice === answerChoices[aI]) {
      ansButton.setAttribute("id", "correct-choice-" + aI);
    } else {
      ansButton.setAttribute("id", "choice-" + aI);
    }
    ansButton.textContent = answerChoices[aI];
    displayChoices.appendChild(ansButton);
  }

  console.log(displayChoices);
}

displayChoices.addEventListener("click", function ckAnswer(Event) {
  var targetEl = Event.target;
  console.log(targetEl);
  if (!targetEl.id.includes("correct")) {
    timeLeft - 10;
    console.log(timeLeft);
    nextQuestion();
  } else {
    timeLeft + 5;
    console.log(timeLeft);
    nextQuestion();
  }
});

function endGame() {
  score = timeLeft;

  timerEl.classList.add("display-none");
  qContainerEl.classList.add("display-none");
  endGameEl.classList.remove("display-none");
  finalScoreEl.textContent = score;

  saveScore();
}

//cycle through questions when a button is clicked
function nextQuestion() {
  displayChoices.innerHTML = "";
  displayQuestion.innerHTML = "";
  i++;
  if (i >= questions.length || timeLeft === 0) {
    endGame();
  } else {
    questionCycle(i);
  }
}

startButtonEl.addEventListener("click", function beginGame() {
  var startScreenEl = document.getElementById("start-screen");
  //remove start screen and button and begins countdown
  startScreenEl.remove();
  qContainerEl.classList.remove("display-none");
  countdown();
  questionCycle(i);
});

//add timer
function countdown() {
  //set interval to countdown every second (1000 milliseconds)
  var timeInterval = setInterval(function () {
    //if timer has more than 1 second left, start countdown
    if (timeLeft > 1) {
      //show remaining seconds
      timerEl.textContent = timeLeft + " seconds remaining";
      //decrement remaining time
      timeLeft--;
    } else if (timeLeft === 1) {
      timerEl.textContent = timeLeft + " second remaining";
      timeLeft--;
    } else {
      //when timer reaches 0, set to empty string
      timerEl.textContent = timeLeft;
      //stop timer
      clearInterval(timeInterval);
    }
  }, 1000);
}

//save high score to local storage
function saveScore() {
  var inputInitials = document.getElementById("initials");
  var tempHighScoreArray = [];

  if (inputInitials.value != "" || inputInitials.value != null) {
    var highScoreArray = {
      name: inputInitials.value,
      score: score,
    }

    if (window.localStorage.getItem("highScores") == null) {
      tempHighScoreArray.push(highScoreArray);
      window.localStorage.setItem(
        "highScores",
        JSON.stringify(tempHighScoreArray)
      );
    } else {
      tempHighScoreArray = JSON.parse(
        window.localStorage.getItem("highScores")
      );

      for (let sI = 0; sI < tempHighScoreArray.length; sI++) {
        if (sI == tempHighScoreArray.length) {
          tempHighScoreArray.push(highScoreArray);
          break;
        } else if (tempHighScoreArray[sI].score < score) {
          tempHighScoreArray.splice(sI, 0, highScoreArray);
          break;
        }
      }
      window.localStorage.setItem(
        "highScores",
        JSON.stringify(tempHighScoreArray)
      );
    }
    inputInitials.value = "";
    viewHighScores();
  }
}

//view high scores functionality
function viewHighScores() {}
