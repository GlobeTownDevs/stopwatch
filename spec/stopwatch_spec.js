/* holds all jasmine test */
describe("Stopwatch", function() {
  beforeEach(function() {
    this.stopwatch = new Stopwatch("stopwatch");
  });

  describe("initialisation", function() {
    it("should render span element for time into div", function() {
      expect(document.getElementById('time')).toBeTruthy();
    });

    it("Adds start button into html (into div with id 'stopwatch')", function() {
      expect(document.getElementById('start')).toBeTruthy();
    });

    it("Adds clear button into html (into div with id 'stopwatch')", function() {
      expect(document.getElementById('clear')).toBeTruthy();
    });

    it('time element should initially display 00:00:00:000', function(){
        expect(document.getElementById('time').textContent).toBe('00:00:00:000');
    });

});

describe('basic tests', function(){
    it("should update stopwatch DOM element when start method called", function(){
        var initial = document.getElementById('time').textContent;
        this.stopwatch.start();
        expect(document.getElementById('time').textContent).not.toBe(initial);
    })

})


});
