/* holds stopwatch function */
function Stopwatch(id){

    /* holds a setInterval object*/
    var timer;

    /* Time from birth */
    var counterInit = this.counterInit = 0;
    /* Time from pause */
    var pausedAt = this.pausedAt = 0;
    /* Time from go */
    var startTime = this.startTime = 0;

    /* Global this hack */
    var that = this;

    /* DOM Setup */
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

    /* Disable/Enable buttons */
    var enableButton = function(btn){
        btn.disabled = false;
    }

    var disableButton = function(btn){
        btn.disabled = true;
    }




    /* Sets initial time when first called */
    /* When calling after paused, updates startTime to factor in pause length*/
    this.start = function() {
        enableButton(buttonPauseElt);
        if (!this.counterInit) {
            this.counterInit = this.startTime = Date.now();
        }   else {
            this.startTime = Date.now() - (this.pausedAt - this.startTime);
        }
        startPaint(this.startTime);
    };

    /* Stops browser painting & triggers new pausedAt time */
    this.pause = function() {
        disableButton(buttonPauseElt);
        stopPaint();
        this.pausedAt = Date.now();
    };

    /* Resets all */
    this.clear = function() {
        disableButton(buttonPauseElt);
        stopPaint();
        this.counterInit = this.startTime = this.pausedAt = 0;
        timeElt.textContent = convertMsToTime(0);
    };

    /* Paints browser with formatted time every 10ms */
    var startPaint = function(startTime) {

        timer = window.setInterval(function() {
          timeElt.textContent = convertMsToTime(getTimeDiff(startTime));
        }, 10);
    };

    /* Ceases painting */
    var stopPaint = function(){
        window.clearInterval(timer);
    }

    /* e.g 6 will convert to 00:00:00:006 */
    var convertMsToTime = this.convertMsToTime = function(duration){

        var fullFormat = new Date(duration).toISOString();
        return fullFormat.replace(/.*(\d{2}:\d{2}:\d{2}).(\d{3}).*/g, '$1:$2');

    }

    /* Calculates accurate difference between current & startTime */
    var getTimeDiff = this.getTimeDiff = function(startTime) {
        if(isNaN(startTime)) { throw new TypeError("getTimeDiff requires a number")}
        return Date.now() - startTime;
    }
}

Stopwatch("stopwatch");
