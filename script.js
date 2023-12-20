// htmls
var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("startpage");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

// start button
startQuizButton.addEventListener("click",startQuiz);


// questions
var quizQuestions = [{
    question: "Which of the following is not a primary language in code?",
    choiceA: "Javascript",
    choiceB: "CSS",
    choiceC: "Halo 3",
    choiceD: "HTML",
    correctAnswer: "c"},
  {
    question: "Which of the following is an example of primitive data?",
    choiceA: "Boolean",
    choiceB: "Div",
    choiceC: "Variable",
    choiceD: "Element",
    correctAnswer: "a"},
   {
    question: "Which defines Ringo in the array: ['Paul', 'Ringo', 'George', 'John']; ",
    choiceA: "0",
    choiceB: "1",
    choiceC: "2",
    choiceD: "3",
    correctAnswer: "b"},
    {
    question: "A boolean is?",
    choiceA: "A number",
    choiceB: "A special character",
    choiceC: "Has no value",
    choiceD: "True or false value",
    correctAnswer: "d"},
    {
    question: "What does Nav a{ target?",
    choiceA: "Even list numbers",
    choiceB: "All",
    choiceC: "Anchor tag",
    choiceD: "Odd list numbers",
    correctAnswer: "c"},  
    {
    question: "What does an else if statement do?",
    choiceA: "Allows you to test more than one condition",
    choiceB: "Tests a single condition",
    choiceC: "Reverts a single condition",
    choiceD: "Disables both conditions",
    correctAnswer: "a"},
    {
    question: "What does || do?",
    choiceA: "Evaluates to zero",
    choiceB: "Evaluates to true if expression 1 or 2 is true",
    choiceC: "Evaluates to true if both expressions are true",
    choiceD: "Evaluates to true if both expressions are false",
    correctAnswer: "b"},
        
    
    ];
// etc vars
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 76;
var timerInterval;
var score = 0;
var correct;



// This function cycles through the object array containing the quiz questions to generate the questions and answers.
function generateQuizQuestion(){
    gameoverDiv.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};



// start
function startQuiz(){
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    // timer (add minus 10)
    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;
    
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizBody.style.display = "block";
}
// end screen
function showScore(){
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + " out of " + quizQuestions.length + " correct!";
}

// submits highscores
submitScoreBtn.addEventListener("click", function highscore(){
    
    
    if(highscoreInputName.value === "") {
        alert("Initials cannot be blank");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
    
        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }
    
});

// clear highscores
function generateHighscores(){
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

// display only highscores
function showHighscore(){
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

// clear all
function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}

// reset
function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 76;
    score = 0;
    currentQuestionIndex = 0;
}

// verify responses 
function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("That Is Correct!");
        currentQuestionIndex++;
        generateQuizQuestion();
        
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("That Is Incorrect.")
        currentQuestionIndex++;
        generateQuizQuestion();
        
    }else{
        showScore();
    }
}

// subtract time
