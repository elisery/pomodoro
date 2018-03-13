$(document).ready(function() {
  /*
  settings buttons
    1. plus button increments button display
    2. minus button decrements button display
    3. buttons don't work if timer is going
  4. plus button increments time left
  5. minus button decrements time left
  6. clicking in session area starts/stops timer
  7. fill time left display with red #FF0000
  <svg width="100" height="100">
<circle id="circle" cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="white" />
</svg>
$('#circle').animate({ svgFill: 'red' }, 4000);
  8. main display shows break heading after session is done
  9. main display shows break countdown after session is done
  */
  let timerOn = false;
  let breakTime = false;
  let sessionLength = 1500;
  let breakLength = 300;
  let seconds;
  let minutes;

  //set display for break time
  $('.break-display').text(Math.floor(breakLength/60));
  //set display for session time & main display
  $('.session-display').text(Math.floor(sessionLength/60));
  $('#main-time').text(Math.floor(sessionLength/60));

  //increment function
  /*function increment(val) {
    return ++val;
  }
  //decrement function
  function decrement(val) {
    return --val;
  } */

  //let timeLeft = $('.session-display').text();
  //$('#main-time').text(timeLeft);

  //increment break time
  $('#break-plus').click(function() {
    if (timerOn === false) {
      breakLength += 60;
      //let val = $('.break-display').text();
      $('.break-display').text(Math.floor(breakLength/60));
      //CHECK IF BREAK TIME IS TRUE - SET MAIN DISPLAY
    }
  });
  //decrement break time
  $('#break-minus').click(function() {
    if (timerOn === false) {
      let val = $('.break-display').text();
      if (val > 1) {
        breakLength -= 60;
        $('.break-display').text(Math.floor(breakLength/60));
        //CHECK IF BREAK TIME IS TRUE - SET MAIN DISPLAY
      }
    }
  });
  //increment session time
  $('#session-plus').click(function() {
    if (timerOn === false) {
      sessionLength += 60;
      //let val = $('.session-display').text();
      $('.session-display').text(Math.floor(sessionLength/60));
      $('#main-time').text(Math.floor(sessionLength/60));
      //CHECK IF BREAK TIME IS FALSE - SET MAIN DISPLAY
    }
  });
  //decrement session time
  $('#session-minus').click(function() {
    if (timerOn === false) {
      let val = $('.session-display').text();
      if (val > 1) {
        sessionLength -= 60;
        $('.session-display').text(Math.floor(sessionLength/60));
        $('#main-time').text(Math.floor(sessionLength/60));
        //CHECK IF BREAK TIME IS FALSE - SET MAIN DISPLAY
      }
    }
  });
  //main session button click logic
  //let n = 25;
  let n = Number($('.session-display').text());
  let tm;
  let breakTM;

  //session timer
  function timer(){
    tm = setInterval(countDown, 1000);
  }
  //break timer
  function breakTimer() {
    breakTM = setInterval(breakCountDown, 1000);
  }

  //countdown function for session timer
  function countDown(){
    /*n--;
    if (n === 0){
      clearInterval(tm);
    }
    console.log(n);
    $('#main-time').text(n);*/

    minutes = Math.floor(sessionLength/60);
    seconds = sessionLength - minutes * 60;
    sessionLength--;

    if (minutes === 0 && seconds === 0) {
      //SET BREAKTIME FLAG is TRUE
      alert("TAKE a Tomato BREAK!");
      return;
    }
    //SET DISPLAY
  }

  //countdown function for break timer
  function breakCountDown() {
    minutes = Math.floor(breakLength/60);
    seconds = breakLength - minutes * 60;
    breakLength--;

    if (minutes === 0 && seconds === 0) {
      //SET BREAKTIME FLAG TO FALSE
      alert("Back to work!");
      return;
    }
    //SET MAIN DISPLAY
  }

  function stopCountDown() {
    clearInterval(tm);
  }

  $('#main-display').click(function() {
    /*
    1. if timerOn = false, flip to true
    2. if timerOn = true, start timer
    4. if timerOn = true, flip to false
    5. if timerOn = false, stop timer  clearTimeout
    */
    if (timerOn === false) {
      //START TIMER - check if breakTime = true
      //ELSE START REGULAR TIMER
      timerOn = true;
      timer();

    } else {
      //STOP TIMER
      stopCountDown();
      timerOn = false;
    }
  })

});
