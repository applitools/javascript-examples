import { global } from '../pages/Global';
const { Target, By, MatchLevel } = require('@applitools/eyes-webdriverio');
import { assert } from 'chai';
import { debug } from 'console';
const eyes = global.myEyes(false);

describe('GitHub', async () => {
    
    before(async function() {
        if (browser.config.capabilities.browserName === "MicrosoftEdge") {
            eyes.setHostApp('Edge 84.0');
        }
    });

    beforeEach(async function () {
        var testName = this.currentTest.title;
        await eyes.open(browser, "github.com", testName, { width: 1400, height: 800 });
    });

    it('Check Region in Viewable Viewport', async () => {
        eyes.setForceFullPageScreenshot(false);
        await browser.url('https://www.github.com');
        await eyes.check('Check Region', Target.region(By.css("a.mr-4")).fully(false));
    });

    it('Github Home Page', async () => {
        await browser.url('https://www.github.com');
        await global.lazyLoadPage();
        //await eyes.check('Home Page', Target.window().ignoreRegion(By.css("a.mr-4")).ignoreRegion(By.css("body > div.application-main > main > div.py-6.py-sm-8.jumbotron-codelines > div > div > div.mx-auto.col-sm-8.col-md-6.hide-sm")).fully(false));
        //await eyes.check('Home Page', Target.window().ignoreRegions(By.css("a.mr-4"), By.css("body > div.application-main > main > div.py-6.py-sm-8.jumbotron-codelines > div > div > div.mx-auto.col-sm-8.col-md-6.hide-sm")).fully(false));
        await eyes.check('Entire Page', Target.window().useDom(true).enablePatterns(true).matchLevel(MatchLevel.Layout).fully(true));

        //await eyes.check('Check Region', Target.region(By.css("div.container-lg.p-responsive.position-relative")).fully(true))
    });

    it('Sign Up Page', async () => {
        await browser.url('https://www.github.com/join');
        await global.lazyLoadPage();
        await eyes.check('Sign Up Page', Target.window().fully(true).ignoreDisplacements(true));
    });

    afterEach(async function () {
        try {
            await eyes.close(false)
            .then(function (results) {
                console.log("My Results: " + results);
                //assert.equal(results._status, 'Passed');
            });
        } finally {
            await eyes.abort();
        }
        
    });

    after(async function () {
        await eyes.getRunner().getAllTestResults(false);
    });
});