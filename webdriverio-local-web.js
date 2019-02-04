//Install npm package: npm install '@applitools/eyes.webdriverio' --save-dev
//Start selenium server
//Run: node webdriverio.js

async function main() {
    const webdriverio = require('webdriverio');

    //Open a Chrome browser.
    const browserOptions = {
        remoteHost: "http://localhost:4444",
        desiredCapabilities: {
            browserName: 'chrome',
            chromeOptions: {
                args: [
                    'disable-infobars',
                ]
            }
        }
    };
    
    const driver = webdriverio.remote(browserOptions);
    let browser = driver.init();

    // Initialize the eyes SDK and set your private API key.
    const {ConsoleLogHandler, BatchInfo} = require('@applitools/eyes.sdk.core');
    const {By, Eyes, Target, StitchMode} = require('@applitools/eyes.webdriverio');
    
    let eyes = new Eyes();
    eyes.setLogHandler(new ConsoleLogHandler(true));
    eyes.setForceFullPageScreenshot(true);
    eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
    

    try {

        // Start the test and set the browser's viewport size to 800x600.
        await eyes.open(browser, 'Hello World!', 'My first Javascript test!', {width: 800, height: 600});

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

        // Close the browser.
        await browser.end();

        // If the test was aborted before eyes.close was called ends the test as aborted.
        await eyes.abortIfNotClosed();

    }

}

main();