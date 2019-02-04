var assert = require('assert');

// Initialize the eyes SDK and set your private API key.
const {ConsoleLogHandler, BatchInfo} = require('@applitools/eyes.sdk.core');
const {By, Eyes, Target, StitchMode} = require('@applitools/eyes.webdriverio');

let eyes = new Eyes();
eyes.setLogHandler(new ConsoleLogHandler(true));
eyes.setApiKey(process.env.APPLITOOLS_API_KEY);

describe('TestObject website', function() {
  before(function() {
    browser.timeouts('implicit', 30000);
    browser.url('https://applitools.com/helloworld');
  });
  
  after(function() {
     browser.pause(2000);
     eyes.abortIfNotClosed();
  });
  
  it('Hello World', function() {

     // Start the test and set the browser's viewport size to 800x600.
     eyes.open(browser, 'Hello World!', 'My first Javascript test!', {width: 800, height: 600});
     
     browser.pause(2000);
     
     // Visual checkpoint #1.
     eyes.check('Main Page', Target.window());
     
     browser.pause(2000);

     // Click the "Click me!" button.
     browser.click('button');

     // Visual checkpoint #2.
     eyes.check('Click!', Target.window());
     
     browser.pause(2000);

     // End the test.
     eyes.close(false);
  });
});
