"use strict";

function main() {

    var webdriver = require("selenium-webdriver");

    var LOCAL_APPIUM = "http://127.0.0.1:4723/wd/hub";

    // Initialize the eyes SDK and set your private API key.
    var Eyes = require("eyes.selenium").Eyes;
    var FixedCutProvider = require("eyes.selenium").FixedCutProvider;

    var eyes = new Eyes();
    eyes.setApiKey(process.env.APPLITOOLS_KEY);

    // Open browser.
    var driver = new webdriver.Builder().usingServer(LOCAL_APPIUM).withCapabilities(webdriver.Capabilities.chrome()
        .set('platformName', 'iOS')
        .set('deviceName', 'iPhone Simulator')
        .set('browserName', 'safari')
        .set('automationName', 'XCUITest')
        .set('platformVersion', '10.3')).build();

    try {

      eyes.setForceFullPageScreenshot(true);
      eyes.setStitchMode(Eyes.StitchMode.CSS);

      // Start the test and set the browser's viewport size to 800x600.
      eyes.open(driver, 'Github.com', 'Test iOS')

      driver.get('https://www.github.com/');

      //remove the URL area from captured image.
      eyes.setImageCut(new FixedCutProvider(135, 63, 0, 0));
      // Visual checkpoint #1.
      eyes.checkWindow('Home Page');
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
