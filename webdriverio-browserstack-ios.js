// async function main() {
//     const webdriverio = require('webdriverio');
//
//     var bsUser = process.env.BS_USER || "YourBSUser";
//     var bsKey = process.env.BS_KEY || "YourBSKey";
//     var applitoolsKey = process.env.APPLITOOLS_API_KEY || "yourApplitoolsKey";
//
//     var options = {
//       user: 'justinison8',
//       key: '5qyqVytms3N1p4Dxew51',
//
//       seleniumHost: 'hub-cloud.browserstack.com',
//       seleniumPort: 443,
//
//       desiredCapabilities: {
//          'os_version' : '11.0',
//          'device' : 'iPhone X',
//          'real_mobile' : 'true',
//          'browserstack.local' : 'false',
//          'app' : 'https://s3.amazonaws.com/appium/TestApp8.4.app.zip',
//          'automationName' : 'XCUITest'
//       }
//     }
//
//     const driver = webdriverio.remote(options);
//     let browser = driver.init();
//
//     const {ConsoleLogHandler, BatchInfo} = require('@applitools/eyes.sdk.core');
//     const {By, Eyes, Target, StitchMode} = require('@applitools/eyes.webdriverio');
//
//     let eyes = new Eyes();
//     eyes.setApiKey(applitoolsKey);
//     eyes.setLogHandler(new ConsoleLogHandler(true));
//     eyes.setForceFullPageScreenshot(true);
//     //eyes.setStitchMode(StitchMode.CSS);
//     //eyes.setStitchMode(StitchMode.SCROLL);
//     //eyes.getIsCutProviderExplicitlySet
//     //eyes.setLogHandler(new ConsoleLogHandler(true));
//
//     // await browser
//     //    .timeouts('script', 60000)
//     //    .url('https://applitools.com/helloworld')
//     //    .waitForExist('body > div > div.section.button-section', 60000);
//
//     try {
//
//        // Start the test and set the browser's viewport size to 800x600.
//        await eyes.open(browser, 'Hello World!', 'My first WebdriverIO iOS test!');
//        //await eyes.check("Capture Title", Target.region(By.cssSelector("div.fancy.title.primary")));
//        //await eyes.check("Region by element", Target.region(By.css("div.fancy.title.primary")));
//        //await eyes.checkRegionBy(By.cssSelector('div.fancy.title.primary'), 'Title');
//        await eyes.checkWindow('Window');
//
//        await eyes.close(false);
//
//     } finally {
//
//         await browser.end();
//         await eyes.abortIfNotClosed();
//
//     }
//
// }
//
// main();


async function main() {
  const webdriverio = require('webdriverio');



  const client = webdriverio.remote({
      port: 4723,
      desiredCapabilities: {
         platformName: 'iOS',
         deviceName: 'iPhone 7',
         // app: 'https://store.applitools.com/download/iOS.TestApp.app.zip',
         bundleId: "com.apple.Preferences",
         platformVersion: '10.3',
         browserName: ''

      }
  });

  // const driver = webdriverio.remote(browserOptions);
  let browser = client.init();

  // Initialize the eyes SDK and set your private API key.
  const {Eyes, Target} = require('@applitools/eyes.webdriverio');
  let eyes = new Eyes();
  eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
  eyes.setScaleRatio(0.5);

  try {

      // Start the test and set the browser's viewport size to 800x600.
      await eyes.open(browser, 'Hello World!', 'My first WebdriverIO test!');

      // Visual checkpoint #1.
      await eyes.check('Main Page', Target.window());
      // End the test.
      await eyes.close();

  } finally {

      // Close the browser.
      await browser.end();

      // If the test was aborted before eyes.close was called ends the test as aborted.
      await eyes.abortIfNotClosed();

  }
}
  
main();