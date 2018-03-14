$(document).ready(function() {
  /*
  settings buttons
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

  //increment break time
  $('#break-plus').click(function() {
    //reset break length
    let val = $('.break-display').text();
    breakLength = val * 60;
    if (timerOn === false) {
      breakLength += 60;
      $('.break-display').text(Math.floor(breakLength/60));
      //CHECK IF BREAK TIME IS TRUE - SET MAIN DISPLAY
      if (breakTime === true) {
        $('#main-time').text(Math.floor(breakLength/60));
      }
    }
  });
  //decrement break time
  $('#break-minus').click(function() {
    //reset break length
    let val = $('.break-display').text();
    breakLength = val * 60;
    if (timerOn === false) {
      if (val > 1) {
        breakLength -= 60;
        $('.break-display').text(Math.floor(breakLength/60));
        //CHECK IF BREAK TIME IS TRUE - SET MAIN DISPLAY
        if (breakTime === true) {
          $('#main-time').text(Math.floor(breakLength/60));
        }
      }
    }
  });
  //increment session time
  $('#session-plus').click(function() {
    //reset session time
    let val = $('.session-display').text();
    sessionLength = val * 60;
    if (timerOn === false) {
      sessionLength += 60;
      $('.session-display').text(Math.floor(sessionLength/60));
      //CHECK IF BREAK TIME IS FALSE - SET MAIN DISPLAY
      if (breakTime === false) {
        $('#main-time').text(Math.floor(sessionLength/60));
      }
    }
  });
  //decrement session time
  $('#session-minus').click(function() {
    //reset session time
    let val = $('.session-display').text();
    sessionLength = val * 60;
    if (timerOn === false) {
      if (val > 1) {
        sessionLength -= 60;
        $('.session-display').text(Math.floor(sessionLength/60));
        $('#main-time').text(Math.floor(sessionLength/60));
        //CHECK IF BREAK TIME IS FALSE - SET MAIN DISPLAY
        if (breakTime === false) {
          $('#main-time').text(Math.floor(sessionLength/60));
        }
      }
    }
  });
  //main session button click logic
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
    minutes = Math.floor(sessionLength/60);
    seconds = sessionLength - minutes * 60;
    sessionLength--;

    if (minutes === 0 && seconds === 0) {
      //SET BREAKTIME FLAG is TRUE
      breakTime = true;
      clearInterval(tm);
      alert("TAKE a Tomato BREAK!");
      $('#main-time').text('00:00');
      sessionLength = $('.session-display').text() * 60;
      return;
    }
    //SET MAIN DISPLAY
    let secondsDisplay;
    if (seconds < 10) {
      secondsDisplay = '0' + seconds;
    } else {
      secondsDisplay = seconds;
    }
    let display = minutes + ':' + secondsDisplay;
    $('#main-time').text(display);
  }
  //countdown function for break timer
  function breakCountDown() {
    minutes = Math.floor(breakLength/60);
    seconds = breakLength - minutes * 60;
    breakLength--;

    if (minutes === 0 && seconds === 0) {
      //SET BREAKTIME FLAG TO FALSE
      breakTime = false;
      clearInterval(breakTM);
      alert("Back to work!");
      $('#main-time').text('00:00');
      breakLength = $('.break-display').text() * 60;
      return;
    }
    //SET MAIN DISPLAY
    let secondsDisplay;
    if (seconds < 10) {
      secondsDisplay = '0' + seconds;
    } else {
      secondsDisplay = seconds;
    }
    let display = minutes + ':' + secondsDisplay;
    $('#main-time').text(display);
  }

  function stopCountDown() {
    if (breakTime === false) {
      clearInterval(tm);
    } else {
      clearInterval(breakTM);
    }
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
      if (breakTime === false) {
        timer();
      } else  {
        breakTimer();
      }
      timerOn = true;
    } else {
      //STOP TIMER
      stopCountDown();
      timerOn = false;
    }
  });
});
