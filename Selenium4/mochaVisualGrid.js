'use strict';

var expect = require('chai').expect;

require('chromedriver');
const { Builder, By } = require('selenium-webdriver');
const { Options: ChromeOptions } = require('selenium-webdriver/chrome');
const { Region, TestResults } = require('@applitools/eyes-sdk-core');
const { Eyes, VisualGridRunner, Target, ConsoleLogHandler, Configuration, BrowserType, DeviceName, ScreenOrientation, BatchInfo } = require('@applitools/eyes-selenium');
let sleep = require('sleep');

let /** @type {WebDriver} */ driver, /** @type {Eyes} */ eyes;

describe('VisualGrid - Hello World', function () {

  this.timeout(5 * 60 * 1000);
  
  const runner = new VisualGridRunner(100);
  const eyes = new Eyes(runner);
  
  const driver = new Builder().forBrowser('chrome').build();
  //Run Headless...
  //driver = new Builder().forBrowser('chrome').setChromeOptions(new ChromeOptions().headless()).build();
  
  const batchInfo = new BatchInfo("Visual Grid - Hello World");
  
  batchInfo.setSequenceName('Insights Batch');
  
  before(async function () {
    eyes.setServerUrl("https://eyesapi.applitools.com");
    eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
    eyes.setLogHandler(new ConsoleLogHandler(true));    
  });

  beforeEach(async function () {
    var appName = this.test.parent.title;
    var testName = this.currentTest.title;

    const configuration = eyes.getConfiguration();
    configuration.setBatch(batchInfo);
    configuration.setAppName(appName);
    configuration.setTestName(testName);
    configuration.addBrowser(1200, 800, BrowserType.CHROME);
    configuration.addBrowser(1200, 800, BrowserType.CHROME_ONE_VERSION_BACK);
    configuration.addBrowser(1200, 800, BrowserType.SAFARI_ONE_VERSION_BACK);
    configuration.addBrowser(1200, 800, BrowserType.EDGE);
    configuration.addBrowser(1200, 800, BrowserType.IE10);
    configuration.addBrowser(1200, 800, BrowserType.IE11);
    configuration.addDeviceEmulation(DeviceName.iPhone_X, ScreenOrientation.PORTRAIT);
    configuration.addDeviceEmulation(DeviceName.iPhone_X, ScreenOrientation.LANDSCAPE);
    //configuration.setProxy('http://localhost:8888');
    eyes.setConfiguration(configuration);
    
    await eyes.open(driver);
  });
  
  it("Hello World", async function () {

      await driver.get('https://applitools.com/helloworld');
     
      // Visual checkpoint #1.
      await eyes.check('Main Page', Target.window().fully());
      
      //Check Region
      await eyes.check('Hello World Image', Target.region(By.css('div.section')).fully());
      
      // Click the "Click me!" button.
      await driver.findElement(By.css('button')).click();
      
      // Visual checkpoint #2.
      await eyes.check('Click!', Target.window().fully().ignoreDisplacements(true));
      
      await eyes.closeAsync();
  });
  
  afterEach(async function () { 
    const results = await runner.getAllTestResults(false);

    for (var result in results) {
       console.log("My Indiv Result: " + result)
       //await expect(results.getStatus()).to.equal('Passed');
       expect(result).to.equal('_passed');
    }

    await eyes.abortIfNotClosed();
  });

  after(async function () {
    await driver.quit();
  });
  
});


