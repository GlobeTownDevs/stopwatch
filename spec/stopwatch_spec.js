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
      it("should reset the time DOM element when clear method called", function() {
        var initial = document.getElementById('time').textContent;
        this.stopwatch.start();
        this.stopwatch.clear();
        expect(document.getElementById('time').textContent).toBe(initial);
      });

  });

  describe('ms-to-time tests', function() {
      it("should be able to format 6 milliseconds to 00:00:00:006", function(){
         var formatted = this.stopwatch.convertMsToTime(6);
         expect(formatted).toBe('00:00:00:006');
     });

     it("should be able to format 134 milliseconds to 00:00:00:134", function(){
        var formatted = this.stopwatch.convertMsToTime(134);
        expect(formatted).toBe('00:00:00:134');
     })

     it("should be able to format 6 seconds to 00:00:06:000", function(){
        var formatted = this.stopwatch.convertMsToTime(6000);
        expect(formatted).toBe('00:00:06:000');
     })

     it("should be able to format 1 hour, 2 minutes, 30 seconds, 14 milliseconds to 01:02:30:014", function(){
        var formatted = this.stopwatch.convertMsToTime(3750014);
        expect(formatted).toBe('01:02:30:014');
     })
  });
});
