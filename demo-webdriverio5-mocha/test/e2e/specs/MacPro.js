import { global } from '../pages/Global';
const { Target, By, MatchLevel, StitchMode } = require('@applitools/eyes-webdriverio');
import { assert } from 'chai';
const eyes = global.myEyes();
const appName = "fruitCompany.com"
var testName = String;
var viewport = { width: 1400, height: 1000 };

describe('/mac-pro', async () => {
    
    before(async function() {
        await browser.url('https://www.apple.com/mac-pro/');
        //Lazy load page to load all dynamic content.
        await global.lazyLoadPage();
    });

    beforeEach(async function () {
        testName = this.currentTest.title;
    });

    it('MacPro Page Header', async () => {
        eyes.setForceFullPageScreenshot(false);
        eyes.setStitchMode(StitchMode.CSS);
        await eyes.open(browser, appName, testName, viewport);
        await eyes.check('Check Footer', Target.window().fully(false));
    });

    it('MacPro Page Footer', async () => {
        eyes.setForceFullPageScreenshot(true);
        eyes.setStitchMode(StitchMode.CSS);
        await eyes.open(browser, appName, testName, viewport);
        await browser.execute("window.scrollTo(0, document.documentElement.scrollHeight)");
        await eyes.check('Check Footer', Target.region(By.className("ac-gf-content")));
    });

    it('MacPro Full Page Screenshot', async () => {
        //remove sticky menu if you want...
        //await browser.execute("document.getElementById('ac-localnav').setAttribute('style', 'display:none')")
        eyes.setForceFullPageScreenshot(true);
        eyes.setStitchMode(StitchMode.CSS);
        eyes.setWaitBeforeScreenshots(500);
        await eyes.open(browser, appName, testName, viewport);
        await eyes.check('Entire Page', Target.window().fully(true));
    });

    afterEach(async function () {
        await eyes.close(false)
        .then(function (results) {
            console.log("My Results: " + results);
            //assert.equal(results._status, 'Passed');
        });
    });

    after(async function () {
        await eyes.abortIfNotClosed()
    });
});