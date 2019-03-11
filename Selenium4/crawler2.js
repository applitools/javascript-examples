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


async function sitemapArray(sitemap){
  const fs = require('fs')
  const smta = require('sitemap-to-array')

  const data = fs.readFileSync(sitemap, 'utf-8')
  var sitemapUrls = [];
  const options = { returnOnComplete: true };
  await smta(data, options, (error, list) => {
    for (var url in list) {
      sitemapUrls.push(list[url]);
    }
  });
  return sitemapUrls;
};

async function chunk(myArray, chunk_size){
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];
    
    for (index = 0; index < arrayLength; index += chunk_size) {
        chunk = myArray.slice(index, index+chunk_size);
        tempArray.push(chunk);
    }

    return tempArray;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function forEachPromise(items, fn) {
    return items.reduce(function (promise, item) {
        return promise.then(function () {
            return fn(item);
        });
    }, Promise.resolve());
}

function logItem(item) {
    return new Promise((resolve, reject) => {
        process.nextTick(() => {
            console.log(item);
            resolve();
        })
    });
}

var promiseForeach = require('promise-foreach')
var jsonItems = [];

((async () => {

  let jobs = [];

  const array = await sitemapArray('primerica.xml');
  
  const sitemapUrls = await chunk(array, 10);


  //const sitemapUrls = await sitemapArray('primerica.xml');
    
  //console.log(sitemapUrls);
  
  // let finalArray = [];
  var results = [];
  sitemapUrls.forEach(function(urls, index) {


    var flows = urls.map(function(url) {

    //   //var flows = sitemapUrls.slice(0,5).map(function(url) {

      async function parallelExample() {

          console.log("My URL: " + url.loc);
                  
          try {
             
             var eyes = new Eyes(true);

             eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
             eyes.setLogHandler(new ConsoleLogHandler(true));
             eyes.setBatch({id: batchId, name: "Crawler"});
              
             var driver = new Builder().forBrowser('chrome').build();

             var sessionId = await driver.getSession().then(function(session){
                 var sessionId = session.id_;
                 console.log('Starting Session: ', sessionId);
                 console.log('Navigating to Url: ', url.loc + '\n'); 
                 return sessionId;
             });

             await driver.get(url.loc);

             const configuration = new SeleniumConfiguration();
             configuration.setAppName('Crawler');
             configuration.setTestName(url.loc);
             configuration.addBrowser(400, 800, BrowserType.CHROME);

             await eyes.open(driver, configuration);     
             await eyes.check(url.loc, Target.window().fully());
             await eyes.close(false).then(function (results) {
                console.log("\n" + url.loc + " Test Results: " + results + "\n");
                expect([results].map(r => r.getStatus())).to.eql(['Passed']);
             });
              
          } catch(err) {

            console.error('\n' + sessionId + ' Unhandled exception: ' + err.message);
            console.log('Fiailed Test: ', url.loc + '\n'); 
            
            if (driver && sessionId){
                await driver.quit();
                await eyes.abortIfNotClosed();
            }
                  
          } finally {
             
             console.error('\nFinished Session: ' + sessionId + ', url: ' + url.loc + '\n');
             await driver.quit();
             await eyes.abortIfNotClosed();
                     
          }
        
      }
      
      parallelExample();

    });

    results.push(urls);

    //const urlsDone = index >= urls.length - 1; 

  });

 return Promise.all(results);

})()).catch(console.error);



               // configuration.addBrowser(400, 800, BrowserType.CHROME);
               // configuration.addBrowser(400, 800, BrowserType.FIREFOX);
               // configuration.addBrowser(700, 800, BrowserType.CHROME);
               // configuration.addBrowser(700, 800, BrowserType.FIREFOX);
               // configuration.addBrowser(1000, 800, BrowserType.CHROME);
               // configuration.addBrowser(1000, 800, BrowserType.FIREFOX);
               // configuration.addBrowser(1300, 800, BrowserType.CHROME);
               // configuration.addBrowser(1300, 800, BrowserType.FIREFOX);
               // configuration.addBrowser(1600, 800, BrowserType.CHROME);
               // configuration.addBrowser(1600, 800, BrowserType.FIREFOX);