import { global } from '../pages/Global';
const { Target, By, MatchLevel } = require('@applitools/eyes-webdriverio');
import { assert } from 'chai';
const eyes = global.myEyes(false);

describe('GitHub', async () => {
    
    before(async function() {
        //await browser.url('/');
    });

    beforeEach(async function () {
        var testName = this.currentTest.title;
        await eyes.open(browser, "github.com", testName, { width: 1400, height: 800 });
    });

    it('Check Region in Viewable Viewport', async () => {
        eyes.setForceFullPageScreenshot(false);
        await browser.url('https://www.github.com');
        await eyes.check('Check Region', Target.region(By.css("a.mr-4")).fully(false))
    });

    it('Home Page', async () => {
        await browser.url('https://www.github.com');
        await global.lazyLoadPage();
        await eyes.check('Home Page', Target.window().fully(true));
        await eyes.check('Check Region', Target.region(By.css("div.container-lg.p-responsive.position-relative")).fully(true))
    });

    it('Sign Up Page', async () => {
        await browser.url('https://www.github.com/join');
        await global.lazyLoadPage();
        await eyes.check('Sign Up Page', Target.window().fully(true));
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