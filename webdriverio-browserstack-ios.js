async function main() {
    const webdriverio = require('webdriverio');
    
    var bsUser = process.env.BS_USER || "justinison8";
    var bsKey = process.env.BS_KEY || "5qyqVytms3N1p4Dxew51";
    var applitoolsKey = process.env.APPLITOOLS_API_KEY || "yourApplitoolsKey";
    
    var options = {
      user: bsUser,
      key: bsKey,

      seleniumHost: 'hub-cloud.browserstack.com',
      seleniumPort: 443,
      
      desiredCapabilities: {
         'os_version' : '11.0',
         'device' : 'iPhone X',
         'real_mobile' : 'true',
         'browserstack.local' : 'false',
         'browser' : 'safari'
      }
    }
   
    const driver = webdriverio.remote(options);
    let browser = driver.init();
    
    const {ConsoleLogHandler, BatchInfo} = require('@applitools/eyes.sdk.core');
    const {By, Eyes, Target, StitchMode} = require('@applitools/eyes.webdriverio');
    
    let eyes = new Eyes();
    eyes.setApiKey(applitoolsKey);
    eyes.setLogHandler(new ConsoleLogHandler(true));
    eyes.setStitchMode(StitchMode.SCROLL);
    //eyes.getIsCutProviderExplicitlySet
    //eyes.setLogHandler(new ConsoleLogHandler(true));

    await browser
       .timeouts('script', 60000)
       .url('https://applitools.com/helloworld')
       .waitForExist('body > div > div.section.button-section', 60000);
    
    try {
       
       // Start the test and set the browser's viewport size to 800x600.
       await eyes.open(browser, 'Hello World!', 'My first WebdriverIO iOS test!');
       
       //await eyes.setImageCut(new FixedCutProvider(135, 63, 0, 0));
       
       //await eyes.check('Main Page', Target.window());
       
       //await eyes.check("Page", Target.region(By.cssSelector('body')).fully);
       await eyes.checkWindow('Window');

       await eyes.close();

    } finally {

        await browser.end();
        await eyes.abortIfNotClosed();

    }

}

main();
