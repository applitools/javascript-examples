//https://help.crossbrowsertesting.com/selenium-testing/getting-started/javascript/

"use strict"; 

var batchId = Math.round((new Date()).getTime() / 1000).toString();
console.log("My Applitools Batch ID: " + batchId)

async function SitemapGenerator(url, maxUrls) {

	var urlParser = require('url');
    const SitemapGenerator = require('sitemap-generator');
   
   	var host = urlParser.parse(url).host;
   	var filepath = './' + host + '.xml';

   	var generator = SitemapGenerator(url, {
   		maxDepth: 0,
     	filepath: filepath,
     	stripQuerystring: true,
     	maxEntriesPerFile: maxUrls
   	});

   	await generator.start();

    generator.on('add', (url) => {
    	console.log(url);
    });

    generator.on('error', (error) => {
     	console.log(error);
    });

    return new Promise((resolve) => {    	
        generator.on('done', () => {
    		console.log("\nSitemap Generation Complete!\n");
    		resolve(filepath);
    	});
	});
}

async function sitemapArray(sitemap, url = null) {
  
  const fs = require('fs');
  const smta = require('sitemap-to-array');

  var data;
  if (url === null) {
  	console.log("Sitemap File: " + sitemap);
  	var data = fs.readFileSync(sitemap, 'utf-8');
  } else {
  	console.log("Sitemap Url: " + url);
  	var data = url;
  };
 
  var sitemapUrls = [];
  const options = { returnOnComplete: true };
  
  return new Promise(async (resolve) => {
	  await smta(data, options, (error, list) => {
	    for (var url in list) {
	      sitemapUrls.push(list[url].loc);
	    }
	    resolve(sitemapUrls);
	  });
   });
};

async function browser(url) {
	
	var path = require('path');

	require('chromedriver');

	var expect = require('chai').expect;
   
	const {Builder, By, until} = require('selenium-webdriver');
	var request = require('request');

	const { ConsoleLogHandler, Region, TestResults, GeneralUtils, MatchLevel } = require('@applitools/eyes-sdk-core');
	const { Eyes, Target, SeleniumConfiguration, BrowserType, StitchMode, DeviceName, ScreenOrientation, BatchInfo } = require('@applitools/eyes-selenium');

	try {

		var eyes = new Eyes(enableVisualGrid);
     	eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
	    eyes.setLogHandler(new ConsoleLogHandler(log));
	    eyes.setBatch({id: batchId, name: sitemapFile});
	    //eyes.setBatch(new BatchInfo(sitemapFile));

	    var driver = new Builder().forBrowser('chrome').build();

	    var sessionId = await driver.getSession().then(function(session){
	        var sessionId = session.id_;
	        console.log('\nStarting Session: ', sessionId);
	        console.log('Navigating to Url: ', url + '\n'); 
	        return sessionId;
	    });

	    await driver.get(url);

	    // Batching broke with 4.9.0 :(
	    // const configuration = new SeleniumConfiguration();
    	// configuration.appName = path.basename(sitemapFile, '.xml');
    	// configuration.testName = url;
    	// configuration.addBrowser(800, 800, BrowserType.CHROME);
    	// configuration.addBrowser(800, 800, BrowserType.FIREFOX);
    	// configuration.addBrowser(1300, 800, BrowserType.CHROME);
    	// configuration.addBrowser(1300, 800, BrowserType.FIREFOX);
    	// configuration.addDevice(DeviceName.iPhone_X, ScreenOrientation.LANDSCAPE);
    	// configuration.addDevice(DeviceName.iPhone_X, ScreenOrientation.PORTRAIT);
    	// configuration.addDevice(DeviceName.Nexus_6, ScreenOrientation.LANDSCAPE);
    	// configuration.addDevice(DeviceName.Nexus_6, ScreenOrientation.PORTRAIT);
    	// eyes.setConfiguration(configuration);
    	// await eyes.open(driver);

    	var appName = path.basename(sitemapFile, '.xml');

       	if (enableVisualGrid) {
       	
       		const configuration = new SeleniumConfiguration();
	    	configuration.setAppName(appName);
	    	configuration.setTestName(url);
	    	configuration.addBrowser( 500,  800, BrowserType.CHROME  );
			configuration.addBrowser( 500,  800, BrowserType.FIREFOX );
       		configuration.addBrowser( 1000, 800, BrowserType.CHROME  );
       		configuration.addBrowser( 1000, 800, BrowserType.FIREFOX );
       		configuration.addBrowser( 1500, 800, BrowserType.CHROME  );
       		configuration.addBrowser( 1500, 800, BrowserType.FIREFOX );
       		await eyes.open(driver, configuration);
       	
       	} else {

       		await eyes.open(driver, appName, url, { width: 1200, height: 800 });

       	}

	    await eyes.check(url, Target.window().fully());
	    await eyes.close(false);

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
        browser(url).then(function (url) {
        	resolve(url);
        });
	});
};

function isInt(value) {
  if (isNaN(value)) {
    return false;
  }
  var x = parseFloat(value);
  return (x | 0) === x;
}

let enableVisualGrid = Boolean;
let log = Boolean;
let sitemapFile = String;
let array = Array;

async function crawler() {
	
	const PromisePool = require('es6-promise-pool');
	var program = require('commander');

	program
		.version('0.1.0')
  		.option('-u --url [url]', 'Add the site URL you want to generate a sitemap for. e.g. -u https://www.seleniumconf.com')
  		.option('-s --sitemap [sitemap]', 'Use an already existing sitemap file. e.g. -s "/path/to/sitemap.xml" Note: This overrides the -u arg')
  		.option('-b, --browsers [browsers]', 'Add the MAX number of browsers to run concurrently. e.g. -b 10. Note: Be careful with this!', parseInt)
  		.option('-m, --sitemapUrl [sitemapUrl', 'Specify a sitemap URL. e.g. -m https://www.example.com/sitemap.xml')
  		.option('--no-grid', 'Disable the Visual Grid and run locally only (Default: true). e.g. --no-grid')
  		.option('--log', 'Enable Applitools Debug Logs (Default: false). e.g. --log')
  		.parse(process.argv);

  	enableVisualGrid = program.grid;
  	log = program.log;

    if (!isInt(program.browsers)) {
    	program.browsers = 10;
    }
	
	if (program.sitemapUrl) {

	    var urlParser = require('url');
   		var host = urlParser.parse(program.sitemapUrl).host;
		sitemapFile = host;
		array = await sitemapArray('', program.sitemapUrl);

	} else {
		
		if (program.sitemap) {
			sitemapFile = program.sitemap
		} else {
			sitemapFile = await SitemapGenerator(program.url, 500);
		}
		
		array = await sitemapArray(sitemapFile);
	}

 	const pool = new PromisePool(promiseProducer, program.browsers);

 	await pool.start();
}

crawler();