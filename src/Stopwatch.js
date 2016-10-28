var isPaused = true;
var ms = document.getElementById('milliseconds');
var s = document.getElementById('seconds');
var min = document.getElementById('minutes');
var startingTime, currentTime, pauseTime, time, milliseconds, seconds, minutes;

var stopwatch = {
  startTimer: function() {
    startingTime = startingTime || new Date();
    pauseTime = pauseTime || 0;
    isPaused = false;
  },
  stopTimer: function() {
    isPaused = true;
    pauseTime = time;
    startingTime = null;
  },
  resetTimer: function() {
    isPaused = true;
    startingTime = null;
    pauseTime = null;
    time = 0;
    ms.innerHTML = '00';
    s.innerHTML = '00';
    min.innerHTML = '00';
  }
}

setInterval(function(){
  console.log('setInterval isPaused = ' + isPaused);
  if(!isPaused) {
    //rules for time
    currentTime = new Date();
    time = currentTime - startingTime + pauseTime;
    milliseconds = Math.floor((time%1000)/10);
    seconds = (Math.floor(time/1000))%60;
    minutes = Math.floor(Math.floor(time/1000)/60);
    //update DOM & appearance
    ms.innerHTML = milliseconds;
    //diplay milliseconds
    if(milliseconds === 0) ms.innerHTML = '00';
    else if(milliseconds < 10) ms.innerHTML = '0' + milliseconds;
    else ms.innerHTML = milliseconds;
    //display secons and minutes
    (seconds < 10)? s.innerHTML = '0' + seconds : s.innerHTML = seconds;
    (minutes < 10)? min.innerHTML = '0' + minutes : min.innerHTML = minutes;
    //display when stopwatch finishes
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
