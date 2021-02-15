var timeCountdown = document.querySelector("#countdown");
var startButton = document.querySelector("#start");
var startPage = document.querySelector("#homepage");
var quizQuestions = document.querySelector("#quizpage");
var questionShown = document.querySelector("#quizquestion");
var questionOptions = document.querySelector("#options");
var answer = document.querySelector("#rightwrong");
var button1= document.querySelector("#buttonA");
var button2 = document.querySelector("#buttonB");
var button3 = document.querySelector("#buttonC");
var button4 = document.querySelector("#buttonD");
var quesResult = document.querySelector("#result");

var scoreInfo = document.querySelector("#scoreboard");
var userScore = document.querySelector("#score");
var userInitials = document.querySelector("#initials");
var submitBtn = document.querySelector("#submitScore");

var highscorePage = document.querySelector("#highscorepage");
var highscoreList = document.querySelector("#highscorerankings");
var playAgain = document.querySelector("#startover");
var clearScores = document.querySelector("#clearscores");


quizQuestions.style.display="none"; 
scoreInfo.style.display="none";
highscorePage.style.display="none";


var score = 0;
var questionNumber = 0;
var timer;
var timerCount;
var correctAnswer;

var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        optionA: "strings",
        optionB: "booleans",
        optionC: "alerts",
        optionD: "numbers",
        correct: "C",
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        optionA: "quotes",
        optionB: "curly brackets",
        optionC: "parentheses",
        optionD: "square brackets",
        correct: "C"
    },
    {
        title: "Arrays in Javascript can be used to store ____.",
        optionA: "numbers and strings",
        optionB: "other arrays",
        optionC: "booleans",
        optionD: "all of the above",
        correct: "D"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        optionA: "commas",
        optionB: "curly brackets",
        optionC: "quotes",
        optionD: "parenthesis",
        correct: "C"
    },
    {
        title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        optionA: "Javascript",
        optionB: "terminal / bash",
        optionC: "for loops",
        optionD: "console log",
        correct: "D"
    },

];

var finalQuestionIndex = questions.length;
var currentQuestionIndex = 0;

function generateQuestion(){
    quizQuestions.style.display="block";

    if (currentQuestionIndex === finalQuestionIndex){
        return setScore();
    } 
    var currentQuestion = questions[currentQuestionIndex];
    questionShown.innerHTML = "<p>" + currentQuestion.title + "</p>";

    button1.innerHTML = currentQuestion.optionA;
    button2.innerHTML = currentQuestion.optionB;
    button3.innerHTML = currentQuestion.optionC;
    button4.innerHTML = currentQuestion.optionD;
};

function checkAnswer (answer) {
    correctAnswer = questions[currentQuestionIndex].correct;

    if (answer === correctAnswer && currentQuestionIndex !== finalQuestionIndex){
        currentQuestionIndex++;
        quesResult.innerHTML = "That is correct!";
        score++;
        generateQuestion();
    }
    else if (answer !== correctAnswer && currentQuestionIndex !== finalQuestionIndex) {
        timerCount = timerCount - 10;
        score--;
        currentQuestionIndex++;
        quesResult.innerHTML ="That is incorrect.";
        generateQuestion();
    }
    else {
        setScore();
    }
}

function startQuiz () {         
    startButton.disabled = true;
    timerCount = 75;
    startPage.style.display = "none";
    startTimer()
    generateQuestion();
}

function startTimer() {
    timeCountdown.textContent = timerCount;
    // Sets timer
    timer = setInterval(function() {
        timerCount--;
        timeCountdown.textContent = timerCount;
        if (timerCount >= 0) {
            // Tests if win condition is met
            if (currentQuestionIndex === finalQuestionIndex && timerCount > 0) {
              // Clears interval and stops timer
              clearInterval(timer);
              setScore();
            }
          }

        if (timerCount === 0) {
            clearInterval(timer);
            setScore();
          }
          
    }, 1000);

}

function setScore() {
    quizQuestions.style.display="none";
    scoreInfo.style.display="block";
    timeCountdown.textContent = "";
    userScore.textContent = "Your score: " + score;
    localStorage.setItem("scoreCount", score);
}

function getHighScores () {
    scoreInfo.style.display="none";
    highscorePage.style.display = "block";
    var highscoreData = JSON.parse(localStorage.getItem("highscoreInfo"));

    for (i = 0; i < highscoreData.length; i++) {
        var scoreboardList = document.createElement('ul');
        scoreboardList

        highscoreList.document.createElement("ul");
        document.highscoreList.appendChild()
        var listItem = document.createElement("li");
        listItem.document.innerHTML(highscoreData[i]);
        document.highscoreList
    }
}



// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startQuiz);

playAgain.addEventListener("click", startQuiz);

clearScores.addEventListener("click", function clearScores(){
    localStorage.clear();
});

submitBtn.addEventListener("click", function storeScore(){

    if (userInitials === "") {
        alert("You must enter your initials");
    }
    else {
        var highscores = [];
        var user = userInitials.value.trim();
        highscores.push("initials: " + user + " Score: " + score)
        localStorage.setItem("highscoreInfo", JSON.stringify(highscores));
        getHighScores();
    }

});

playAgain.addEventListener("click", startQuiz);

startButton.addEventListener("click", startQuiz);


// submitBtn.addEventListener("click", function storeScore(){

//     if (userInitials === "") {
//         alert("You must enter your initials");
//     }
//     else {
//         console.log(userInitials);
//         var highscores = {
//             users: [],
//         };
//         var user = userInitials.value.trim();
//         var userInfo = {
//             name: user,
//             score: score
//         };
//         highscores.users.push(userInfo);
//         localStorage.setItem("highscoreInfo", JSON.stringify(highscores));
//         getHighScores();
//     }
// });