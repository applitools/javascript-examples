//https://github.com/applitools/Eyes.Selenium.JavaScript/blob/master/test/protractor/check-interface-test.js

//const {Builder, By, until} = require('selenium-webdriver');

const {ConsoleLogHandler, Target, MatchLevel, StitchMode, By} = require('eyes.selenium');
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

     browser.get('https://www.capitalone.com/credit-cards/journey-student/');
   });
   
   afterEach(function() {
     eyes.abortIfNotClosed();
   });
      
  it('Journey Student', function(done) {
    
    eyes.open(browser, 'credit-card', 'journey-student-region', {width: 1400, height: 800})
    eyes.setViewportSize({width: 1400, height: 800});

    var benefits = element(by.css('cs-benefits-container .benefits'));
    eyes.check("By Element", Target.region(benefits));
    //or
    eyes.check("By Selector", Target.region(by.css('cs-benefits-container .benefits')));

    eyes.close(false).then(function (results) {
       expect(results.status).toEqual('Passed');
       done();
    });
  });
});

    //  return eyes.open(browser, 'credit-card', 'journey-student-region', {width: 1400, height: 800})
    //   .then(function (browser) {
    //     driver = browser;
    //  });

     //eyes.open(browser, 'credit-card', 'journey-student', {width: 1400, height: 800});
     //eyes.setViewportSize({width: 1400, height: 800});

    //  var until = protractor.ExpectedConditions;
     
    //  var avgLink = element(by.linkText('AVERAGE'));
    //  browser.wait(until.presenceOf(avgLink), 20000, 'Link Not Found...');
    //  avgLink.click();
     
    //  //var modal = element(by.css('div.modal-dialog'));
    //  //browser.wait(until.presenceOf(modal), 20000, 'Modal Not Found...');
     
    //  eyes.check("Model By CSS", Target.region(By.css('div.modal-dialog')));
     
    //  var m = $('div.modal-dialog');
    //  //var protractorSelector = $('body > div.modal.fade.ng-scope > div');