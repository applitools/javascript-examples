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
     eyes.addProperty("Spec", "Spec2");
   });
   
   afterEach(function() {
     eyes.abortIfNotClosed();
   });
      
  it('should validate quicksilver page 2', function(done) {
     
     browser.get('https://www.capitalone.com/credit-cards/quicksilver/');
     
     eyes.open(browser, 'Protractor Test 2', 'Quicksilver Landing Page 2', {width: 1200, height: 800});

     eyes.check("Full Page", Target.window().ignore(by.css("div.container")));

     eyes.close(false).then(function (results) {
        //console.log("My Test Results: " + results);
        expect(results.status).toEqual('Passed');
        done();
     });
  });
});
