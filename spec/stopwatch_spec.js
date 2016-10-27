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

    QUnit.test("Pause button is initially disabled", function(assert) {
        assert.ok(document.getElementById('pause').disabled === true);
    });

    QUnit.test("After stopwatch has started, pause button is not disabled", function(assert) {
        this.stopwatch.start();
        assert.ok(document.getElementById('pause').disabled === false);
        this.stopwatch.clear();
    });

    QUnit.test("After stopwatch started, pause disabled, when running start again pause is enabled", function(assert) {
        this.stopwatch.start();
        this.stopwatch.pause();
        assert.ok(document.getElementById('pause').disabled === true);
        this.stopwatch.start();
        assert.ok(document.getElementById('pause').disabled === false);
        this.stopwatch.clear();
    });

/* Button Trigger Tests, to check event listeners are functioning */

QUnit.module("Button trigger tests", {
    beforeEach: function() {
        this.stopwatch = new Stopwatch('stopwatch');
    }
});

    /* Start Button */
    QUnit.test("Checks start button eventListener functionality", function(assert){
        var stopwatch = this.stopwatch;
        var done = assert.async();
        var startBtn = document.getElementById('start');

        /* Create click Event object, dispatch that event to start button */
        var evObj = document.createEvent('Events');
        evObj.initEvent('click', true, false);
        startBtn.dispatchEvent(evObj);

        window.setTimeout(function() {
            assert.ok(document.getElementById('time').innerHTML != '00:00:00:000');
            stopwatch.clear();
            done();
        },100)
    });
    /* Pause Button */
    QUnit.test("Checks pause button eventListener functionality", function(assert){
        var stopwatch = this.stopwatch;
        var pauseBtn = document.getElementById('pause');
        stopwatch.start();

        /* Simulates clicking pause button */
        var evObj = document.createEvent('Events');
        evObj.initEvent('click', true, false);
        pauseBtn.dispatchEvent(evObj);
        assert.ok(document.getElementById('pause').disabled === true);
    });
    /* Clear Button */
    QUnit.test("Checks clear button eventListener functionality", function(assert){
        var stopwatch = this.stopwatch;
        var clearBtn = document.getElementById('clear');
        var timeDisplay = document.getElementById('time');
        timeDisplay.textContent = "I'M A TEAPOT";

        /* Simulates clear button */
        var evObj = document.createEvent('Events');
        evObj.initEvent('click', true, false);
        clearBtn.dispatchEvent(evObj);

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

    QUnit.test('Should throw an error if input is not number', function(assert) {
        assert.throws(function() {
            this.stopwatch.convertMsToTime('omg!')
        });
    });

    /* Testing getTimeDiff */
    QUnit.test('getTimeDiff should throw an error if input is not number', function(assert) {
        assert.throws(function() {
            this.stopwatch.getTimeDiff('cheese');
        });
    });

    QUnit.test('getTimeDiff returns 100ms if given a time 100ms ago', function(assert) {
        var pastTime = Date.now() - 100;
        assert.equal(this.stopwatch.getTimeDiff(pastTime), 100);
    });

/* Async tests */
QUnit.module("Async tests", {
   beforeEach: function() {
       this.stopwatch = new Stopwatch('stopwatch');
   }
});

/* Counter display checks */

    QUnit.test("Counter should be non-zero after running for 0.5s", function(assert) {
        var done = assert.async();
        var stopwatch = this.stopwatch;
        stopwatch.start();
        window.setTimeout(function() {
            stopwatch.pause();
            assert.notEqual(document.getElementById('time').textContent, '00:00:00:000');
            done();
        }, 500);
    });

    QUnit.test("Counter should not show NaN after running for 0.5s", function(assert) {
        var done = assert.async();
        var stopwatch = this.stopwatch;
        stopwatch.start();
        window.setTimeout(function() {
            stopwatch.pause();
            assert.notEqual(document.getElementById('time').textContent, 'NaNNaN:NaNNaN:NaNNaN:NaNNaNNaN');
            done();
        }, 500);
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
