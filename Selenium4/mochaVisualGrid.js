'use strict';

var expect = require('chai').expect;

require('chromedriver');
const { Builder, By } = require('selenium-webdriver');
const { Options: ChromeOptions } = require('selenium-webdriver/chrome');
const { Region, TestResults } = require('@applitools/eyes-sdk-core');
const { Eyes, VisualGridRunner, Target, ConsoleLogHandler, Configuration, BrowserType, DeviceName, ScreenOrientation, BatchInfo } = require('@applitools/eyes-selenium');


let /** @type {WebDriver} */ driver, /** @type {Eyes} */ eyes;

describe('VisualGrid - Hello World', function () {
  this.timeout(5 * 60 * 1000);
  
  const eyes = new Eyes(new VisualGridRunner());
  const driver = new Builder().forBrowser('chrome').build();
  //Run Headless...
  //driver = new Builder().forBrowser('chrome').setChromeOptions(new ChromeOptions().headless()).build();
  const batchInfo = new BatchInfo("Visual Grid - Hello World");
  batchInfo.setSequenceName('alpha sequence');
  
  before(async function () {
    eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
    eyes.setLogHandler(new ConsoleLogHandler(true));    
    await driver.get('https://applitools.com/helloworld');
  });

  beforeEach(async function () {
    var appName = this.test.parent.title;
    var testName = this.currentTest.title; 
    
    const configuration = new Configuration();
    configuration.setBatch(batchInfo);
    configuration.setConcurrentSessions(10);
    configuration.setAppName(appName);
    configuration.setTestName(testName);
    configuration.addBrowser(1200, 800, BrowserType.CHROME);
    // configuration.addBrowser(1200, 800, BrowserType.FIREFOX);
    // configuration.addBrowser(1200, 800, BrowserType.EDGE);
    // configuration.addBrowser(1200, 800, BrowserType.IE10);
    // configuration.addBrowser(1200, 800, BrowserType.IE11);
    // configuration.addDeviceEmulation(DeviceName.iPhone_X, ScreenOrientation.PORTRAIT);
    // configuration.addDeviceEmulation(DeviceName.iPhone_X, ScreenOrientation.LANDSCAPE);
    //configuration.setProxy('http://localhost:8888');
    eyes.setConfiguration(configuration);
    
    await eyes.open(driver);
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
      
      const results = await eyes.getRunner().getAllTestResults();
      
      for (var result in results) {
         console.log("My Indiv Result: " + result)
         //await expect(results.getStatus()).to.equal('Passed');
         await expect(result).to.equal('_passed');
      }
      
      //await expect(results).to.eql([2, 1, 3, 5, 4]);
  });
  
  afterEach(async function () {
    return eyes.abortIfNotClosed();
  });

  after(function () {
    return driver.quit();
  });
  
});