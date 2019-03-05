async function main() {
   
   var expect = require('chai').expect;
   
   require('chromedriver');
   
   const {Builder, By, until} = require('selenium-webdriver');
   
   var SeleniumSDK = require('@applitools/eyes-selenium');
   
   const {ConsoleLogHandler, BatchInfo, TestResults} = require('@applitools/eyes.sdk.core');

   var Eyes = SeleniumSDK.Eyes;
   
   var eyes = new Eyes();
   
   eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
   eyes.setLogHandler(new ConsoleLogHandler(true));
   
   var driver = new Builder().forBrowser('chrome').build();
    
  try {

     // Start the test and set the browser's viewport size to 800x600.
     await eyes.open(driver, 'Hello World!', 'My first Javascript test!', {width: 800, height: 600});

     // Navigate the browser to the "hello world!" web-site.
     await driver.get('https://applitools.com/helloworld');

     // Visual checkpoint #1.
     await eyes.checkWindow('Main Page');

     await eyes.checkElementBy(By.css("div.section"), null, "Hello World Image");

     // Click the "Click me!" button.
     await driver.findElement(By.tagName('button')).click();

     // Visual checkpoint #2.
     await eyes.checkWindow('Click!');

     // End the test.
     await eyes.close(false).then(function (results) {
        console.log("My Test Results: " + results);
        expect(results._status).to.equal('Passed');
     });

  } finally {

      // Close the browser.
      await driver.quit();

      // If the test was aborted before eyes.close was called ends the test as aborted.
      await eyes.abortIfNotClosed();

  }

}

main();