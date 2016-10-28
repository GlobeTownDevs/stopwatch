# stopwatch

## Functionality
### Requirements set externally
- Build a stopwatch with start and stop functionality

### Requirements set by us
- Display time initially as zero
- Display start, pause and reset buttons
- On clicking start, time should increment accurately against Date object
- Display time up to one hour and stop at one hour unless reset (or page refresh)
- Milliseconds display to present in tens to improve UX (otherwise last digit just hangs there)
- All time displays were formatted to two digits at all times

## Test Driven Development
- We used the Jasmine framework to construct our test suites
- Made decision early in the process to create basic HTML & CSS files
- Focused unit tests towards core JS functionality rather than on querying the DOM for element display and events
- TDD is not a substitute for QA and we started to understand when to revert to QA to check our code was working (eg button clicking events)

## Core learning from task
- What is core material to test: logic functions are working as expected
- With limited time, focus on the logic test and use QA for events and appearance checks
- Planning: we didn't pause enough to consider how to handle the Date object (there are lots of ways to access it and we may not have used the best or easiest method)
- Making asynchronous tests work was a huge lesson for us because we needed to understand how the callback queue would execute
