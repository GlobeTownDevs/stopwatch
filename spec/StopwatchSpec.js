describe("Basic tests when starting the stopwatch", function() {
    var clickSpy = jasmine.createSpy();
  it('should be set to paused on load', function() {
    console.log("test1");
    expect(isPaused).toBe(true);
  });

  // it('should start on clicking the start button', function() {
  //   expect(clickSpy).toHaveBeenCalled();
  //   expect(isPaused).toBe(false);
  // })

  it('should be able to start working', function() {
    stopwatch.startTimer();
    expect(isPaused).toBe(false);
  });

  it('should be able to stop working', function() {
    stopwatch.stopTimer();
    expect(isPaused).toBe(true);
  });

  it('should be able to pause on clicking reset', function() {
    stopwatch.resetTimer();
    expect(isPaused).toBe(true);
  });

  it('should be able to get a starting time', function() {
    stopwatch.startTimer();
    expect(startingTime).toEqual(new Date());
      });

  it('should be able to display milliseconds',function() {
    stopwatch.startTimer();
    expect(ms.innerHTML).not.toBe(0);
    stopwatch.stopTimer();
  });


});

describe('short asynchronous testing for stopwatch', function() {
  beforeEach(function(done) {
    stopwatch.startTimer();
    setTimeout(function() {
      stopwatch.stopTimer();
      done();
  },2500);
  });

  it('should not be able to display more than 999 milliseconds in the ms div',function(done) {
    expect(ms.innerHTML).not.toBeGreaterThan(999);
    done();
  });

  it('should start displaying seconds when milliseconds count is greater than 999', function(done) {
    expect(Math.abs(s.innerHTML)).toBe(2);
    done();
  });

});

describe('long asynchronous testing for stopwatch', function() {
  var originalTimeout;
  beforeEach(function() {
    stopwatch.startTimer();
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
  });

  it('should take more than a minute',function(done) {
    setTimeout(function() {
      done();
      stopwatch.stopTimer();
    },62500);
  })

  it('should start displaying minutes when seconds count is greater than 59', function(done) {
    expect(Math.abs(min.innerHTML)).toBe(1);
    done();
  });

});

describe('long async testing for stopwatch to reach limit of 60 minutes', function() {
  var originalTimeout;
  beforeEach(function() {
    stopwatch.startTimer();
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000000;
  });

  it('should take more than a minute',function(done) {
    setTimeout(function() {
      done();
      stopwatch.stopTimer();
    },3672500);
  });

    it('should stop counting when minutes gets to 60', function(done){
      expect(Math.abs(min.innerHTML)).toBe(60);
      expect(Math.abs(s.innerHTML)).toBe('00');
      expect(Math.abs(ms.innerHTML)).toBe('00');
      done();
    });
  })
