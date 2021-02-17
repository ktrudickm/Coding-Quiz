var timeCountdownEl = document.querySelector("#countdown");
var highscoreBtnEl = document.querySelector("#highscorelog");
var startButton = document.querySelector("#start");
var startPageEl = document.querySelector("#homepage");
var quizQuestionsEl = document.querySelector("#quizpage");
var questionShownEl = document.querySelector("#quizquestion");
var answer = document.querySelector("#rightwrong");
var button1= document.querySelector("#buttonA");
var button2 = document.querySelector("#buttonB");
var button3 = document.querySelector("#buttonC");
var button4 = document.querySelector("#buttonD");
var quesResultEl = document.querySelector("#result");

var scoreInfoEl = document.querySelector("#scoreboard");
var userScoreEl = document.querySelector("#score");
var userInitialsEl = document.querySelector("#initials");
var submitBtn = document.querySelector("#submitScore");

var highscorePageEl = document.querySelector("#highscorepage");
var highscoreListEl = document.querySelector("#highscorerankings");
var playAgainEl = document.querySelector("#startover");
var clearScoresEl = document.querySelector("#clearscores");


quizQuestionsEl.style.display="none"; 
scoreInfoEl.style.display="none";
highscorePageEl.style.display="none";


var score = 0;
var timer;
var timerCount;
var correctAnswer;
var highscoreData;

// Object containing all of the quiz questions, their options, and the correct answer
var questions = [
    {
        title: "1. Commonly used data types DO NOT include:",
        optionA: "A. strings",
        optionB: "B. booleans",
        optionC: "C. alerts",
        optionD: "D. numbers",
        correct: "C",
    },
    {
        title: "2. The condition in an if / else statement is enclosed within ____.",
        optionA: "A. quotes",
        optionB: "B. curly brackets",
        optionC: "C. parentheses",
        optionD: "D. square brackets",
        correct: "C"
    },
    {
        title: "3. Arrays in Javascript can be used to store ____.",
        optionA: "A. numbers & strings",
        optionB: "B. other arrays",
        optionC: "C. booleans",
        optionD: "D. all of the above",
        correct: "D"
    },
    {
        title: "4. String values must be enclosed within ____ when being assigned to variables.",
        optionA: "A. commas",
        optionB: "B. curly brackets",
        optionC: "C. quotes",
        optionD: "D. parenthesis",
        correct: "C"
    },
    {
        title: "5. A very useful tool for used during development and debugging for printing content to the debugger is:",
        optionA: "A. Javascript",
        optionB: "B. terminal / bash",
        optionC: "C. for loops",
        optionD: "D. console log",
        correct: "D"
    },

];

var finalQuestionIndex = questions.length;
var currentQuestionIndex;

// Function to display question 
function generateQuestion(){
    quizQuestionsEl.style.visibility="visible";
    

    if (currentQuestionIndex === finalQuestionIndex){
        return setScore();
    } 
    var currentQuestion = questions[currentQuestionIndex];
    questionShownEl.innerHTML = "<p>" + currentQuestion.title + "</p>";

    button1.innerHTML = currentQuestion.optionA;
    button2.innerHTML = currentQuestion.optionB;
    button3.innerHTML = currentQuestion.optionC;
    button4.innerHTML = currentQuestion.optionD;
};

//Function to diplay incorrect/correct & then make it disappear after 2.5 seconds.
function displayStatus (status){
    quesResultEl.innerHTML = status;

    quesResultEl.classList.add("resultDisplay");

    setTimeout(function(){
        quesResultEl.innerHTML = "";
    }, 1500);
};

// This function checks to see if the selected option is the correct one, and adjusts score and time accordingly.
// This function also increases the question index to make sure the next question is displayed after selecting an answer.
function checkAnswer (answer) {
    correctAnswer = questions[currentQuestionIndex].correct;

    if (answer === correctAnswer && currentQuestionIndex !== finalQuestionIndex){
        currentQuestionIndex++;
        displayStatus("That is correct!");
        score++;

        generateQuestion();
    }
    else if (answer !== correctAnswer && currentQuestionIndex !== finalQuestionIndex) {
        timerCount = timerCount - 10;
        score--;
        currentQuestionIndex++;
        displayStatus("That is incorrect.");

        generateQuestion();
    }
    else {
        setScore();
    }
}

// Function that is called when user clicks the start button on main page
function startQuiz () { 
    scoreInfoEl.style.display="none";
    highscorePageEl.style.display = "none";
    startPageEl.style.display = "none";
    quizQuestionsEl.style.display="block";         
    startButton.disabled = true;
    timerCount = 75;
    score=0;
    currentQuestionIndex = 0;
    quesResultEl.innerHTML = "";
    startTimer()
    generateQuestion();
}
// Timer function to ensure the timer counts for from 75
function startTimer() {
    timeCountdownEl.textContent = timerCount;
    // Sets timer
    timer = setInterval(function() {
        timerCount--;
        timeCountdownEl.textContent = timerCount;
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

// Function to display and store the users score and prompt user to enter their initials
function setScore() {
    quizQuestionsEl.style.display="none";
    highscorePageEl.style.display = "none";
    scoreInfoEl.style.display="block";
    timeCountdownEl.textContent = "";
    userScoreEl.textContent = "Your score: " + score;
    localStorage.setItem("scoreCount", score);
}

// Displays all the logged highscores through the use of a for loop to loop through the highscoreData array
function getHighScores () {
    scoreInfoEl.style.display="none";
    quizQuestionsEl.style.display="none";
    startPageEl.style.display = "none";
    highscorePageEl.style.display = "block";
    highscoreData = JSON.parse(localStorage.getItem("highscoreInfo"));

    for (i = 0; i < highscoreData.length; i++) {
        var scoreboardList = document.createElement('ul');
        highscoreListEl.append(scoreboardList);
        var listItem = document.createElement('li');
        listItem.classList.add("listItm");
        var listItemText = document.createTextNode(highscoreData[i]);
        listItem.appendChild(listItemText);
        scoreboardList.appendChild(listItem);
        console.log(highscoreData[i]);
        listItem.style.listStyle = "none";
    }
}



// Even listener for clearing highscore history when the clear highscores button is clicked
clearScoresEl.addEventListener("click", function clearScores(){
    highscoreListEl.innerHTML = "";
    localStorage.clear();
});

// Event listener for submit button when entering score info
submitBtn.addEventListener("click", function (){

    if (userInitialsEl.value === "") {

        console.log("WORKS")
 
        alert("You must enter your initials");
    }
    else {
        var highscores = [];
        var user = userInitialsEl.value.trim();
        highscores.push("Initials: " + user + ", Score: " + score)
        localStorage.setItem("highscoreInfo", JSON.stringify(highscores));
        getHighScores();
    }

});

//Event listener for the play again button to restart quiz
playAgainEl.addEventListener("click", startQuiz);

//Event listener for start button to start the quiz
startButton.addEventListener("click", startQuiz);

//Event listener for the View Highscores nav on top left of screen to bring user to the highscores page
highscorelog.addEventListener("click", function() {
    scoreInfoEl.style.display="none";
    quizQuestionsEl.style.display="none";
    startPageEl.style.display = "none";
    highscorePageEl.style.display = "block";
});
