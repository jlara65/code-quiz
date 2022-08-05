// Code Quiz Pseudocode 

// 1. Click start button to start the quick with timer. Set timer at 60 seconds. 
//      a. Display the question with multiple choices or true/fake. -about 15 random questions.
//      b. if correct answer move on to next question without any timer penalty
//          * correct answer get 2 points
//      c. if incorrect answer it will penalty with 5 seconds subtract from timer
// 2. When answered all the question or timer reaches 0
//      a. game over
//          * if timer === 0 || all questions answer === ??
// 3. When game is over and prompt the initials name to storage with score.
//      a. display the list of scores. (localStorage)

var timerEl = document.getElementById('timer');
var highScoreEl = document.querySelector('#high-score')

function timer() {
  var timeLeft = 60;

  var timeInterval = setInterval(function () {
    if (timeLeft > 1) {
      timerEl.textContent = timeLeft + ' seconds remaining';
      timeLeft--;
    }
    else if (timeLeft === 1) {
      timerEl.textContent = timeLeft + ' second remaining';
      timeLeft--;
    }
    else {
      timerEl.textContent = '';
      clearInterval(timeInterval);
      endTimer();
    }
  }, 1000);
}

  function endTimer() {
    alert("Time's up!");
  }

timer();

var questions = [
  {
    question: "what is a question?",
    answers: {
                a: "A question mark",
                b: "What?",
                c: "I am asking the same question.",
                d: "none of above"
    },
    correctAnswer: "a"
            },
    {
    question: "How many languages is Javascript?",
    answers: {
                a: "JS is languages of many",
                b: "JS is a language itself",
                c: "Three",
                d: "2! Java is a language so is script. Combine together 2 languages"
    },
    correctAnswer: "b"
            },
    {
    question: "is HTML a programming language?",
    answers: {
                a: "pfft, HTML is not necessary to be named programming language!",
                b: "Yes!",
                c: "Maybe",
                d: "none of above"
    },
    correctAnswer: "d"
            },
            {
    question: "Bonus points! Is Earth flat?",
    answers: {
                a: "Yes",
                b: "No",
                c: "Earth has shape?"
    },
    correctAnswer: "b"
            },
          ]