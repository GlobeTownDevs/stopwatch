window.onload(function(){
  isPaused = true;
});

var isPaused = true;
var ms = document.getElementById('milliseconds');
var s = document.getElementById('seconds');
var min = document.getElementById('minutes');
var startingTime, currentTime, time, milliseconds, seconds, minutes;

var stopwatch = {
  startTimer: function() {
    isPaused = false;
    startingTime = startingTime || new Date();
  },
  stopTimer: function() {
    isPaused = true;
    startingTime = currentTime;
  },
  resetTimer: function() {
    isPaused = true;
    startingTime = null;
    ms.innerHTML = 000;
  }
}

setInterval(function(){
  console.log('setInterval isPaused = ' + isPaused);
  if(!isPaused) {
    //rules for time
    currentTime = new Date();
    time = currentTime - startingTime;
    milliseconds = Math.floor((time%1000)/10);
    seconds = (Math.floor(time/1000))%60;
    minutes = Math.floor(Math.floor(time/1000)/60);
    //update DOM & appearance
    ms.innerHTML = milliseconds;
    (seconds < 10)? s.innerHTML = '0' + seconds : s.innerHTML = seconds;
    (minutes < 10)? min.innerHTML = '0' + minutes : min.innerHTML = minutes;
    if(minutes > 60) {
      min.innerHTML = 60;
      s.innerHTML = '00';
      ms.innerHTML = '00';
    }
  }
},10);

document.getElementById('pause').addEventListener('click', function(e){
  e.preventDefault();
  stopwatch.stopTimer();
  console.log('setInterval isPaused = ' + isPaused);
})

document.getElementById('start').addEventListener('click', function(e) {
  e.preventDefault();
  stopwatch.startTimer();
});

document.getElementById('reset').addEventListener('click', function(e) {
  e.preventDefault();
  stopwatch.resetTimer();
})
