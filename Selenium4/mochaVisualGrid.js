'use strict';

var expect = require('chai').expect;

require('chromedriver');
const { Builder, By } = require('selenium-webdriver');
const { Options: ChromeOptions } = require('selenium-webdriver/chrome');
const { ConsoleLogHandler, Region, TestResults } = require('@applitools/eyes-sdk-core');
const { Eyes, Target, SeleniumConfiguration, BrowserType } = require('@applitools/eyes-selenium');


let /** @type {WebDriver} */ driver, /** @type {Eyes} */ eyes;

describe('VisualGrid - Hello World', function () {
  this.timeout(5 * 60 * 1000);

  before(async function () {
    //Run Headless...
    //driver = new Builder().forBrowser('chrome').setChromeOptions(new ChromeOptions().headless()).build();

    driver = new Builder().forBrowser('chrome').build();
    
    eyes = new Eyes(true);
    eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
    eyes.setLogHandler(new ConsoleLogHandler(true));

    // Navigate the browser to the "hello world!" web-site.
    await driver.get('https://applitools.com/helloworld');
  });

  beforeEach(async function () {
    const configuration = new SeleniumConfiguration();
    configuration.setAppName(this.test.parent.title);
    configuration.setTestName(this.currentTest.title);
    configuration.addBrowser(400, 800, BrowserType.CHROME);
    configuration.addBrowser(400, 800, BrowserType.FIREFOX);
    configuration.addBrowser(700, 800, BrowserType.CHROME);
    configuration.addBrowser(700, 800, BrowserType.FIREFOX);
    configuration.addBrowser(1000, 800, BrowserType.CHROME);
    configuration.addBrowser(1000, 800, BrowserType.FIREFOX);
    configuration.addBrowser(1300, 800, BrowserType.CHROME);
    configuration.addBrowser(1300, 800, BrowserType.FIREFOX);
    configuration.addBrowser(1600, 800, BrowserType.CHROME);
    configuration.addBrowser(1600, 800, BrowserType.FIREFOX);

    await eyes.open(driver, configuration);
  });
  
  it("Hello World", async function () {
     
      // Visual checkpoint #1.
      await eyes.check('Main Page', Target.window().fully());
      
      //Check Region
      await eyes.check('Hello World Image', Target.region(By.css('div.section')).fully());
      
      // Click the "Click me!" button.
      await driver.findElement(By.css('button')).click();
      
      // Visual checkpoint #2.
      await eyes.check('Click!', Target.window().fully());

      await eyes.close(false).then(function (results) {
         console.log("\nMy Test Results: " + results + "\n");
         //results for the Visual Grid are returned as an array.
         expect([results].map(r => r.getStatus())).to.eql(['Passed']);
      });
  });
  
  afterEach(async function () {
    return eyes.abortIfNotClosed();
  });

  after(function () {
    return driver.quit();
  });
  
});