var assert = require('assert');

describe('TestObject website', function() {
  before(function() {
    browser.timeouts('implicit', 30000);
    browser.url('https://applitools.com/helloworld');
  });

  it('Hello World', function() {
     console.log("OPENING EYES....")
     browser.eyesOpen("Hello World");
     console.log("DONE OPENING EYES....")
     browser.eyesCheckWindow("Hello World Page");
     browser.click('button');
     browser.eyesCheckWindow("Click!");
     browser.eyesClose(false);
  });
});
