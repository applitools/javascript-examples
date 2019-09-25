import { global } from '../pages/Global';
const { Target, By, MatchLevel, StitchMode } = require('@applitools/eyes-webdriverio');
import { assert } from 'chai';
const eyes = global.myEyes();
const appName = "fruitCompany.com"
var testName = String;
var viewport = { width: 1400, height: 1000 };

describe('/iphone-xr', async () => {
    
    before(async function() {
        await browser.url('https://www.apple.com/iphone-xr');
        //Lazy load page to load all dynamic content.
        await global.lazyLoadPage();
    });

    beforeEach(async function () {
        testName = this.currentTest.title;
    });

    it('iPhone XR Page Header', async () => {
        await eyes.open(browser, appName, testName, viewport);
        await eyes.check('Check Header', Target.window().fully(false));
    });

    it('iPhone XR Page Footer', async () => {
        await eyes.open(browser, appName, testName, viewport);
        
        //Scroll to the bottom...
        await browser.execute("window.scrollTo(0, document.documentElement.scrollHeight)");
        
        await eyes.check('Check Footer', Target.region(By.id("ac-globalfooter")).fully(false));
    });

    it('iPhone XR Full Page Screenshot', async () => {
        //remove sticky menu if you want...
        //await browser.execute("document.getElementById('ac-localnav').setAttribute('style', 'display:none')")
        
        //set stitchMode to CSS so Toolbar is not duplicated.
        eyes.setStitchMode(StitchMode.CSS);
        
        //Pause between screenshot captures to give dynamic content more time to load...
        eyes.setWaitBeforeScreenshots(500);
        
        await eyes.open(browser, appName, testName, viewport);
        await eyes.check('Entire Page', Target.window().fully(true));
    });

    afterEach(async function () {
        await eyes.close(false)
        .then(function (results) {
            console.log("My Results: " + results);
            assert.equal(results._status, 'Passed');
        });
    });

    after(async function () {
        await eyes.abortIfNotClosed()
    });
});