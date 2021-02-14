var timeCountdown = document.querySelector("#countdown");
var startButton = document.querySelector("#start");

var score = 0;
var questionNumber = 0;
var timer;
var timerCount;

var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        options: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        options: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in Javascript can be used to store ____.",
        options: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        options: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        options: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    },

];


function startQuiz () {          
    startButton.disabled = true;
    timerCount = 75;
    //renderBlanks()
    startTimer()
}

function startTimer () {
    // Sets timer
    timer = setInterval(function() {
        timerCount--;
        timeCountdown.textContent = timerCount;
        if (timerCount >= 0) {
        // Tests if win condition is met
            if (timerCount > 0) {
                // Clears interval and stops timer
                clearInterval(timer);
                // winGame();
            }
        }
        // Tests if time has run out
        if (timerCount === 0) {
        // Clears interval
        clearInterval(timer);
        // loseGame();
        }
    }, 1000);
}

// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startQuiz);