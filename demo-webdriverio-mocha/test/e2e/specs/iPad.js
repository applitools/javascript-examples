import { global } from '../pages/Global';
const { Target, By, MatchLevel, StitchMode } = require('@applitools/eyes-webdriverio');
const {FloatingMatchSettings, Region} = require('@applitools/eyes-sdk-core');
import { assert } from 'chai';
const eyes = global.myEyes();
const appName = "fruitCompany.com"
var testName = String;
var viewport = { width: 1400, height: 1000 };

describe('/ipad', async () => {
    
    before(async function() {
        await browser.url('https://www.apple.com/ipad/');
        //Lazy load page to load all dynamic content.
        //await global.lazyLoadPage();
    });

    beforeEach(async function () {
        testName = this.currentTest.title;
    });

    it('iPad Search Dialog Region', async () => {
        const searchButton = await $('#ac-gn-link-search')
        await searchButton.click();
        await eyes.open(browser, appName, testName, viewport);
        await eyes.check('Check Search', Target.region(By.id('ac-gn-searchresults')));
    });

    it('iPad Search Dialog with Background2', async () => {
        const searchButton = await $('#ac-gn-link-search');
        await searchButton.click();
        await eyes.open(browser, appName, testName, viewport);
        
        //Ignore everything underneith dialog
        var navBarHeight = await browser.execute("return document.getElementById('ac-globalnav').clientHeight")
        var searchDialogHeight = await browser.execute("return document.getElementById('ac-gn-searchresults').clientHeight")
        var pageHeight = await browser.execute("return document.body.clientHeight");
        var startIgnore = (searchDialogHeight + navBarHeight)
        var height = (pageHeight - searchDialogHeight - navBarHeight)

        //Ignore everything left and right sides next to dialog
        var pageWidth = await browser.execute("return document.body.clientWidth");
        var searchDialogWidth = await browser.execute("return document.getElementById('ac-gn-searchresults').clientWidth")
        var sideWidth = Math.trunc((pageWidth - searchDialogWidth) / 2)
        var sideHeight = searchDialogHeight
        var rside = Math.trunc((pageWidth + searchDialogWidth) / 2)

        await eyes.check('Check Search', Target.window()
            .ignoreRegions(new Region({left: 0, top: startIgnore, width: viewport.width, height: height}))
            .ignoreRegions(new Region({left: 0, top: navBarHeight, width: sideWidth, height: sideHeight}))
            .ignoreRegions(new Region({left: rside, top: navBarHeight, width: sideWidth, height: sideHeight}))
        )
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