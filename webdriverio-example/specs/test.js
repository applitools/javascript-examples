// var assert = require('assert');
//
// // Initialize the eyes SDK and set your private API key.
// const {ConsoleLogHandler, BatchInfo} = require('@applitools/eyes.sdk.core');
// const {By, Eyes, Target, StitchMode} = require('@applitools/eyes.webdriverio');
//
// let eyes = new Eyes();
// eyes.setLogHandler(new ConsoleLogHandler(true));
// eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
//
// describe('TestObject website', function() {
//
//   before(function() {
//     browser.timeouts('implicit', 30000);
//     browser.url('https://applitools.com/helloworld');
//   });
//
//   after(function() {
//      eyes.abortIfNotClosed();
//   });
//
//   it('Hello World', function() {
//
//      eyes.open(browser, 'Hello World!', 'My first Javascript test!', {width: 800, height: 600}).then(function () {
//         return eyes.check('Main Page', Target.window());
//      }).then(function () {
//         browser.click('button');
//         return eyes.check('Click!', Target.window());
//      }).then(function () {
//         return eyes.close(false);
//      });
//
//   });
// });

var assert = require('assert');

// Initialize the eyes SDK and set your private API key.
const {ConsoleLogHandler, BatchInfo} = require('@applitools/eyes.sdk.core');
const {By, Eyes, Target, StitchMode} = require('@applitools/eyes.webdriverio');

let eyes = new Eyes();
eyes.setLogHandler(new ConsoleLogHandler(true));
eyes.setApiKey(process.env.APPLITOOLS_API_KEY);

describe('Google Search Functionality', function() {
  it('can find search results', function () {
    browser.executeAsync(function (done) {
      browser.url('https://www.google.com')
      browser.waitForExist('#hplogo', 60000);
      browser.setValue('*[name="q"]','BrowserStack\n');
      
      // eyes.setApiKey("9RkMajXrzS1Zu110oTWQps102CHiPRPmeyND99E9iL0G7yAc110");//(process.env.APPLITOOLS_API_KEY);
      // eyes.setLogHandler(new ConsoleLogHandler(true));
      // eyes.open(browser, 'Hello World!', 'WebdriverIO! Test');
      eyes.check('Main Page', Target.window().ignore(By.id('blah')));
      // eyes.close();
      
      assert(browser.getTitle().match(/BrowserStack - Google Search/i));
      setTimeout(done, 60000);
    });
  });
});

// describe('TestObject website', function() {
//   before(function() {
//     browser.timeouts('implicit', 30000);
//     browser.url('https://applitools.com/helloworld');
//   });
//
//   after(function() {
//      browser.pause(5000);
//      eyes.abortIfNotClosed();
//   });
//
//   it('Hello World', function() {
//
//      // Start the test and set the browser's viewport size to 800x600.
//      eyes.open(browser, 'Hello World!', 'My first Javascript test!', {width: 800, height: 600});
//
//      browser.pause((5000));
//
//      // Visual checkpoint #1.
//      eyes.check('Main Page', Target.window());
//
//      browser.pause((5000));
//
//      // Click the "Click me!" button.
//      browser.click('button');
//
//      // Visual checkpoint #2.
//      eyes.check('Click!', Target.window());
//
//      browser.pause((5000));
//
//      // End the test.
//      eyes.close(false);
//   });
// });