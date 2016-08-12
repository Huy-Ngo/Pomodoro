var bre = $('#brelen')[0].textContent,
  ses = $('#seslen')[0].textContent,
  checkSes = true,
  count = ses * 60,
  counting = false,
  centisec = count * 100,
  x;

function toMinSec(sec) {
  var min = parseInt(sec / 60, 10);
  var sec = sec % 60;
  if (sec < 10) {
    sec = "0" + sec;
  }
  return min + ":" + sec
}
/* progress bar ... */
function progressBar(percent) {
  var color = [checkSes ? "#66ff33" : "tomato", "#666"];
  var deg = percent * 360 / 100;
  $('#progress-one').css("background", color[0]);
  if (percent <= 50) {
    $('#progress-two').css("z-index", "1");
    $('#progress-two').css("background", color[1]);
    $('#progress-two').css("transform", "rotate(" + (180 + deg) + "deg)");
  } else {
    $('#progress-two').css("z-index", "1");
    $('#progress-two').css("background", color[0]);
    $('#progress-two').css("transform", "rotate(" + deg + "deg)");
  }
}
/**/
function funcCount() {
  centisec--;
  if (centisec % 100 === 0) {
    count = centisec / 100;
  }
  counter = toMinSec(count);
  $('#counter').text(counter);
  if (checkSes) {
    progressBar((ses * 6000 - centisec) / (ses * 6000) * 100);
  } else {
    progressBar((bre * 6000 - centisec) / (bre * 6000) * 100);
  }
  if (count === 0) {
    if (checkSes) {
      count = bre * 60;
      $('#stat').text('Break');
    } else {
      count = ses * 60;
      $('#stat').text('Session');
    }
    counter = toMinSec(count);
    $('#counter').text(counter);
    checkSes = !checkSes;
  }
}

function stopFuncCount() {
  clearInterval(x);
}
$('document').ready(function() {
    var counter = toMinSec(count);
    $('#counter').text(counter);
    $('#incbre').click(function() {
      if (ses - bre > 0) {
        bre++;
        $('#brelen').text(bre);
      } else {
        alert("Session duration must be longer than break duration!\n\nOr at least equal to.");
      }
    })
    $('#incses').click(function() {
      ses++;
      count = ses * 60;
      counter = toMinSec(count);
      centisec = count * 100;
      $('#counter').text(counter);
      $('#seslen').text(ses);
    })
    $('#decbre').click(function() {
      if (bre > 1) {
        bre--;
        $('#brelen').text(bre);
      }
    })
    $('#decses').click(function() {
      if (ses - bre > 0) {
        ses--;
        count = ses * 60
        counter = toMinSec(count);
        centisec = count * 100;
        $('#counter').text(counter);
        $('#seslen').text(ses);
      } else {
        alert("Session duration must be longer than break duration!\n\nOr at least equal to.");
      }
    })
    $('#button').click(function() {
        if (counting) {
          counting = false;
          $('#startstop').text('Start');
          // function while not counting
          stopFuncCount();
        } else {
          counting = true;
          // function while counting
          $('#startstop').text('Stop');
          x = setInterval(function() {
            funcCount()
          }, 10);
        } // else
      }) // click on body
  }) // ready
