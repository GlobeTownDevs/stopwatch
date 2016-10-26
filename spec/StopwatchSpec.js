describe("Basic tests when starting the stopwatch", function() {
    var clickSpy = jasmine.createSpy();
  it('should be set to paused on load', function() {
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

  // it('should be able to count',function() {
  //
  // })

})
