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
    }
]

var timeLeft= document.getElementById("timer");
    var timeLeft = 60;
    var questionNumber = 0;
    var totalScore = 0;
    var questionCount= 1;
function countdown(){
    var timeInterval = setInterval(function(){
        secondsLeft --;
        timeLeft.textContent = "Time left:" + secondsLeft + "s";

        if (secondsLeft <= 0) {
            clearInterval(timeInterval);
            timeLeft.textContent="Time is up!";
            finish.textContent="Time is up!";
            gameOver();
        }
        else if (questionCount >= questionSource.length +1) {
            clearInterval(timeInterval)
            gameOver();
        }
    }, 1000);
}

//Start the quiz
function startQuiz (){
    introPage.style.display = "none";
    questionsPage.style.dislay = "block";
    questionNumber = 0
    countdown();
    showQuestion(questionNumber);
} 

//Right or wrong answer selection:
function showQuestion (n) {
    showQuestion.textContent = showQuestion(n).question;
    answerBtn1.textContent = showQuestion(n).choices[0];
    answerBtn2.textContent = showQuestion(n).choices[1];
    answerBtn3.textContent = showQuestion(n).choices[2];
    answerBtn4.textContent = showQuestion(n).choices[3];
    questionNumber = n;
}

function checkAnswer(event) {
    event.preventDefault();
    checkLine.style.display = "block";
    setTimeout(function () {
        checkLine.style.dislay = 'none';
    }, 1000);
}

if (questionSource[questionNumber].answer) {
    checkLine.textContent = "Correct!"
    totalScore = totalScore + 1;
} 
else {
    secondsLeft = secondsLeft - 10;
    checkLine.textContent = "Oh NO! The correct answer is " +
    questionSource[questionNumber].answer + ".";
}
//game continues to new question
if (questionNumber < questionSource.length -1) {
    showQuestion(questionNumber +1);
} 
else {
    gameOver();
}
questionCount++;

function gameOver() {
    questionsPage.style.dislay= "none";
    scoreBoard.style.display= "block";
    console.long(scoreBoard);
    finalScore.textContent= "Total points scored: " + totalScore;
    timeLeft.style.display = "none";
}
function getScore () {
    var currentList = localStorage.getItem("ScoreList");
    if (currentList !==  null) {
        freshList = JSON.parse(currentList);
        return freshList;
    } else {
        freshList = [];
    }
    return freshList;
};

function renderScore() {
  scoreRecord.innerHTML = "";
  scoreRecord.style.dislay = "block";
  var highScores = sort();
  var topFive = highScores.slice(0,5);
  for(var i = 0; i < topFive.length; i++) {
    var item = topFive[i];
    var li = document.createElement("li");
    li.textContent = item.user + "-" + item.score;
    li.setAttribute("data-index" , i);
    scoreRecord.appendChild(li);
  }
};

function sort () {
    var unsortedList = getScore();
    if (getScore == null) {
        return;
    }
    else {
        unsortedList.sort(function(a,b){
            return b.score - a.score;
        })
        return unsortedList;
    }
};

function addItem(n) {
    var addedList = getScore();
    addedList.push(n);
    localStorage.setItem("ScoreList", JSON.stringify(addedList));
};

function saveScore() {
    var scoreItem = {
        user: unserInitial.value,
        score: totalscore
    }
    addItem(scoreItem);
    renderScore();
}
//event listeners

startBtn.addEventListener("click" , startQuiz); //Starts quiz
reactButtons.forEach(function(click){ //selection => next question
    click.addEventListener("click" , checkAnswer);
});

submitBtn.addEventListener("click" , function(event) { //save info => next page
    event.preventDefault();
    scoreBoard.style.display = "none";
    introPage.style.display = "none";
    highScorePage.style.display = "block";
    questionsPage.style.display = "none";
    saveScore();
});

scoreCheck.addEventListener("click" , function(event) { //ranking list
    event.preventDefault();
    scoreBoard.style.display= "none";
    introPage.style.display = "none";
    highScorePage.style.display = "block";
    questionsPage.style.display = "none";
    renderScore();
});

backBtn.addEventListener("click" , function(event) {  //back to main page
    event.preventDefault();
    scoreBoard.style.display = "none";
    introPage.style.display = "block";
    highScorePage.style.display = "none";
    questionsPage.style.display = "none";
    location.reload();
});

clearBtn.addEventListener("click" , function(event) {
    event.preventDefault();
    localStorage.clear();
    renderScore();
})