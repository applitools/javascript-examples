'use strict';

var myHooks = function () {
  this.Before(function(callback) {
    // Just like inside step definitions, "this" is set to a World instance. 
    // It's actually the same instance the current scenario step definitions 
    // will receive. 
 
    // Let's say we have a bunch of "maintenance" methods available on our World 
    // instance, we can fire some to prepare the application for the next 
    // scenario: 
 
    console.log("Attaching to Session");
    
    var opt = browser.options;
    var serverUrl = "http://" + opt.host + ':' + opt.port + opt.path;
    var webdriver = require('selenium-webdriver');
    var http = require('selenium-webdriver/http');
    var client = new http.HttpClient( serverUrl );
    var executor = new http.Executor( client );

    var session_id = browser._original.requestHandler.sessionID
    
    console.log("SESSION ID: " + session_id);
    
    //JS sleep
    // var start = new Date().getTime();
    // while (new Date().getTime() < start + 60000);

    var driver = webdriver.WebDriver.attachToSession(executor, session_id);
    console.log("My Driver Object: " + driver);

    var Eyes = require('eyes.selenium').Eyes;
    var ConsoleLogHandler = require('eyes.selenium').ConsoleLogHandler;

    var eyes = new Eyes();
    eyes.setLogHandler(new ConsoleLogHandler(true));
    eyes.setApiKey("9RkMajXrzS1Zu110oTWQps102CHiPRPmeyND99E9iL0G7yAc110");
    eyes.setForceFullPageScreenshot(true);
    eyes.setStitchMode(Eyes.StitchMode.CSS);
    eyes.setBatch("Google");

    browser.addCommand("EyesOpen", function (testName) {
      console.log("Opening eyes");
      eyes.open(driver, "Google.com", testName, {width: 800, height: 600});
    });

    browser.addCommand("EyesCheckWindow", function async(tag) {
      console.log("Validating eyes");
      return eyes.checkWindow(tag);
    });

    browser.addCommand("EyesClose", function async(throwEx) {
      console.log("Closing eyes");
      return eyes.close(throwEx).then(function (res) {
            console.log(">> Test Result <<");
            console.log(res);
            console.log(res.appUrls.session);
          return res;
      });
      eyes.abortIfNotClosed();
      
    });
    
    // driver.quit().then(function() {
    //
    // });
   
    // Don't forget to tell Cucumber when you're done: 
    //callback();
  });
};
 
module.exports = myHooks;