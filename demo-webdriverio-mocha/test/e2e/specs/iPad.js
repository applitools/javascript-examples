import { global } from '../pages/Global';
const { Target, By, MatchLevel, StitchMode } = require('@applitools/eyes-webdriverio');
import { assert } from 'chai';
const eyes = global.myEyes();
const appName = "fruitCompany.com"
var testName = String;
var viewport = { width: 1400, height: 1000 };

describe('/ipad', async () => {
    
    before(async function() {
        await browser.url('https://www.apple.com/ipad/');
        //Lazy load page to load all dynamic content.
        await global.lazyLoadPage();
    });

    beforeEach(async function () {
        testName = this.currentTest.title;
    });

    it('iPad Search Dialog Region', async () => {
        const searchButton = await $('#ac-gn-link-search')
        await searchButton.click();
        await eyes.open(browser, appName, testName, viewport);
        await eyes.check('Check Search', Target.region(By.id('ac-gn-searchresults')).fully(false));
    });

    it('iPad Search Dialog with Background', async () => {
        const searchButton = await $('#ac-gn-link-search')
        await searchButton.click();
        await eyes.open(browser, appName, testName, viewport);
        //You will need to manually apply a ignore region around this dialog.
        await eyes.check('Check Search', Target.window().fully(false));
    });

    it('iPad Full Page Screenshot', async () => {
        //set stitchMode to CSS so Toolbar is not duplicated.
        eyes.setStitchMode(StitchMode.CSS);
        await eyes.open(browser, appName, testName, viewport);
        await eyes.check('Entire Page', Target.window().fully(true));
    });

    afterEach(async function () {

        try {
            const closeSearch = await $('#ac-gn-searchview-close')
            await closeSearch.click();
        } catch(err) {
            console.log("Error: " + err);
        }

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