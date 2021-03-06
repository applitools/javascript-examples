'use strict';

require('geckodriver');
require('chromedriver');

const { Builder, Capabilities, By } = require('selenium-webdriver');
const { ConsoleLogHandler, Region, TestResults, GeneralUtils, MatchLevel } = require('@applitools/eyes-sdk-core');
const { Eyes, Target, SeleniumConfiguration, BrowserType, StitchMode } = require('@applitools/eyes-selenium');

async function main() {
  // Open a Chrome browser.
  const driver = new Builder()
    .withCapabilities(Capabilities.chrome())
    .build();

  // Initialize the eyes SDK and set your private API key.
  const eyes = new Eyes(true);
  
  eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
  eyes.setLogHandler(new ConsoleLogHandler(false));
  
  try {
    // Start the test and set the browser's viewport size to 800x600.
    await eyes.open(driver, 'Eyes Examples', 'My first Javascript test!', { width: 800, height: 600 });

    // Navigate the browser to the "hello world!" web-site.
    await driver.get('https://applitools.com/helloworld');
    
    // Visual checkpoint #1.
    await eyes.check('Main Page', Target.window());

    await eyes.check('Hello World Image', Target.region(By.css("div.section"), null, "Hello World Image"));
    
    // Click the "Click me!" button.
    await driver.findElement(By.css('button')).click();

    // Visual checkpoint #2.
    await eyes.check('Click!', Target.window());

    // End the test.
    await eyes.close(false);
  
  } finally {
    // Close the browser.
    await driver.quit();

    // If the test was aborted before eyes.close was called ends the test as aborted.
    await eyes.abortIfNotClosed();
  }
}

main();