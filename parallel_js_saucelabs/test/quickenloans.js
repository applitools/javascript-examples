var assert = require('assert'),
    webdriver = require('selenium-webdriver'),
    makeSuite = require('../util/helpers').makeSuite;

makeSuite('Quicken Loans', function() {

  after(function() {
    eyes.abortIfNotClosed();
  });

  it('Should Visually Validate Application', function(done) {
    eyes.setForceFullPageScreenshot(true);
    eyes.setStitchMode(Eyes.StitchMode.CSS);

    // Start the test and set the browser's viewport size to 800x600.
    eyes.open(driver, 'Quicken Loans', 'Test on Sauce Labs', { width: 800, height: 600 })

    // Navigate the browser to the "hello world!" web-site.
    driver.get('https://www.quickenloans.com/')

    //let el1 = driver.findElement(webdriver.By.id('need_close'));
    //driver.wait(webdriver.until.elementIsVisible(el1),3000);

    //driver.findElement(webdriver.By.id('need_close')).click();

    // Visual checkpoint #1.
    eyes.checkWindow('Home Page');

    // Click the "Click me!" button.
    driver.findElement(webdriver.By.tagName('a.sls-c-Button.c-Button--large.c-Button--inline.b-Link--inverse')).click();

    // let el2 = driver.findElement(webdriver.By.css('a.btn.space-trailer-none'));
    // driver.wait(webdriver.until.elementIsVisible(el2),3000);

    // Visual checkpoint #2.
    eyes.checkWindow('Home Loans');

    //Close Eyes
    eyes.close(false).then(function(results) {
      //assert.equal(results, "assert your values here");
      done();
    });
  });
});
