/* holds all jasmine test */
describe("Stopwatch", function() {
  it("Adds text contact into html (into div with id 'stopwatch')", function() {
    var stopwatch = new Stopwatch('stopwatch');
    expect(document.getElementById('stopwatch').textContent).toBe('hello');
  });

 });
