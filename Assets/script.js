const questions = [
    {
        question: "Commonly used data types do NOT include:",
        choices: ["a. Strings", "b. Booleans", "c. Alerts", "d. Numbers"],
        answer: "c. Alerts"
    },
    {
        question: "The condition in an if/else statement is enclosed in:",
        choices: ["a. Quotes", "b. Parenthesis", "c. Curly Brackets", "d. Square Brackets"],
        answer: "b. Parenthesis"
    },
    {
        question: "Arrays in JavaScript can be used to store:",
        choices: ["a. Numbers and Strings", "b. Other Arrays", "c. Booleans", "d. All of the Above"],
        answer: "d. All of the Above"
    },
    {
        question: "String values must be enclosed within _______ when being assigned to variables",
        choices: ["a. Commas", "b. Curly Brackets", "c. Quotes", "d. Parenthesis"],
        answer: "c. Quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["a. JavaScript", "b. Terminal Bash", "c. for loops", "d. console.log"],
        answer: "d. console.log"
    }
];

var time = 60;
var currentQuestionIndex = 0;
var timerId;
var questionDiv = document.getElementById("questions");
var questionChoiceDiv = document.getElementById("questionChoices");
var timeLeft = document.getElementById("timeLeft");
var startBtn = document.getElementById("start");
var finishQuiz = document.getElementById("finishQuiz");
var quizContainer = document.getElementById("quizContainer");
var timer = document.getElementById("timer");
var correct = 0;
var finalScore = document.getElementById("finalScore");
var initialInput = document.getElementById("initialInput");
var submitButton = document.getElementById("submitButton");
var viewHighScores = document.getElementById("viewHighScores");
var highScores = document.getElementById("highScores");
var retakeQuiz = document.getElementById("retakeQuiz");

//startBtn.addEventListener("click", startQuiz())
startBtn.onclick = startQuiz;

function startQuiz(){
    // show questions div when start button is clicked
questionDiv.removeAttribute("class")
timer.removeAttribute("class")
    // start timer when startBtn clicked
timerId = setInterval(tickingClock, 1000)

showQuestions()

}

function tickingClock(){
    time--;
    timeLeft.textContent = time;
    if (time <= 0){
        location.reload()
        window.alert("You have run out of time! You must restart the quiz.")
    }
}

function showQuestions(){

    startBtn.style.display = 'none'; 

    var currentQuestion = questions[currentQuestionIndex];

    var titleElement = document.getElementById("questionTitle");
    titleElement.textContent = currentQuestion.question;

    questionChoiceDiv.innerHTML = '';

    currentQuestion.choices.forEach(function(choice){
        var choiceBtn = document.createElement("button");

        choiceBtn.setAttribute("value", choice);
        choiceBtn.setAttribute("class", "choice")

        choiceBtn.textContent = choice;

        questionChoiceDiv.append(choiceBtn);

        choiceBtn.onclick = handleClick;
    })

}

// for(var i = 0; i < questions.length; i++){
//     console.log(questions[0])
// }

function handleClick(){
    // testing right or wrong answer
    if(this.value === questions[currentQuestionIndex].answer){
        correct++
        console.log("currect answer", correct)
    } else {
        time -= 10;
    }
    // moving on to next question
    currentQuestionIndex++;
    console.log('currentquestionindex', currentQuestionIndex)

    if(currentQuestionIndex === questions.length){
        endGame()
    } else{
        showQuestions()
    }
}

function endGame(){
    finishQuiz.removeAttribute("class")
    quizContainer.style.display = 'none'; 
    questionDiv.style.display = 'none'; 
    finalScore.textContent = correct;
}

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    let userInput = initialInput.value
    const userData = {
        name: userInput, // name: 'mb'
        score: correct  
    }

    // check to see if there is data in localStorage
    var scoresData = localStorage.getItem("scores"); // null || '[]' =>  []

    // conditional
    if(scoresData != null){
     scoresData = JSON.parse(scoresData); // => []
    }
    else{
        scoresData = []; 
    }

    scoresData.push(userData);  

    // save the data //JSON.stringify()
    var scoresArrayString = JSON.stringify(scoresData);
    window.localStorage.setItem("scores", scoresArrayString);

    displayHighScores();
})

function displayHighScores(){
    viewHighScores.removeAttribute("class")
    finishQuiz.style.display = 'none'; 

    var savedHighScores = localStorage.getItem("scores");

    var storedHighScores = JSON.parse(savedHighScores);

    for (let i = 0; i < storedHighScores.length; i++) {
        var eachNewHighScore = document.createElement("li");
        eachNewHighScore.innerHTML = storedHighScores[i].name + ": " + storedHighScores[i].score;
        highScores.appendChild(eachNewHighScore);
    }
}

retakeQuiz.addEventListener('click', function(){
        location.reload()
    })