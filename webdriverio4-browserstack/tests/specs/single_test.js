var assert = require('assert');
var ConsoleLogHandler = require('eyes.selenium').ConsoleLogHandler;

const {Eyes, Target} = require('@applitools/eyes.webdriverio');
var eyes = new Eyes();
    
// describe('Google\'s Search Functionality', function() {
//   it('can find search results', function () {
//     browser
//       .timeouts('script', 60000)
//       .url('https://www.google.com')
//       .waitForExist('#hplogo', 60000);
//
//     browser.setValue('*[name="q"]','BrowserStack\n');
//     assert(browser.getTitle().match(/BrowserStack - Google Search/i));
//   });
// });

describe('Google\'s Search Functionality', function() {
  it('can find search results', function () {
    browser.executeAsync(function (done) {
      browser.url('https://www.google.com')
      browser.waitForExist('#hplogo', 60000);
      browser.setValue('*[name="q"]','BrowserStack\n');
      
      eyes.setApiKey("9RkMajXrzS1Zu110oTWQps102CHiPRPmeyND99E9iL0G7yAc110");//(process.env.APPLITOOLS_API_KEY);
      eyes.setLogHandler(new ConsoleLogHandler(true));
      eyes.open(browser, 'Hello World!', 'WebdriverIO! Test');
      eyes.check('Main Page', Target.window());
      eyes.close();
      
      assert(browser.getTitle().match(/BrowserStack - Google Search/i));
      setTimeout(done, 60000);
    });
  });
});