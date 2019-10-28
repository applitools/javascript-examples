//https://github.com/applitools/Eyes.Selenium.JavaScript/blob/master/test/protractor/check-interface-test.js

const {Builder, By, until} = require('selenium-webdriver');

const {ConsoleLogHandler, Target, MatchLevel, StitchMode} = require('eyes.selenium');
var Eyes = require('eyes.selenium').Eyes;
var eyes = new Eyes();

const batchInfo = 'C1 Credit Card';

describe('Capital One', function() {
   
   beforeAll(function() {
     jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
     browser.ignoreSynchronization = true;

     eyes.setLogHandler(new ConsoleLogHandler(true));
     eyes.setApiKey(process.env.APPLITOOLS_KEY);
     eyes.setForceFullPageScreenshot(true);
     eyes.setStitchMode(StitchMode.CSS);
     console.log("My Batch ID: " + batchId)
     eyes.setBatch({id: batchId, name: batchInfo});
     
     eyes.addProperty("Spec", "Spec1");
   });
   

   afterEach(function() {
     eyes.abortIfNotClosed();
   });
      
  it('should validate quicksilver page', function(done) {
    
     browser.get('https://www.capitalone.com/credit-cards/quicksilver/');
           
     var jsWidget = 'div.usabilla_live_button_container';
     
     browser.wait(protractor.ExpectedConditions.presenceOf(element(by.css(jsWidget))), 5000, 'Element Not Found...');
     //remove js widget
     browser.driver.executeScript("document.querySelector('div.usabilla_live_button_container').setAttribute('style', 'display:none');");
    
     eyes.setForceFullPageScreenshot(false);

     eyes.open(browser, 'Protractor Test', 'Quicksilver Landing Page', {width: 1200, height: 800});

     eyes.check("Quick Silver Page", Target.window().ignore(by.css("div.container")));
          
     eyes.check("Card Area", Target.region(by.css("div.container")).matchLevel(MatchLevel.Layout));
     
     eyes.close(false).then(function (results) {
        //console.log("My Test Results: " + results);
        expect(results.status).toEqual('Passed');
        done();
     });
  });
  
  it('should validate apply now page', function(done) {
     
     browser.get('https://applynow.capitalone.com/?productId=5133');
               
     eyes.open(browser, 'Protractor Test', 'Apply Now Page', {width: 1200, height: 800});

     eyes.check("Apply Now Page", Target.window());
          
     eyes.close(false).then(function (results) {
        expect(results.status).toEqual('Passed');
        done();
     });
  });
});
