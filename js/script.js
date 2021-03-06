$(document).ready(function() {
  let timerOn = false;
  let breakTime = false;
  let sessionLength = 1500;
  let breakLength = 300;
  let seconds;
  let minutes;
  let tm;
  let breakTM;

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
        //CHECK IF BREAK TIME IS FALSE - SET MAIN DISPLAY
        if (breakTime === false) {
          $('#main-time').text(Math.floor(sessionLength/60));
        }
      }
    }
  });
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
      //SET BREAKTIME FLAG if TRUE
      breakTime = true;
      clearInterval(tm);
      alert("TAKE a Tomato BREAK!");
      $('#main-time').text('00:00');
      $('h3').text('Break');
      //reset session length & background color
      sessionLength = $('.session-display').text() * 60;
      timerOn = false;
      $('.main').css({'transition': '0s',
                      'background-color': '#228B22',
                });
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
    //Set overlay
    let val = $('.session-display').text() * 60;
    let transString = 'all ' +  val + 's ' + 'ease';
    $('.main').css({'transition': transString,
                    'background-color': '#A70000',
              });
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
      $('h3').text('Session');
      //reset break length & background color
      breakLength = $('.break-display').text() * 60;
      timerOn = false;
      $('.main').css({'transition': '0s',
                      'background-color': '#228B22',
                });
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
    //Set overlay
    let val = $('.break-display').text() * 60;
    let transString = 'all ' +  val + 's ' + 'ease';
    $('.main').css({'transition': transString,
                    'background-color': '#00FF7F',
              });
  }

  function stopCountDown() {
    if (breakTime === false) {
      clearInterval(tm);
    } else {
      clearInterval(breakTM);
    }
  }

  $('#main-display').click(function() {
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
