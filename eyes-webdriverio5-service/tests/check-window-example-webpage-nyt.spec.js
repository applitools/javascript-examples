'use strict';

const {By, Target} = require('@applitools/eyes-webdriverio');

describe('EyesServiceTest', () => {

  beforeEach(() => {
    browser.url('https://www.nytimes.com/');
  });

  it('checkWindow',  () => {
     browser.eyesSetScrollRootElement(By.tagName('body'));
     browser.eyesCheck('Homepage', Target.window().fully(true));
     browser.eyesCheck('Body', Target.region(By.css('body')).fully(true));
  });

});
