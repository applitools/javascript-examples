'use strict';

require('geckodriver');
require('chromedriver');

const { Builder, Capabilities, By } = require('selenium-webdriver');
const { ConsoleLogHandler, Region, TestResults, GeneralUtils, MatchLevel } = require('@applitools/eyes-sdk-core');
const { Eyes, Target, SeleniumConfiguration, BrowserType, StitchMode } = require('@applitools/eyes-selenium');

var setMethods = [
  'eyes.setAgentId("setAgentId")',
  'eyes.setBaselineBranchName("default")',
  'eyes.setBranchName("setBranchName")',
  
  'eyes.setDefaultMatchTimeout(5000)',
  'eyes.setForceFullPageScreenshot(true)',
  'eyes.setForcedImageRotation(90)',
  
  'eyes.setHideScrollbars(true)',
  'eyes.setHostOS("setHostOS")',
  'eyes.setHostApp("setHostApp")',

  'eyes.setHostingApp("setHostingApp")',
  'eyes.setIgnoreCaret(true)',
  'eyes.setIsDisabled(false)',
  'eyes.setMatchLevel(MatchLevel.Content)',
  'eyes.setParentBranchName("setParentBranchName")',
  'eyes.setSaveNewTests(true)',
  'eyes.setScaleRatio(2)',
  'eyes.setServerUrl("https://eyes.applitools.com")',
  'eyes.setStitchMode(StitchMode.CSS)',
  //'eyes.setViewportSize({width: 888, height: 666})',
  'eyes.setWaitBeforeScreenshots(3000)',
  'eyes.addProperty("PROPERTY", "PROP-VALUE")'
];

var i;

var vg = false;

async function main() {

  const driver = new Builder()
    .withCapabilities(Capabilities.chrome())
    .build();

  const eyes = new Eyes(vg);
  
  eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
  eyes.setLogHandler(new ConsoleLogHandler(false));
  
  for (i = 0; i < setMethods.length; i++) {
    console.log(setMethods[i]);
    try { 
      eval(setMethods[i]);
    } catch(err) {
      console.log("Set Method: " + setMethods[i] + " Error: " + err);
    }
  }
  
  try {
    await driver.get('https://applitools.com/helloworld');
    await eyes.open(driver, 'Javascript Selenum 4', 'Method Test', { width: 800, height: 600 });
    await eyes.check('Main Page', Target.window());
    await eyes.close(false);
  
  } catch(err) {

    console.error(err.message);
    
    if (driver && eyes) {
      await driver.quit();
      await eyes.abortIfNotClosed();
    }

  } finally {
    await driver.quit();
    await eyes.abortIfNotClosed();
  }
}

main();


//doesn't work at all
//eyes.setHostingApp("myBrowser");
//eyes.setDefaultMatchTimeout(5000);
//eyes.setSaveDebugScreenshots
//eyes.setViewportSize({width: 888, height: 666})

//doesn't work when vg is enabled
//eyes.addProperty("URL", browser.url);
//eyes.setAgentId("BLAH");
//eyes.setForceFullPageScreenshot(true);
//eyes.setStitchMode(StitchMode.CSS);
//eyes.setHideScrollbars(true);
//eyes.setSaveNewTests(true);
//eyes.setForcedImageRotation(true)
//eyes.setWaitBeforeScreenshots(3000)
//eyes.setForcedImageRotation

//Not tested
//eyes.setProxy
//eyes.setScrollRootElement