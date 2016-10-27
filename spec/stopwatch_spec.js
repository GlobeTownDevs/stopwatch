
QUnit.module("Stopwatch", {
    beforeEach: function() {
        this.stopwatch = new Stopwatch('stopwatch');
    }
});

QUnit.test("renders span element into div", function(assert) {
    assert.ok(document.getElementById('time'));
});

QUnit.test("adds start button", function(assert) {
    assert.ok(document.getElementById('start'));
});

QUnit.test("adds clear button", function(assert) {
    assert.ok(document.getElementById('clear'));
});

QUnit.test("adds pause button", function(assert) {
    assert.ok(document.getElementById('pause'));
});

QUnit.test("sets time element to '00:00:00:000'", function(assert) {
    assert.equal(document.getElementById('time').textContent, '00:00:00:000');
});

QUnit.test("resets the time element when clear is called", function(assert) {
    this.stopwatch.start();
    this.stopwatch.clear();
    assert.equal(document.getElementById('time').textContent, '00:00:00:000');
});
