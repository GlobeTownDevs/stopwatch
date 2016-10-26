/* holds stopwatch function */
function Stopwatch(id){

    var that = this;

    this.id = id;

    this.elt = document.getElementById(id);
    this.elt.innerHTML = "<span id='time'>00:00:00:000</span><button id='start' name='start'>Start</button><button id='clear' name='clear'>Clear</button>";

    this.timeElt = document.getElementById('time');
    this.buttonStartElt = document.getElementById('start');
    this.buttonClearElt = document.getElementById('clear');

    //* Event handlers *//
    /* Start button */
    this.buttonStartElt.addEventListener("click", function(){
        that.start();
    })

    /* Clear Button */
    this.buttonClearElt.addEventListener("click", function(){
        that.clear();
    })

    this.start = function(){
        that.timeElt.textContent = "00:00:00:001";
    }

    this.clear = function(){

    }


}
