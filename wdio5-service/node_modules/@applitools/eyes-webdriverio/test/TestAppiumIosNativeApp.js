'use strict';

const {remote} = require('webdriverio');
const {equal} = require('assert');
const {Eyes, Target, StitchMode, MatchLevel} = require('../index');

const Common = require('./Common');

let browser;

describe('TestIosNativeApp', function () {
  this.timeout(5 * 60 * 1000);

  before(async function () {
  });

  beforeEach(async () => {
    const caps = Common.MOBILE_IOS_NATIVE_APP;
    caps.capabilities.app = __dirname + '/resources/Demo Application.app';
    browser = await remote(caps);
  });

  afterEach(async () => {
    await browser.deleteSession();
  });

  after(async function () {
  });

  it('CheckWindow', async function () {
    const eyes = new Eyes();
    eyes.setApiKey(process.env.APPLITOOLS_API_KEY);

    await eyes.open(browser, this.test.parent.title, this.test.title);

    await eyes.check('window', Target.window());

    const result = await eyes.close(false);

    equal(result.isPassed(), true);
  });

});
