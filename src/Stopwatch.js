window.onload(function(){
  isPaused = true;
});

var isPaused = true;
var ms = document.getElementById("milliseconds");
var startingTime, currentTime, milliseconds;
console.log(document, ms);

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
    currentTime = new Date();
    milliseconds = currentTime - startingTime;
    ms.innerHTML = milliseconds;
  }
},1000);

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
