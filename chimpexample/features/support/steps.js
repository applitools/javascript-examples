// import searchPage from '../../pageobjects/search.page';

module.exports = function() {

	// this.registerHandler("BeforeFeatures", function(event, next) {
	// 	console.log("registering...");
 //    	// searchPage.open();

	//     console.log("Attaching to Session");
	//     var serverUrl = "http://127.0.0.1:3333/wd/hub"
	//     var webdriver = require('selenium-webdriver');
	//     var http = require('selenium-webdriver/http');
	//     var client = new http.HttpClient( serverUrl );
	//     var executor = new http.Executor( client );

	//     var session_id = browser._original.requestHandler.sessionID

	//     console.log(session_id)

	//     // var start = new Date().getTime();
	//     // while (new Date().getTime() < start + 60000);

	//     var driver = webdriver.WebDriver.attachToSession(executor, session_id);

	//     var Eyes = require('eyes.selenium').Eyes;
	//     var ConsoleLogHandler = require('eyes.selenium').ConsoleLogHandler;

	//     var eyes = new Eyes();
	//     eyes.setLogHandler(new ConsoleLogHandler(true));
	//     eyes.setApiKey("eN8vdMRo5LkWNsB97EDdRSQXnc0E109qb2vEGrsfr105Z107LU110");
	//     eyes.setForceFullPageScreenshot(true);
	//     eyes.setStitchMode(Eyes.StitchMode.CSS);
	//     // eyes.setBatch("Google");

	//     browser.addCommand("EyesOpen", function (testName) {
	//       console.log("Opening eyes");
	//       eyes.open(driver, "Google.com", testName, {width: 1200, height: 700});
	//     });

	//     browser.addCommand("EyesCheckWindow", function async(tag) {
	//       console.log("Validating eyes");
	//       return eyes.checkWindow(tag);
	//     });

	//     browser.addCommand("EyesClose", function async(throwEx) {
	//       console.log("Closing eyes");
	//       return eyes.close(throwEx).then(function (res) {
	//             // console.log(">> Test Result <<");
	//             // console.log(res);
	//             // console.log(res.appUrls.session);
	//           return res;
	//       });
	//       eyes.abortIfNotClosed();
	//     });
 //      return next();
 //  });


	this.Given(/^I have visited Google$/, function() {
		browser.url('https://google.com');
	})

	this.When(/^I search for "([^"]*)"$/, function(search) {
		
        //var elemSize = browser.getElementSize(selector);
        browser.EyesOpen("MyTest");
        browser.EyesCheckWindow("test");
        browser.EyesClose(false);

        //browser.EyesCheckWindow("test2");
        //assert.equal(elemSize.width, width, 'width of element is ' + elemSize.width + ' but should be ' + width);
        //assert.equal(elemSize.height, height, 'height of element is ' + elemSize.height + ' but should be ' + height);
        
		  browser.setValue('input[name="q"]', search);
		  browser.keys(["Enter"]);
		   
		
	})

	this.Then(/^I see "([^"]*)"$/, function(link) {
		browser.waitForExist('a=' + link);
	})
}