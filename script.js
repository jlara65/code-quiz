// Code Quiz Pseudocode 

// 1. Click start button to start the quick with timer. Set timer at 60 seconds. 
//      a. Display the question with multiple choices. -about 5 questions.
//      b. if correct answer move on to next question without any timer penalty
//          * correct answer score 10 points
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

var questionBank = [
  {
    question: 'what is a question?',
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
                    { answer: 'None of above', correct: true}]
        },
        {
          question: 'Is Earth flat?',
          answersArray: [
                      { answer: 'Yes', correct: true},
                      { answer: 'No', correct: false},
                      { answer: 'Earth has shape?', correct: false},
                      { answer: 'None of above', correct: false}]
          }
        ]; 

let secondsLeft = 60;
let currentScore = 0;
let currentQ = -1;
let finalScore;

function changeDiv(curr, next) {
  document.getElementById(curr).classList.add('hide');
  document.getElementById(next).removeAttribute('class')
};

function startGame() {
  changeDiv('start-page', 'question-container');
  nextQuestion();
  startTimer();
}

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


function nextQuestion() {
  currentQ++;
  // If there are no more questions, end the game
  if (currentQ === questionBank.length) {
      secondsLeft = 0;
      endGame();
  } else {
      // Otherwise populate questionEl
      questionEl.textContent = questionBank[currentQ].question;
      // and populate answer buttons
      let arr = [answerOne, answerTwo, answerThree, answerFour];
      let i = 0;
      arr.forEach(element => {
          element.textContent = questionBank[currentQ].answersArray[i].answer;
          i++
      }, i);
  };
};

 // When user clicks an answer button
function handleAnswerClick(event) {
  // Get the correct answer string
  let correctAnswer = getCorrectAnswer(currentQ);
  // Compare to user click
  if (event.target.textContent === correctAnswer) {
      currentScore += 10;
      // color indicates correct choice
      event.target.classList.add('correct')
  } else {
      secondsLeft -= 10;
      // color indicates wrong choice
      event.target.classList.add('wrong')
  }
  // Wait 0.5 sec, reset btn color, go to next question
  setTimeout(
      () => {
          event.target.className = 'btn';
          nextQuestion();
      }, 500);
};

function getCorrectAnswer(currentQ) {
  let arr = questionBank[currentQ].answersArray;
  // loop through answersArray, identify correct answer
  for (let j = 0; j < arr.length; j++) {
      if (arr[j].correct) {
          // return correct answer.
          return arr[j].answer
      }
  }
};
function endGame() {
  timerEl.textContent = 0;
  changeDiv('question-container', 'results-page');
  // Log currentScore on results page
  finalScore = currentScore;
  finalScoreEl.textContent = finalScore;
}
  function handleSubmit() {
    let initials = initialsEl.value;
    // get array from storage, or initialize as empty array
    let highScoresList = JSON.parse(localStorage.getItem('highScores')) || [];
    // push new score to array
    highScoresList.push({ initials: initials, score: finalScore });
    // sort array ascending
    highScoresList = highScoresList.sort((curr, next) => {
        if (curr.score < next.score) {
            return 1
        } else if (curr.score > next.score) {
            return -1
        } else {
            return 0
        }
    });
    // set updated array to local storage
    localStorage.setItem('highScores', JSON.stringify(highScoresList))
    // go to highscores page
    window.location.href = './highscores.html';
}

function populateHighScores() {
  // get array from storage, or initialize as empty array
  let highScoresList = JSON.parse(localStorage.getItem('highScores')) || [];
  // populate highscores list
  let list = '';
  highScoresList.forEach(score => {
      list = list + '<p>' + score.initials + '  :  ' + score.score + '</p>';
  });
  highScoresListEl.innerHTML = list;
}

function resetScores() {
  localStorage.clear();
  populateHighScores();
}

populateHighScores();