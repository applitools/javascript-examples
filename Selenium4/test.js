//https://help.crossbrowsertesting.com/selenium-testing/getting-started/javascript/

"use strict"; 

require('chromedriver');

var expect = require('chai').expect;
   
const {Builder, By, until} = require('selenium-webdriver');
var request = require('request');

const { ConsoleLogHandler, Region, TestResults, GeneralUtils } = require('@applitools/eyes-sdk-core');
const { Eyes, Target, SeleniumConfiguration, BrowserType } = require('@applitools/eyes-selenium');

var batchId = Math.round((new Date()).getTime() / 1000).toString();
console.log("My Batch ID: " + batchId)

var browsers = [
   { browserName: 'Chrome', platform: 'Windows 10', version: '64', screen_resolution: '1366x768' },
   { browserName: 'Chrome', platform: 'Mac OSX 10.14', version: '71x64', screen_resolution: '1366x768' },
   // { browserName: 'Internet Explorer', platform: 'Windows 8.1', version: '11', screen_resolution: '1366x768' }
   // { browserName: 'Internet Explorer', platform: 'Windows 8.1', version: '11', screen_resolution: '1366x768' },
   // { browserName: 'Internet Explorer', platform: 'Windows 8.1', version: '11', screen_resolution: '1366x768' },
   // { browserName: 'Internet Explorer', platform: 'Windows 8.1', version: '11', screen_resolution: '1366x768' },
   // { browserName: 'Internet Explorer', platform: 'Windows 8.1', version: '11', screen_resolution: '1366x768' },
   // { browserName: 'Internet Explorer', platform: 'Windows 8.1', version: '11', screen_resolution: '1366x768' },
   // { browserName: 'Internet Explorer', platform: 'Windows 8.1', version: '11', screen_resolution: '1366x768' },
   // { browserName: 'Internet Explorer', platform: 'Windows 8.1', version: '11', screen_resolution: '1366x768' }
];

function webdriverErrorHandler(err, eyes, driver, sessionId){

    console.error(sessionId + ' Unhandled exception: ' + err.message + '\n');

    if (driver && sessionId){
        driver.quit();
        eyes.abortIfNotClosed();
    }
}

var flows = browsers.map(function(browser) {

    async function parallelExample() {
                
        try {
           
           var eyes = new Eyes(true);

           eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
           eyes.setLogHandler(new ConsoleLogHandler(true));
            
           var driver = new Builder().forBrowser('chrome').build();

           var sessionId = await driver.getSession().then(function(session){
               var sessionId = session.id_; //need for API calls
               console.log('Session ID: ', sessionId); 
               return sessionId;
           });

           await driver.get('http://www.google.com');
           
           await driver.wait(until.titleIs('Google'));
            
           await eyes.open(driver, 'Google', 'Google VG', {width: 1200, height: 800});
            
           await eyes.check('Search Page', Target.window());
             
           var element = await driver.findElement(By.name('q'));
           await element.sendKeys('cross browser testing');
           await element.submit();
            
           //await driver.wait(driver.findElement(By.id('resultStats')));
            
           await driver.getTitle().then(function(title) {
               console.log("\n" + sessionId + " title is: " + title + "\n");
               if (title !== ('cross browser testing - Google Search')) {
                   throw Error("\n" + sessionId + ' Unexpected title: ' + title + "\n");
               }
           });
            
           await eyes.check('Results Page', Target.window());
           
           await eyes.close(false).then(function (results) {
              console.log("\nMy Test Results: " + results + "\n");
              expect([results].map(r => r.getStatus())).to.eql(['Passed']);
           });
            
        } catch(err){
           
           webdriverErrorHandler(err, eyes, driver, sessionId)
        
        } finally {
           
           console.error('\nKilling Session: ' + sessionId + '\n');
           await driver.quit();
           await eyes.abortIfNotClosed();
                   
        }
    
    }
 
    parallelExample();

});