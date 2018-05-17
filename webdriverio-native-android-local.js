//Install npm package: npm install '@applitools/eyes.webdriverio' --save-dev
//Start appium server
//Run: node webdriverio-native-android.js

async function main() {
    const webdriverio = require('webdriverio');
    var path = require('path');

    //Open a Chrome Android browser
    const client = webdriverio.remote({
        port: 4723,
        logLevel: 'verbose',
        desiredCapabilities: {
           platformName: 'Android',
           deviceName: 'android',
           app:  path.resolve(__dirname, 'app-debug.apk'),
           appPackage: 'com.amazonaws.devicefarm.android.referenceapp'
        }
    });
    
    let browser = client.init();

    const {Eyes, Target} = require('@applitools/eyes.webdriverio');
    let eyes = new Eyes();
    eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
    
    var ConsoleLogHandler = require('eyes.selenium').ConsoleLogHandler;
    eyes.setLogHandler(new ConsoleLogHandler(true));

    try {

        // Start the test and set the browser's viewport size to 800x600.
        await eyes.open(browser, 'Android Native', 'My First WebdriverIO Android Native Test!');

        // Visual checkpoint #1.
        await eyes.check('Home Page', Target.window());

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