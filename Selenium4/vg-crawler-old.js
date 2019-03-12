//https://help.crossbrowsertesting.com/selenium-testing/getting-started/javascript/

"use strict"; 

require('chromedriver');

var expect = require('chai').expect;
   
const {Builder, By, until} = require('selenium-webdriver');
var request = require('request');

const { ConsoleLogHandler, Region, TestResults, GeneralUtils, MatchLevel } = require('@applitools/eyes-sdk-core');
const { Eyes, Target, SeleniumConfiguration, BrowserType, StitchMode } = require('@applitools/eyes-selenium');

var batchId = Math.round((new Date()).getTime() / 1000).toString();
console.log("My Batch ID: " + batchId)

var urls = [
   { url: 'https://google.com' },
   //{ url: 'https://bing.com' },
   //{ url: 'https://duckduckgo.com' }
   // { browserName: 'Internet Explorer', platform: 'Windows 8.1', version: '11', screen_resolution: '1366x768' },
   // { browserName: 'Internet Explorer', platform: 'Windows 8.1', version: '11', screen_resolution: '1366x768' },
   // { browserName: 'Internet Explorer', platform: 'Windows 8.1', version: '11', screen_resolution: '1366x768' },
   // { browserName: 'Internet Explorer', platform: 'Windows 8.1', version: '11', screen_resolution: '1366x768' },
   // { browserName: 'Internet Explorer', platform: 'Windows 8.1', version: '11', screen_resolution: '1366x768' },
   // { browserName: 'Internet Explorer', platform: 'Windows 8.1', version: '11', screen_resolution: '1366x768' },
   // { browserName: 'Internet Explorer', platform: 'Windows 8.1', version: '11', screen_resolution: '1366x768' }
];

function WebDriverErrorHandler(err, eyes, driver, sessionId){

    console.error(sessionId + ' Unhandled exception: ' + err.message + '\n');

    if (driver && sessionId){
        driver.quit();
        eyes.abortIfNotClosed();
    }
}

//doesn't work at all
//eyes.setHostingApp("myBrowser");
//eyes.setDefaultMatchTimeout(5000);
//eyes.setSaveDebugScreenshots

//doesn't work when vg is enabled
//eyes.addProperty("URL", browser.url);
//eyes.setAgentId("BLAH");
//eyes.setForceFullPageScreenshot(true);
//eyes.setStitchMode(StitchMode.CSS);
//eyes.setHideScrollbars(true);
//eyes.setSaveNewTests(true);



var flows = urls.map(function(Urls) {

    async function parallelExample() {
                
        try {
           
           var eyes = new Eyes(true);

           eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
           eyes.setLogHandler(new ConsoleLogHandler(true));
           eyes.setBatch({id: batchId, name: "Crawler"});

           
           //eyes.addProperty("URL", browser.url);
           eyes.setMatchLevel(MatchLevel.Layout);

            
           var driver = new Builder().forBrowser('chrome').build();

           var sessionId = await driver.getSession().then(function(session){
               var sessionId = session.id_; //need for API calls
               console.log('Session ID: ', sessionId); 
               return sessionId;
           });

           await driver.get(Urls.url);
            
           await eyes.open(driver, 'Crawler', Urls.url, {width: 1200, height: 800});
                        
           await eyes.check(Urls.url, Target.window());
           
           await eyes.close(false).then(function (results) {
              console.log("\n" + Urls.url + " Test Results: " + results + "\n");
              expect([results].map(r => r.getStatus())).to.eql(['Passed']);
           });
            
        } catch(err){
           
           WebDriverErrorHandler(err, eyes, driver, sessionId)
        
        } finally {
           
           console.error('\nKilling Session: ' + sessionId + '\n');
           await driver.quit();
           await eyes.abortIfNotClosed();
                   
        }
    
    }
 
    parallelExample();

});