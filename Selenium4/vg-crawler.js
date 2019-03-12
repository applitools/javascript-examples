//https://help.crossbrowsertesting.com/selenium-testing/getting-started/javascript/

"use strict"; 

require('chromedriver');

const PromisePool = require('es6-promise-pool');

var expect = require('chai').expect;
   
const {Builder, By, until} = require('selenium-webdriver');
var request = require('request');

const { ConsoleLogHandler, Region, TestResults, GeneralUtils, MatchLevel } = require('@applitools/eyes-sdk-core');
const { Eyes, Target, SeleniumConfiguration, BrowserType, StitchMode } = require('@applitools/eyes-selenium');

var batchId = Math.round((new Date()).getTime() / 1000).toString();
console.log("My Applitools Batch ID: " + batchId)

async function sitemapArray(sitemap){
  
  const fs = require('fs')
  const smta = require('sitemap-to-array')
  const data = fs.readFileSync(sitemap, 'utf-8')
  var sitemapUrls = [];
  const options = { returnOnComplete: true };
  
  await smta(data, options, (error, list) => {
    for (var url in list) {
      sitemapUrls.push(list[url].loc);
    }
  });
  return sitemapUrls;
};

async function crawler(url) {

	try {

		var eyes = new Eyes(true);

     	eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
	    eyes.setLogHandler(new ConsoleLogHandler(true));
	    eyes.setBatch({id: batchId, name: "Crawler"});
	      
	    var driver = new Builder().forBrowser('chrome').build();

	    var sessionId = await driver.getSession().then(function(session){
	        var sessionId = session.id_;
	        console.log('Starting Session: ', sessionId);
	        console.log('Navigating to Url: ', url + '\n'); 
	        return sessionId;
	    });

	    await driver.get(url);

	    const configuration = new SeleniumConfiguration();
	    configuration.setAppName('Crawler');
	    configuration.setTestName(url);
	    configuration.addBrowser( 500,  800, BrowserType.CHROME  );
		configuration.addBrowser( 500,  800, BrowserType.FIREFOX );
       	configuration.addBrowser( 1000, 800, BrowserType.CHROME  );
       	configuration.addBrowser( 1000, 800, BrowserType.FIREFOX );
       	configuration.addBrowser( 1500, 800, BrowserType.CHROME  );
       	configuration.addBrowser( 1500, 800, BrowserType.FIREFOX );

	    await eyes.open(driver, configuration);     
	    await eyes.check(url, Target.window().fully());
	    await eyes.close(false);

	    // await eyes.close(false).then(function (results) {
	    //    console.log("\n" + url.loc + " Test Results: " + results + "\n");
	    //    expect([results].map(r => r.getStatus())).to.eql(['Passed']);
	    // });
      
    } catch(err) {

    	console.error('\n' + sessionId + ' Unhandled exception: ' + err.message);
    	console.log('Fiailed Test: ', url + '\n'); 
    
    	if (driver && sessionId) {
        	await driver.quit();
        	await eyes.abortIfNotClosed();
    	}
          
  	} finally {

  		console.error('\nFinished Session: ' + sessionId + ', url: ' + url + '\n');
     	await driver.quit();
     	await eyes.abortIfNotClosed();     
  
  	}

}

const promiseProducer = () => {
	
	if (array.length === 0) {
		return null;
	}	

	const url = array.pop();

	return new Promise((resolve) => {    	
        crawler(url).then(function (url) {
        	resolve(url);
        });
	});
};

let array = [];
async function runner() {
    array = await sitemapArray('primerica.xml');
    const pool = new PromisePool(promiseProducer, 10);
    await pool.start();
}

runner();