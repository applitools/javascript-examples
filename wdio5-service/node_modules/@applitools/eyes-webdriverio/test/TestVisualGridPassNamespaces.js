'use strict';

const chromedriver = require('chromedriver');
const {remote} = require('webdriverio');
const {BatchInfo, Region, CorsIframeHandle} = require('@applitools/eyes-sdk-core');
const {Eyes, Target, VisualGridRunner, BrowserType, Configuration} = require('../index');

const Common = require('./Common');

let browser;


describe.skip('VisualGridSimple', function () {
  this.timeout(5 * 60 * 1000);

  before(async function () {
    await chromedriver.start(undefined, true);
  });

  beforeEach(async function () {
    const chrome = Common.CHROME;
    browser = await remote(chrome);
  });

  after(async function () {
    chromedriver.stop();
    await new Promise(res => setTimeout(res, 2000))
  });

  it('VisualGridTestPage', async function () {
    await browser.url('https://www.cigna.com/individuals-families/');

    const eyes = new Eyes(new VisualGridRunner(3));
    eyes.setBatch(new BatchInfo('EyesRenderingBatch_WDIO'));
    eyes.setCorsIframeHandle(CorsIframeHandle.BLANK);

    const configuration = new Configuration();
    configuration.setTestName('Open Concurrency with Batch 2');
    configuration.setAppName('RenderingGridIntegration');
    configuration.addBrowser(800, 600, BrowserType.CHROME);
    configuration.addBrowser(800, 600, BrowserType.FIREFOX);
    configuration.addBrowser(800, 600, BrowserType.IE_11);

    eyes.setConfiguration(configuration);
    await eyes.open(browser);

    await eyes.check('window', Target.window().ignoreRegions(new Region(200, 200, 50, 100)));

    await eyes.check('region', Target.region(new Region(200, 200, 50, 100)));

    await eyes.check('selector', Target.region('#scroll1'));

    await eyes.getRunner().getAllTestResults(false);

    await browser.deleteSession();
  });

});
