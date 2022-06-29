var questionIndex = 0;
var questions = [
    {
        text:"this is question 1", 
        choices: ["true","false","maybe","probably not"],
        correct: "maybe"
    },
    {
        text:"this is question 2", 
        choices: ["true","false","maybe","probably not"],
        correct: "true"
    },
    {
        text:"this is question 3", 
        choices: ["true","false","maybe","probably not"],
        correct: "false"
    }
];

console.log(questions);

//display questions and answer choices in a button
function questionCycle() {
    var displayQuestion = document.getElementById("question-box");
    var displayChoices = document.getElementById("choice-box");
    var displayedQuestion = questions[questionIndex];
    displayQuestion.textContent = displayedQuestion.text;
    displayChoices.textContent=displayedQuestion.choices;
    //add loop
    // for (var i=0; i < displayedQuestion.length; i++) {
    //     pageContentEl.addEventListener("click",questions);
    // }
     
}
questionCycle()

//cycle through questions when a button is clicked

//start screen creation with start button

// button needs to add class to start screen to make screen disappear and remove class from questions to make it visible
    //.remove() method to get Html section off page

//button needs to start timer

//add timer