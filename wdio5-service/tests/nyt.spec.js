'use strict';

const {By, Target} = require('@applitools/eyes-webdriverio');

describe('EyesServiceTest233', async () => {

  beforeEach( () => {
     browser.url('https://cooking.nytimes.com/');
    browser.pause(60000);
  });

  it('checkWindow',  () => {
     //browser.eyesSetScrollRootElement(By.tagName('body'));
     browser.eyesCheck('nav bar', Target.region(By.css('div.nytc---sitenav---siteNavWrap'))
      .layoutRegions(By.css('#siteNavMount > div > div.nytc---sitenav---siteNav > div > div.nytc---sitenav---siteNavBtns > a.nytc---navbtn---desktop-link-child.nytc---navbtn---navLabel.nytc---navbtn---hide-tablet')).fully(false));
  });
  
});