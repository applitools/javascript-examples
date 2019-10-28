'use strict';

const {By, Target} = require('@applitools/eyes-webdriverio');

describe('EyesServiceNytTest', () => {

  beforeEach(() => {
    browser.url('https://www.nytimes.com/');
  });

  it('checkWindow', async () => {
    await browser.eyesSetScrollRootElement(By.tagName('body'));

    await browser.eyesCheckWindow('Homepage');
  });

  it('checkRegion', async () => {
    await browser.eyesCheck('Footer links', Target.region(By.id('site-index')).fully());
  });

});
