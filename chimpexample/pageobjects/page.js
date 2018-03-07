/* eslint-disable no-undef */

// function create_webdriver(server_url, session_id) {
//     var webdriver = require('selenium-webdriver');
//     var http = require('selenium-webdriver/http');
//     client = new http.HttpClient( server_url );
//     executor = new http.Executor( client );
//     return webdriver.WebDriver.attachToSession(executor, session_id);
// }


function Page() {
   
   //open: path => browser.url(`/${path}`)
   
   // console.log("before");
//    var opt = path => browser.options;
//    //var serverUrl = opt.protocol + '://' + opt.hostname + ':' + opt.port + '/wd/hub';
//    var serverUrl = "http://127.0.0.1/wd/hub"
//    //console.log(serverUrl);
//    //driver = create_webdriver(serverUrl, path => browser.sessionId);
//
//    var webdriver = require('selenium-webdriver');
//    var http = require('selenium-webdriver/http');
//    var client = new http.HttpClient( serverUrl );
//    var executor = new http.Executor( client );
//
   // var session_id = serverUrl + "/session/sessionId";
   //
   // //var session_id = SessionManager.prototype._configureRemote._getWebdriverSessions();
   //
   //
   // console.log(session_id)
   //
   // var start = new Date().getTime();
   // while (new Date().getTime() < start + 60000);
   //
   // var driver = webdriver.WebDriver.attachToSession(executor, session_id);
   //
   // var Eyes = require('eyes.selenium').Eyes;
   // var ConsoleLogHandler = require('eyes.selenium').ConsoleLogHandler;
   //
   // var eyes = new Eyes();
   // eyes.setLogHandler(new ConsoleLogHandler(true));
   // eyes.setApiKey("9RkMajXrzS1Zu110oTWQps102CHiPRPmeyND99E9iL0G7yAc110");
   // eyes.setForceFullPageScreenshot(true);
   // eyes.setStitchMode(Eyes.StitchMode.CSS);
   // eyes.setBatch("Google");
   //
   // path => browser.addCommand("EyesOpen", function (testName) {
   //     console.log("Opening eyes");
   //     eyes.open(driver, "Google.com", testName, {width: 1200, height: 700});
   // });
   //
   // path => browser.addCommand("EyesCheckWindow", function async(tag) {
   //     console.log("Validating eyes");
   //     return eyes.checkWindow(tag);
   // });
   //
   // path => browser.addCommand("EyesClose", function async(throwEx) {
   //     console.log("Closing eyes");
   //     return eyes.close(throwEx).then(function (res) {
   //         // console.log(">> Test Result <<");
   //         // console.log(res);
   //         // console.log(res.appUrls.session);
   //         return res;
   //     });
   //     eyes.abortIfNotClosed();
   // });
}

Page.prototype = {   
  open: path => browser.url(`/${path}`),
};

module.exports = new Page();
