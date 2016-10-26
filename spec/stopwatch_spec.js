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
  });

});
