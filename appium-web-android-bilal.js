"use strict";

async function main () {

    const webdriver = require("selenium-webdriver");

    const LOCAL_APPIUM = "http://127.0.0.1:4723/wd/hub";

    // Initialize the eyes SDK and set your private API key.
    const { Eyes, Target, ConsoleLogHandler, StitchMode } = require("@applitools/eyes-selenium");
    
    const driver = new webdriver
        .Builder()
        .usingServer(LOCAL_APPIUM)
        .withCapabilities(
            webdriver.Capabilities.chrome()
                .set('platformName', 'Android')
                //.set('platformVersion', '10.0')
                .set('deviceName', 'anroid')
                //.set('deviceName', 'Pixel_2')
                .set('browserName', 'Chrome')
                .set('newCommandTimeout', 999999)
                //.set('automationName', 'UiAutomator2')
                //.set('avd', 'Pixel_2_API_29')
        ).build();
        
    // Initialize the eyes SDK
    const eyes = new Eyes();
    eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
    eyes.setForceFullPageScreenshot(true);
    eyes.setLogHandler(new ConsoleLogHandler(true));
    eyes.setStitchMode(StitchMode.CSS);

    try {
        // Start the test
        await eyes.open(driver, 'Google.com', 'Appium on Android');

        await driver.get('https://www.google.com/');

        // Visual checkpoint #1.
        //await eyes.check('Home Page', Target.window());
        
        await eyes.checkWindow("Home Page");
        
        // Close Eyes
        await eyes.close();
    } catch (error) {
        console.log(error);
    } finally {
        // Close the browser.
        await driver.quit();

        // If the test was aborted before eyes.close was called, ends the test as aborted.
        await eyes.abort();
    }
}

main();