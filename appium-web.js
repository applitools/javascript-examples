"use strict";

function main() {

    var webdriver = require("selenium-webdriver");

    var LOCAL_APPIUM = "http://127.0.0.1:4723/wd/hub";

    // Initialize the eyes SDK and set your private API key.
    var Eyes = require("eyes.selenium").Eyes;
    var eyes = new Eyes();
    eyes.setApiKey(process.env.APPLITOOLS_KEY);

    // Open browser.
    var driver = new webdriver.Builder().usingServer(LOCAL_APPIUM).withCapabilities(webdriver.Capabilities.chrome()
        .set('platformName', 'Android').set('deviceName', 'android').set('browserName', 'Chrome')).build();

    try {

      eyes.setForceFullPageScreenshot(true);
      eyes.setStitchMode(Eyes.StitchMode.CSS);

      // Start the test and set the browser's viewport size to 800x600.
      eyes.open(driver, 'QuickenLoans.com', 'Test Android')

      driver.get('https://www.quickenloans.com/');

      // Visual checkpoint #1.
      eyes.checkWindow('Home Page');

      driver.findElement(webdriver.By.tagName('a.sls-c-Button.c-Button--large.c-Button--inline.b-Link--inverse')).click();

      // Visual checkpoint #2.
      eyes.checkWindow('Home Loans');

      //Close Eyes
      eyes.close(false);

    } finally {

        // Close the browser.
        driver.quit();

        // If the test was aborted before eyes.close was called, ends the test as aborted.
        eyes.abortIfNotClosed();

    }
}

main();
