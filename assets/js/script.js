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

function startTimer() {
    var presentTime = document.getElementById("timer").innerHTML;
    var timeArray = presentTime.split(/[:]+/);
    var m = timeArray[0];
    var s = checkSecond((timeArray[1] - 1));
    if(s==59){m=m-1}
    if((m + '').length == 1) {
        m = '0' + m;
    }
    if(m < 0){
        endTimer();
        
    } 
    document.getElementById('timer').innerHTML = m + ":" + s;
    setTimeout(startTimer, 1000);
}

function checkSecond(sec) {
    if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
    if (sec < 0) {sec = "59"};
    return sec;
  }

  function endTimer() {
    alert("Time's up!");
  }

startTimer();