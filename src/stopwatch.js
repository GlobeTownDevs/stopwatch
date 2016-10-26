/* holds stopwatch function */
function Stopwatch(id){
    this.id = id;

    var elt = document.getElementById(id);
    elt.innerHTML = "<span id='time'></span><button id='start' name='start'>Start</button><button id='clear' name='clear'>Clear</button>";

}
