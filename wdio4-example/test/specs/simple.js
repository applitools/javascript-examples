'use strict';
// example of a test group
// note: all tests under the test directory are ran

const {Eyes, VisualGridRunner, Target, ConsoleLogHandler, Configuration, BrowserType, DeviceName, ScreenOrientation, BatchInfo} = require('@applitools/eyes.webdriverio');
const {Builder, By, until} = require('selenium-webdriver');
const runner = new VisualGridRunner(8)
const eyes = new Eyes(runner);

import pry from 'pryjs'

describe('webdriver.io page', async ()=> {

    it('WDIO Example', async ()=> {
        
        const configuration = new Configuration();
        configuration.setAppName('WDIO4 VG Examples');
        configuration.setTestName('Webdriverio');
        configuration.setBatch(new BatchInfo("WDIO4"));
        configuration.addBrowser(800, 600, BrowserType.CHROME);
        configuration.addBrowser(700, 500, BrowserType.CHROME);
        configuration.addBrowser(1200, 800, BrowserType.FIREFOX);
        configuration.addBrowser(1600, 1200, BrowserType.FIREFOX);
        configuration.addDeviceEmulation(DeviceName.iPhone_4, ScreenOrientation.PORTRAIT);
        eyes.setConfiguration(configuration);
        
        await eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
        await eyes.setLogHandler(new ConsoleLogHandler(true));

        await browser.url('/')
 
        await eyes.open(browser);
       
        //Use pryjs to set a breakpoint and enter into the node console.
        //await eval(pry.it)
       
        await eyes.check('WDIO Page', Target.window().layoutRegions(By.css('myCss')));
        await eyes.closeAsync();
    });

    after(async () => {
        const results = await runner.getAllTestResults(false);
        console.log(results); // eslint-disable-line
        await eyes.abort();
    });
});