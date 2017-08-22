var assert = require('assert'),
    webdriver = require('selenium-webdriver'),
    makeSuite = require('../util/helpers').makeSuite;

makeSuite('Hello World', function() {
   
  after(function() {
    eyes.abortIfNotClosed();
  });
  
  it('Should Visually Validate Application', function(done) {
    // Start the test and set the browser's viewport size to 800x600.
    eyes.open(driver, 'Hello World!!!', 'My first Javascript test!', {width: 800, height: 600})

    // Navigate the browser to the "hello world!" web-site.
    driver.get('http://applitools.com/helloworld')
    
    // Visual checkpoint #1.
    eyes.checkWindow('Main Page');

    // Click the "Click me!" button.
    driver.findElement(webdriver.By.tagName('button')).click();

    // Visual checkpoint #2.
    eyes.checkWindow('Click!!!');
    
    //Close Eyes
    eyes.close(false).then(function(results) {
      //assert.equal(results, "assert your values here");
      done();
    });
  });
});