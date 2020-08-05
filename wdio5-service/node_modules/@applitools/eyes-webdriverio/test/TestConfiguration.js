'use strict';

const chromedriver = require('chromedriver');
const {remote} = require('webdriverio');
const {deepEqual} = require('assert');
const {Eyes, Configuration} = require('../index');

const Common = require('./Common');

let browser;

describe('Configuration', function () {
  this.timeout(5 * 60 * 1000);

  before(async function () {
    chromedriver.start();
  });

  beforeEach(async () => {
    const chrome = Common.CHROME;
    browser = await remote(chrome);
  });

  afterEach(async () => {
    await browser.deleteSession();
  });

  after(async function () {
    chromedriver.stop();
  });

  it('Viewport size', async function () {
    const eyes = new Eyes();

    const configuration = new Configuration();
    configuration.setTestName('Configuration');
    configuration.setAppName('Test Configuration');
    const viewportSize = {width: 500, height: 400};
    configuration.setViewportSize(viewportSize);
    eyes.setConfiguration(configuration);
    await eyes.open(browser);

    const actualViewportSize = eyes.getConfiguration().getViewportSize();

    deepEqual(viewportSize, actualViewportSize.toJSON());
  });

});
