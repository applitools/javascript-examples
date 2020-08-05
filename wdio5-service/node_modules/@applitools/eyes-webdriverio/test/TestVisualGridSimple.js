'use strict';

const chromedriver = require('chromedriver');
const {remote} = require('webdriverio');
const {equal} = require('assert');
const {Eyes, Target, VisualGridRunner, BrowserType, Configuration, Region, BatchInfo, CorsIframeHandle} = require('../index');

const Common = require('./Common');

let browser;

describe('VisualGridSimple', function () {
  this.timeout(5 * 60 * 1000);

  before(async function () {
    await chromedriver.start(undefined, true);
  });

  beforeEach(async () => {
    const chrome = Common.CHROME;
    browser = await remote({...chrome, port: 9515, path: '/', logLevel: 'error'});
  });

  afterEach(async () => {
    await browser.deleteSession();
  });

  after(async function () {
    chromedriver.stop();
    await new Promise(res => setTimeout(res, 2000))
  });

  it('VisualGridTestPage', async function () {
    await browser.url('https://applitools.github.io/demo/TestPages/VisualGridTestPage');

    const eyes = new Eyes(new VisualGridRunner(3));
    eyes.setBatch(new BatchInfo('EyesRenderingBatch_WDIO'));
    eyes.setCorsIframeHandle(CorsIframeHandle.BLANK);

    const configuration = new Configuration();
    configuration.setTestName('Open Concurrency with Batch 2');
    configuration.setAppName('RenderingGridIntegration');
    configuration.setApiKey(process.env.APPLITOOLS_API_KEY);
    eyes.setConfiguration(configuration);
    await eyes.open(browser);

    await eyes.check('window', Target.window().ignoreRegions(new Region(200, 200, 50, 100)));

    await eyes.check('region', Target.region(new Region(200, 200, 50, 100)));

    await eyes.check('selector', Target.region('#scroll1'));

    await eyes.getRunner().getAllTestResults();
  });

});
