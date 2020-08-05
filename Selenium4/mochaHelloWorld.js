'use strict';

var expect = require('chai').expect;
require('chromedriver');
const {Builder, By, until} = require('selenium-webdriver');
const { Region, TestResults } = require('@applitools/eyes-sdk-core');
const { Eyes, Target, ConsoleLogHandler, Logger, FileLogHandler, BatchInfo } = require('@applitools/eyes-selenium');
var driver = null, eyes = null;
var logger = new Logger();
var path = require('path');

describe('Eyes.Selenium.JavaScript - Selenium', function () {
        
    this.timeout(5 * 60 * 1000);

    before(function () {
       driver = new Builder().forBrowser('chrome').build();
       eyes = new Eyes();
       eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
       //eyes.setLogHandler(new ConsoleLogHandler(true));
       //const logsPath = './';
       eyes.setLogHandler(new FileLogHandler(true, path.join(logsPath, 'log.log')));
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
        
        var element = driver.findElement(By.id("myId"));
        await eyes.check("MyTag", Target.region(By.id("myId")).ignoreRegions(By.css("css")));

        await eyes.checkElementBy(By.css("div.section"), null, "Hello World Image");

        // Click the "Click me!" button.
        await driver.findElement(By.tagName('button')).click();

        // Visual checkpoint #2.
        await eyes.checkWindow('Click!');

        await eyes.check('Click!', Target.window().ignoreDisplacements());

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