/* Initial tests */
QUnit.module("Basic setup tests", {
    beforeEach: function() {
        this.stopwatch = new Stopwatch('stopwatch');
    }
});

    QUnit.test("Renders span element into div", function(assert) {
        assert.ok(document.getElementById('time'));
    });

    QUnit.test("Adds a start button", function(assert) {
        assert.ok(document.getElementById('start'));
    });

    QUnit.test("Adds a clear button", function(assert) {
        assert.ok(document.getElementById('clear'));
    });

    QUnit.test("Adds a pause button", function(assert) {
        assert.ok(document.getElementById('pause'));
    });

    QUnit.test("Sets time element initially to '00:00:00:000'", function(assert) {
        assert.equal(document.getElementById('time').textContent, '00:00:00:000');
    });

    QUnit.test("Resets the time element when clear is called", function(assert) {
        this.stopwatch.start();
        this.stopwatch.clear();
        assert.equal(document.getElementById('time').textContent, '00:00:00:000');
    });


/* Time conversion tests */
QUnit.module("MS-to-Time function tests", {
    beforeEach: function() {
        this.stopwatch = new Stopwatch('stopwatch');
    }
});

   QUnit.test('Should be able to format 6 milliseconds to 00:00:00:006', function(assert) {
        var formatted = this.stopwatch.convertMsToTime(6);
        assert.equal(formatted,'00:00:00:006');
    });

   QUnit.test('Should be able to format 134 milliseconds to 00:00:00:134', function(assert) {
       var formatted = this.stopwatch.convertMsToTime(134);
       assert.equal(formatted,'00:00:00:134');
   });

   QUnit.test('Should be able to format 6 seconds to 00:00:06:000', function(assert) {
       var formatted = this.stopwatch.convertMsToTime(6000);
       assert.equal(formatted,'00:00:06:000');
   });

   QUnit.test('Should be able to format 1 hour, 2 minutes, 30 seconds, 14 milliseconds to 01:02:30:014', function(assert) {
       var formatted = this.stopwatch.convertMsToTime(3750014);
       assert.equal(formatted,'01:02:30:014');
   });


/* Counter display checks */


/* Async tests */
QUnit.module("Async tests", {
   beforeEach: function() {
       this.stopwatch = new Stopwatch('stopwatch');
   }
});


QUnit.test("Can run for one second then stop. Counter should display between 990-1010 ms", function(assert) {
    var stopwatch = this.stopwatch;
    var done = assert.async();
    stopwatch.start();
    window.setTimeout(function() {
        stopwatch.pause();
        var timeDiff = stopwatch.pausedAt - stopwatch.counterInit;
        assert.ok(timeDiff <= 1010 && timeDiff >= 990);
        done();
     }, 1000);
});

QUnit.test("Can start for 1s, pause for 1s and run for 1s. Counter should display between 2990-3010 ms", function(assert) {
    var stopwatch = this.stopwatch;
    var done = assert.async();
    stopwatch.start();
    window.setTimeout(function() {
        stopwatch.pause();
    },  1000);

    window.setTimeout(function() {
        stopwatch.start();
    }, 2000);

    window.setTimeout(function() {
        stopwatch.pause();
        var timeDiff = stopwatch.pausedAt - stopwatch.counterInit;
        assert.ok(timeDiff <= 3010 && timeDiff >= 2990);
        done();
    }, 3000);
});
