async function main() {
   
   var expect = require('chai').expect;
   require('chromedriver');
   const {Builder, By, until} = require('selenium-webdriver');
   const { Region, TestResults } = require('@applitools/eyes-sdk-core');
   const { Eyes, Target, ConsoleLogHandler, BatchInfo } = require('@applitools/eyes-selenium');
   var driver = null, eyes = null;
   var eyes = new Eyes();
   
   eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
   eyes.setLogHandler(new ConsoleLogHandler(true));
   
   var driver = new Builder().forBrowser('chrome').build();
    
  try {

     await driver.get('https://applitools.com');
     
     await eyes.open(driver, 'JS App', 'JS Test', {width: 1200, height: 600});
     
     //These take a snapshot of the viewport
     //await eyes.checkRegionBy(By.css("div.page-container.panel.center.how-does-it-work"),"Appli", 0);
     //await eyes.checkElementBy(By.css("div.page-container.panel.center.how-does-it-work"), null, "Appli");
     
     //This actually finds the region and takes a snapshot of the region.
     await eyes.check('Check Region', Target.region(By.css('div.page-container.panel.center.how-does-it-work')));
     
     await eyes.close(false);

  } finally {

      // Close the browser.
      await driver.quit();

      // If the test was aborted before eyes.close was called ends the test as aborted.
      await eyes.abortIfNotClosed();

  }

}

main();


