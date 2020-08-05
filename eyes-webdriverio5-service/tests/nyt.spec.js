
'use strict';

/// <reference types="@applitools/eyes-webdriverio" />

const {By, Target} = require('@applitools/eyes-webdriverio');


describe('EyesServiceTest', () => {

  beforeEach(() => {
    browser.url('https://cooking.nytimes.com');
  });

  it('checkWindow',  () => {
    // browser.eyesCheck('see our features', Target.window()
    //         .layoutRegions(By.css('a.nytc---navbtn---desktop-link-child.nytc---navbtn---navLabel:first-of-type'))
    //         .ignoreRegions(By.css('.features-onboarding-top-video')));

    browser.eyesCheck('footer', Target.region(By.css("#footer")));

    //browser.eyesCheck('Footer', Target.region(By.id("footer")));
    ///This returns image not found...
    browser.eyesCheck('Footer', Target.region(By.id("footerrrrr")));

  });
  
});


//  browser.eyesSetScrollRootElement(By.tagName('body'));
//  browser.eyesCheck('Homepage', Target.window().layoutRegions.fully(true));
//  browser.eyesCheck('Body', Target.region(By.css('body')).fully(true));
//console.log("My CONFIG: " + browser.eyesGetConfiguration().toString());

//browser.eyesSetConfiguration({viewport: {width: 1200, height: 800}});
// browser.eyesCheck('see our features', Target.window().fully()
//   .layoutRegions(By.css('a.nytc---navbtn---desktop-link-child.nytc---navbtn---navLabel:first-of-type'))
//   .ignoreRegions(By.css('.features-onboarding-top-video')));
// browser.eyesCheck('nav bar', Target.region(By.css('.nytc---sitenav---siteNav'))
//   .layoutRegions(By.css('a.nytc---navbtn---desktop-link-child.nytc---navbtn---navLabel:first-of-type')));