'use strict';

var expect = require('chai').expect;

require('chromedriver');
const { Builder, By } = require('selenium-webdriver');
const { Options: ChromeOptions } = require('selenium-webdriver/chrome');
const { Region, TestResults } = require('@applitools/eyes-sdk-core');
const { Eyes, VisualGridRunner, Target, ConsoleLogHandler, Configuration, BrowserType, DeviceName, ScreenOrientation, BatchInfo } = require('@applitools/eyes-selenium');
let sleep = require('sleep');

let /** @type {WebDriver} */ driver, /** @type {Eyes} */ eyes;

describe('VisualGrid - USA Today', function () {

  this.timeout(5 * 60 * 1000);
  
  const runner = new VisualGridRunner(1);
  const eyes = new Eyes(runner);
  
  const driver = new Builder().forBrowser('chrome').build();
  //Run Headless...
  //driver = new Builder().forBrowser('chrome').setChromeOptions(new ChromeOptions().headless()).build();
  
  const batchInfo = new BatchInfo("Visual Grid - USA TODAY");
  
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
    eyes.setConfiguration(configuration);
    
    await eyes.open(driver);
  });
  
  it("USA Today Weather", async function () {

      await driver.get('https://www.usatoday.com/weather/');
     
      //await driver.findElement(By.css('#module-position-SGzmRYXB-k8 > span > a > span')).click();
 
      await eyes.check('Click Login', Target.window().beforeRenderScreenshotHook("document.querySelector('#module-position-SG0WZMHyZ8o > span > div').setAttribute('style', 'display:block')"));
      
      await eyes.closeAsync();
  });
  
  afterEach(async function () { 
    const results = await runner.getAllTestResults(false);

    for (var result in results) {
       console.log("My Indiv Result: " + result)
       expect(result).to.equal('_passed');
    }

    await eyes.abortIfNotClosed();
  });

  after(async function () {
    await driver.quit();
  });
  
});
