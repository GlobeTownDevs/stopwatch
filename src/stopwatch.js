/* holds stopwatch function */
function Stopwatch(id){

    var startTime = this.startTime = 0;
    var pausedAt = this.pausedAt = 0;
    var that = this;
  

    var elt = document.getElementById(id);
    elt.innerHTML = "<span id='time'>00:00:00:000</span> \
      <button id='start' name='start'>Start</button> \
      <button id='pause' name='pause'>Pause</button> \
      <button id='clear' name='clear'>Clear</button>";

    var timeElt = document.getElementById('time');
    var buttonStartElt = document.getElementById('start');
    var buttonPauseElt = document.getElementById('pause');
    var buttonClearElt = document.getElementById('clear');

    //* Event handlers *//
    buttonStartElt.addEventListener("click", function(){
        that.start();
    })

    buttonPauseElt.addEventListener('click', function() {
        that.pause();
    })

    buttonClearElt.addEventListener("click", function(){
        that.clear();
    });

    this.start = function() {
        if(!startTime) {
          startTime = Date.now();
        }
        if(pausedAt) {
          startTime = Date.now() - (pausedAt - startTime);
        }
        this.updateTimeField();
    };

    this.pause = function() {
        window.clearInterval(this.timer);
        pausedAt = Date.now();
    };

    this.clear = function() {
        window.clearInterval(that.timer);
        pausedAt = 0;
        startTime = 0;
        timeElt.textContent = this.convertMsToTime(0);
    };

    this.updateTimeField = function(startTime) {
        var that = this;
        this.timer = window.setInterval(function() {
          timeElt.textContent = that.convertMsToTime(that.getTimeDiff());
        }, 10);
    };

    /* e.g 6 will convert to 00:00:00:006 */
    this.convertMsToTime = function(duration){
        var milliseconds = parseInt((duration%1000)),
            seconds = parseInt((duration/1000)%60),
            minutes = parseInt((duration/(1000*60))%60),
            hours = parseInt((duration/(1000*60*60))%24);

            hours = (hours < 10) ? "0" + hours : hours;
            minutes = (minutes < 10) ? "0" + minutes : minutes;
            seconds = (seconds < 10) ? "0" + seconds : seconds;
            milliseconds = (milliseconds < 100) ? "0" + milliseconds : milliseconds;
            milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

        return hours + ":" + minutes + ":" + seconds + ":" + milliseconds;
    }

    this.getTimeDiff = function() {
        return Date.now() - startTime;
    }

}
