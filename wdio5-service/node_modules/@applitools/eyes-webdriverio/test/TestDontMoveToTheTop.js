'use strict';

const chromedriver = require('chromedriver');
const {remote} = require('webdriverio');
const {equal} = require('assert');
const {Eyes, Target, StitchMode, MatchLevel} = require('../index');

const Common = require('./Common');

let browser;

describe('DontMoveToTheTop', function () {
  this.timeout(5 * 60 * 1000);

  before(async function () {
    chromedriver.start();
  });

  beforeEach(async () => {
    const caps = Common.CHROME;
    browser = await remote({
        capabilities: {
          browserName: 'chrome',
          'goog:chromeOptions': {
            args: [
              '--disable-infobars',
            ]
          }
        }
      }
    );
  });

  afterEach(async () => {
    await browser.deleteSession();
  });

  after(async function () {
    chromedriver.stop();
  });

  it('CheckWindow', async function () {
    await browser.url('https://www.localize.city/listings/l-muhi001vjvki?dealType=sale&term=new-york-ny&tracking_event_source=list&tracking_list_index=0');

    const eyes = new Eyes();
    eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
    eyes.setForceFullPageScreenshot(false);
    eyes.setHideScrollbars(true);
    eyes.setSendDom(false);

    await eyes.open(browser, this.test.parent.title, this.test.title);

    const tr = await browser.$('div=transportation');
    await tr.click();

    await eyes.check('window', Target.window());

    const result = await eyes.close(false);

    equal(result.isPassed(), true);
  });

});
