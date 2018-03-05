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
  //increment function
  function increment(val) {
    return ++val;
  }
  //decrement function
  function decrement(val) {
    return --val;
  }
  //increment break time
  $('#break-plus').click(function() {
    let val = $('.break-display').text();
    $('.break-display').text(increment(val));
  });
  //decrement break time
  $('#break-minus').click(function() {
    let val = $('.break-display').text();
    if (val > 1) {
      $('.break-display').text(decrement(val));
    }
  });
  //increment session time
  $('#session-plus').click(function() {
    let val = $('.session-display').text();
    $('.session-display').text(increment(val));
  });
  //decrement session time
  $('#session-minus').click(function() {
    let val = $('.session-display').text();
    if (val > 1) {
      $('.session-display').text(decrement(val));
    }
  });

});
