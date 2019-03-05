'use strict';

var expect = require('chai').expect;
    
require('chromedriver');

const {Builder, By, until} = require('selenium-webdriver');

var SeleniumSDK = require('@applitools/eyes-selenium');
const {ConsoleLogHandler, BatchInfo, TestResults} = require('@applitools/eyes.sdk.core');
var Eyes = SeleniumSDK.Eyes;

var driver = null, eyes = null;
describe('Eyes.Selenium.JavaScript - Selenium', function () {
        
    this.timeout(5 * 60 * 1000);

    before(function () {
       driver = new Builder()
       .forBrowser('chrome')
       .build();
      
       eyes = new Eyes();
       eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
       eyes.setLogHandler(new ConsoleLogHandler(true));
       //eyes.getLogHandler().setPrintSessionId(true);      
    });

    beforeEach(async function () {
        var appName = this.test.parent.title;
        var testName = this.currentTest.title;

        return eyes.open(driver, appName, testName, {width: 800, height: 600}).then(function (browser) {
            driver = browser;
        });
    });

    it("Hello World", async function () {
       
        // Navigate the browser to the "hello world!" web-site.
        await driver.get('https://applitools.com/helloworld');

        // Visual checkpoint #1.
        await eyes.checkWindow('Main Page');

        await eyes.checkElementBy(By.css("div.section"), null, "Hello World Image");

        // Click the "Click me!" button.
        await driver.findElement(By.tagName('button')).click();

        // Visual checkpoint #2.
        await eyes.checkWindow('Click!');

        await eyes.close(false).then(function (results) {
           console.log("My Test Results: " + results);
           expect(results._status).to.equal('Passed');
        });
    });

    afterEach(async function () {
        return driver.quit().then(function () {
            return eyes.abortIfNotClosed();
        });
    });
});

// const assert = require('assert');
// TestResultsStatus
// const results = await eyes.close(false);
// assert.strictEqual(results.getStatus(), TestResultsStatus.Unresolved);