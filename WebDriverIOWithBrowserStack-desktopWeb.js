async function main() {
    const webdriverio = require('webdriverio');
    var ConsoleLogHandler = require('eyes.selenium').ConsoleLogHandler;

    var bsUser = process.env.BS_USER || "yourUser";
    var bsKey = process.env.BS_KEY || "yourKey";
    var applitoolsKey = process.env.APPLITOOLS_API_KEY || "yourApplitoolsKey";
    
    var options = {
      user: bsUser,
      key: bsKey,

      seleniumHost: 'hub-cloud.browserstack.com',
      seleniumPort: 80,
      
      desiredCapabilities: {
         browser: 'Chrome',
         os_version: '10',
         os: 'Windows',
         browser_version: '66.0',
         'browserstack.local': 'false',
      }
    }
   
    const driver = webdriverio.remote(options);
    let browser = driver.init();

    const {Eyes, Target} = require('@applitools/eyes.webdriverio');
    let eyes = new Eyes();
    eyes.setApiKey(applitoolsKey);
    eyes.setLogHandler(new ConsoleLogHandler(true));

    await browser
       .timeouts('script', 60000)
       .url('https://applitools.com/helloworld')
       .waitForExist('body > div > div.section.button-section', 60000);
    
    try {
       
       // Start the test and set the browser's viewport size to 800x600.
       await eyes.open(browser, 'Hello World!', 'My first WebdriverIO test!', {width: 800, height: 600});

       // Navigate the browser to the "hello world!" web-site.
       await browser.url('https://applitools.com/helloworld');

       // Visual checkpoint #1.
       await eyes.check('Main Page', Target.window());

       // Click the "Click me!" button.
       await browser.click('button');

       // Visual checkpoint #2.
       await eyes.check('Click!', Target.window());

       // End the test.
       await eyes.close();

    } finally {

        await browser.end();
        await eyes.abortIfNotClosed();

    }

}

main();
