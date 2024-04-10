var welcome = document.querySelector("#introduction");
var startBtn = document.querySelector("#start_button");
var introPage = document.querySelector("#intro_page");

var questionsPage = document.querySelector("#questions");
var askQuestions = document.querySelector("ask_question");

var reactButtons = document.querySelectorAll(".choices");
var answerBtn1 = document.querySelector("#answer_btn1");
var answerBtn2 = document.querySelector("#answer_btn2");
var answerBtn3 = document.querySelector("#answer_btn3");
var answerBtn4 = document.querySelector("#answer_btn4");

var checkLine = document.querySelector("#check_line");
var scoreBoard = document.querySelector("#submit_page");
var finalScore = document.querySelector("#final_score");
var userInitial =document.querySelector("#initial");

var submitBtn =document.querySelector("#submit_btn");
var highScorePage =document.querySelector("#highscore_page");
var scoreRecord =document.querySelector("#score_record");
var scoreCheck =document.querySelector("#score_check");
var finish =document.querySelector("#finish");

var backBtn =document.querySelector("#back_btn");
var clearBtn=document.querySelector("#clear_btn");

    //Define questions (Object)
var questionSource = [
    {
        question: "Questions 1 : String values must be enclosed within _____ when being assigned to variables.",
        choices: ["a. commas", "b. curly brackets", "c. quotes", "d. parenthesis"],
        answer: "c"
    },
    {
        question: "Questions 2 : Commonly used data types DO NOT include:",
        choices: ["a. strings", "b. booleans", "c. alerts", "d. numbers"],
        answer: "c"
    },
    {
        question: "Questions 3 : How do you create a function in JavaScript",
        choices: ["a. function = myFunction()", "b. function myFunction()", "c. function:myFunction()", "d. createMyFunction()"],
        answer: "b"
    },
    {
        question: "Questions 4 : How do you call a function named myFunction?",
        choices: ["a. call myFunction()", "b. call function myFunction()", "c. myFunction()", "d. call myFunction"],
        answer: "c"
    },
    {
        question: "Questions 5 : To see if two variables are equal in an if / else statement you would use ____.",
        choices: ["a. =", "b. ==", "c. 'equals'", "d. !="],
        answer: "b"
    },
    {
        question: "Questions 6 : The first index of an array is ____.",
        choices: ["a. 0", "b. 1", "c. 8", "d. any"],
        answer: "a"
    }],
    
//startBtn.addEventListener("click", startQuiz);

//reactButtons.forEach(function(btn) {
   // btn.addEventListener("click", checkAnswer);
//});//

submitBtn.addEventListener("click", function(event) {
    event.preventDefault();
    scoreBoard.style.display = "none";
    introPage.style.display = "none";
    highScorePage.style.display = "block";
    questionsPage.style.display = "none"; // Corrected variable name
    saveScore();
});

scoreCheck.addEventListener("click", function(event) {
    event.preventDefault();
    scoreBoard.style.display = "none";
    introPage.style.display = "none";
    highScorePage.style.display = "block";
    questionsPage.style.display = "none"; // Corrected variable name
    renderScore();
});

backBtn.addEventListener("click", function(event) {
    event.preventDefault();
    scoreBoard.style.display = "none";
    introPage.style.display = "block";
    highScorePage.style.display = "none";
    questionsPage.style.display = "none"; // Corrected variable name
    location.reload();
});

clearBtn.addEventListener("click", function(event) {
    event.preventDefault();
    localStorage.clear();
    renderScore();
});

// Function to start the quiz
function startQuiz() {
    introPage.style.display = "none";
    questionsPage.style.display = "block";
    // Initialize necessary variables here if needed
}

// Function to check the answer
function checkAnswer(event) {
    // Implement answer checking logic here
}

// Function to handle game over
function gameOver() {
    questionsPage.style.display = "none";
    scoreBoard.style.display = "block";
    // Display final score etc.
}

// Function to get current score and initials from local storage
function getScore() {
    var currentList = localStorage.getItem("ScoreList");
    if (currentList !== null) {
        return JSON.parse(currentList);
    } else {
        return [];
    }
}

// Function to render score to the score board
function renderScore() {
    scoreRecord.innerHTML = "";
    scoreRecord.style.display = "block";
    var highScores = sort();
    var topFive = highScores.slice(0, 5);
    for (var i = 0; i < topFive.length; i++) {
        var item = topFive[i];
        var li = document.createElement("li");
        li.textContent = item.user + " - " + item.score;
        li.setAttribute("data-index", i);
        scoreRecord.appendChild(li);
    }
}

// Function to sort score and ranking the highscore list
function sort() {
    var unsortedList = getScore();
    if (unsortedList != null) {
        unsortedList.sort(function(a, b) {
            return b.score - a.score;
        });
        return unsortedList;
    }
}

// Function to push new score and initial to the local storage
function addItem(n) {
    var addedList = getScore();
    addedList.push(n);
    localStorage.setItem("ScoreList", JSON.stringify(addedList));
}

function saveScore() {
    var scoreItem = {
        user: userInitial.value,
        score: totalScore // Assuming totalScore is declared and updated elsewhere
    };
    addItem(scoreItem);
    renderScore();
}
