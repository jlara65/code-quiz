// Code Quiz Pseudocode 

// 1. Click start button to start the quick with timer. Set timer at 60 seconds. 
//      a. Display the question with multiple choices or true/fake. -about 5 random questions.
//      b. if correct answer move on to next question without any timer penalty
//          * correct answer get 2 points
//      c. if incorrect answer it will penalty with 5 seconds subtract from timer
// 2. When answered all the question or timer reaches 0
//      a. game over
// 3. When game is over and prompt the initials name to storage with score.
//      a. display the list of scores. (localStorage)

var timerEl = document.getElementById('timer');
var questionEl = document.getElementById('question');
var answerOne = document.getElementById('answer-1');
var answerTwo = document.getElementById('answer-2');
var answerThree = document.getElementById('answer-3');
var answerFour = document.getElementById('answer-4');
var finalScoreEl = document.getElementById('final-score');
var initialsEl = document.getElementById('initials');
var highScoresListEl = document.getElementById('highscores-list');

// Array of questions included answers
var questionBank = [
  {
    question: 'What is a question?',
    answersArray: [
                { answer: 'A question mark', correct: true},
                { answer: 'What?', correct: false},
                { answer: 'I am asking the same question.', correct: false},
                { answer: 'None of above', correct: false}]
    },
    {
      question: 'How many languages is Javascript?',
      answersArray: [
                  { answer: 'JS is languages of many', correct: false},
                  { answer: 'JS is a language itself', correct: true},
                  { answer: 'Three', correct: false},
                  { answer: '2! Java is a language so is script. Combine together 2 languages.', correct: false}]
      },
      {
        question: 'is HTML a programming language?',
        answersArray: [
                    { answer: 'Pfft, HTML is not necessary to be named programming language!', correct: false},
                    { answer: 'Yes!', correct: false},
                    { answer: 'Maybe', correct: false},
                    { answer: 'No', correct: true}]
        },
        {
          question: 'Is Earth flat?',
          answersArray: [
                      { answer: 'Yes', correct: false},
                      { answer: 'No', correct: true},
                      { answer: 'Earth has shape?', correct: false},
                      { answer: 'None of above', correct: false}]
          },
          {
            question: 'Is Javascript very powerful language?',
            answersArray: [
                        { answer: 'Yes', correct: true},
                        { answer: 'No', correct: false},
                        { answer: 'Somewhat', correct: false},
                        { answer: 'Maybe no', correct: false}]
            }
        ]; 

// to declares the variables to the value.
let secondsLeft = 40;
let currentScore = 0;
let currentQ = -1;
let finalScore;

//set function to make hide and display the div/class name
function changeDiv(curr, next) {
  document.getElementById(curr).classList.add('hide');
  document.getElementById(next).removeAttribute('class')
};

// To start game function included 3 functions.
function startGame() {
  changeDiv('start-page', 'question-container');
  nextQuestion();
  startTimer();
}

//start the timer function & start the endGame function when the timer hit zero
function startTimer() {
    timerEl.textContent = secondsLeft;
    let timerInterval = setInterval(
        () => {
            secondsLeft--;
            timerEl.textContent = secondsLeft;
            if (secondsLeft <= 0) {
                clearInterval(timerInterval);
                endGame();
            }
        }, 1000);
};

// running the each questions function. If all questions answer will send to the end game function
function nextQuestion() {
  currentQ++;
  if (currentQ === questionBank.length) {
      secondsLeft = 0;
      endGame();
  } else {
      questionEl.textContent = questionBank[currentQ].question;
      let arr = [answerOne, answerTwo, answerThree, answerFour];
      let i = 0;
      arr.forEach(element => {
          element.textContent = questionBank[currentQ].answersArray[i].answer;
          i++
      }, i);
  };
};

 // A function to obtain correct answer and click button if correct add score. if incorrect penalty 5 seconds. Add class name for correct or incorrect that match css.
function handleAnswerClick(event) {
  let correctAnswer = getCorrectAnswer(currentQ);
  if (event.target.textContent === correctAnswer) {
      currentScore += 10;
      event.target.classList.add('correct')
  } else {
      secondsLeft -= 5;
      event.target.classList.add('wrong')
  }
  // reset the color class name button to half a second to move on for next question.
  setTimeout(
      () => {
          event.target.className = 'btn';
          nextQuestion();
      }, 500);
};

// function for answer array to go thru and identify the correct answer.
function getCorrectAnswer(currentQ) {
  let arr = questionBank[currentQ].answersArray;
  for (let j = 0; j < arr.length; j++) {
      if (arr[j].correct) {
          return arr[j].answer
      }
  }
};

// function for endGame to change the class name div to results-page and log the score.
function endGame() {
  timerEl.textContent = 0;
  changeDiv('question-container', 'results-page');
  finalScore = currentScore;
  finalScoreEl.textContent = finalScore;
};

// When click submit after input initials name for scores to record to local storage. Send scores to highscores.html
  function handleSubmit() {
    let initials = initialsEl.value;
    let highScoresList = JSON.parse(localStorage.getItem('highScores')) || [];
    highScoresList.push({ initials: initials, score: finalScore });
    highScoresList = highScoresList.sort((curr, next) => {
        if (curr.score < next.score) {
            return 1
        } else if (curr.score > next.score) {
            return -1
        } else {
            return 0
        }
    });

    localStorage.setItem('highScores', JSON.stringify(highScoresList))
    window.location.href = './highscores.html';
};

//to look up the scores that storage in local storage and display the list.
function populateHighScores() { 
  let highScoresList = JSON.parse(localStorage.getItem('highScores')) || [];
 
  let list = '';
  highScoresList.forEach(score => {
      list = list + '<p>' + score.initials + '  :  ' + score.score + '</p>';
  });
  highScoresListEl.innerHTML = list;
};

// when reset button click and it will start resetScores function to clear the scores list from localStorage.
function resetScores() {
  localStorage.clear();
  populateHighScores();
};

populateHighScores();