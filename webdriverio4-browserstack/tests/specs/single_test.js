var assert = require('assert');
var ConsoleLogHandler = require('eyes.selenium').ConsoleLogHandler;

const {Eyes, Target} = require('@applitools/eyes.webdriverio');
var eyes = new Eyes();
    
describe('Google\'s Search Functionality', function() {
  it('can find search results', function () {
    browser.executeAsync(function (done) {
      //browser.debug();

      browser.url('https://www.google.com');
      browser.waitForExist('#hplogo', 60000000);
     // browser.setValue('*[name="q"]','BrowserStack\n');

      
      eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
      eyes.setLogHandler(new ConsoleLogHandler(true));
      eyes.open(browser, 'Hello World!', 'WebdriverIO! Test', {width: 1300, height: 700});
      eyes.check('Main Page', Target.window()); //.ignoreRegions(By.css("#hplogo"))
      eyes.close();
      
      //assert(browser.getTitle().match(/BrowserStack - Google Search/i));
      setTimeout(done, 60000000);
    });
  });
});