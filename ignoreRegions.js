//import {Eyes, ConsoleLogHandler, Target, MatchLevel, StitchMode} from '../index';

function main() {

    const {Builder, By, until} = require('selenium-webdriver');

    const {ConsoleLogHandler, Target, MatchLevel, StitchMode} = require('eyes.selenium');

    var path = require('chromedriver').path;

    var driver = new Builder().forBrowser('chrome').build();

    // Initialize the eyes SDK and set your private API key.
    var Eyes = require('eyes.selenium').Eyes;
    var eyes = new Eyes();

    eyes.setApiKey(process.env.APPLITOOLS_KEY);

    try {

        // Start the test and set the browser's viewport size to 800x600.
        eyes.open(driver, 'Test HTML Pages', 'Ignore Regions', {width: 800, height: 600});

        // Navigate the browser to the "hello world!" web-site.
        driver.get('https://astappev.github.io/test-html-pages/');
        
        let el = driver.findElement(By.id('overflowing-div'));
        driver.wait(until.elementIsVisible(el),3000);

        eyes.check("Entire window", Target.window()
            .matchLevel(MatchLevel.Layout)
            .ignore(By.id("overflowing-div"))
            .ignore({element: driver.findElement(By.name("frame1"))})
            .ignore({left: 400, top: 100, width: 50, height: 50}, {left: 400, top: 200, width: 50, height: 100})
            .floating({left: 500, top: 100, width: 75, height: 100, maxLeftOffset: 25, maxRightOffset: 10, maxUpOffset: 30, maxDownOffset: 15})
            .floating({element: By.id("overflowing-div-image"), maxLeftOffset: 5, maxRightOffset: 25, maxUpOffset: 10, maxDownOffset: 25})
            // .floating({element: driver.findElement(By.tagName("h1")), maxLeftOffset: 10, maxRightOffset: 10, maxUpOffset: 10, maxDownOffset: 10})
        );

        // End the test.
        eyes.close();

    } finally {

      // Close the browser.
      driver.quit();

      // If the test was aborted before eyes.close was called ends the test as aborted.
      eyes.abortIfNotClosed();

  }

}

main();