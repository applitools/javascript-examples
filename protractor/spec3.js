//https://github.com/applitools/Eyes.Selenium.JavaScript/blob/master/test/protractor/check-interface-test.js

const {Builder, By, until} = require('selenium-webdriver');
const {Eyes, ConsoleLogHandler, Target, MatchLevel, StitchMode} = require('eyes.selenium');
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
      
  it('issue 1 - cannot pass in array of elements or an object', async function(done) {
    await browser.get('https://www.capitalone.com/credit-cards/journey-student/');
    await eyes.open(browser, 'credit-card', 'journey-student-region')
    await eyes.setViewportSize({width: 1400, height: 800});
    await browser.sleep(10000);
    
    var array = await browser.findElements(by.css('div.showcase-headline'));
    await eyes.check("By Selector", Target.window().ignore(array).fully());
    
    await eyes.close(false).then(function (results) {
       done();
    });
  });

//issue above: 
// (node:91993) UnhandledPromiseRejectionWarning: Error: Unsupported ignore region type: object
//     at /Users/justin/repos/applitools/javascript-examples/protractor/node_modules/eyes.selenium/src/Eyes.js:270:21
//     at ManagedPromise.invokeCallback_ (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)
//     at TaskQueue.execute_ (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)
//     at TaskQueue.executeNext_ (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)
//     at asyncRun (/usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)
//     at /usr/local/lib/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7
//     at process._tickCallback (internal/process/next_tick.js:68:7)


  it('issue 2 - cutoff region', async function(done) {
    await browser.get('https://www.capitalone.com/credit-cards/journey-student/');
    await eyes.open(browser, 'credit-card', 'journey-student-region')
    await eyes.setViewportSize({width: 1400, height: 900});
    await browser.sleep(10000);
    
    var locator = '#page-content-wrapper > card-root > card-page > bre-render-cms-component > bre-cms-component > bre-container > bre-base-component:nth-child(5) > ng-component > section > div';
    await eyes.check("region", Target.region(by.css(locator)).fully());
    //see this test: https://github.com/applitools/eyes.sdk.javascript1/blob/master/packages/eyes-selenium-3/test/e2e/protractor/check-interface-test.js#L85
    await eyes.close(false).then(function (results) {
      done();
    });
  });
});

//results from issue2: https://eyes.applitools.com/app/test-results/00000251811683690233/00000251811683690061/steps/1?accountId=Oyn592xB1Ei-T2CjqgKkLA~~&mode=step-editor