//Install npm package: npm install '@applitools/eyes.webdriverio' --save-dev
//Start appium server
//Run: node webdriverio-web-android-local-temp.js

function sleep(ms) {
return new Promise(resolve => setTimeout(resolve, ms));
}

function create_webdirver(server_url, session_id) {
  var webdriver = require('selenium-webdriver');
  var http = require('selenium-webdriver/http');

  var commandExecutor = new http.Executor(new http.HttpClient(server_url));
  return webdriver.WebDriver.attachToSession(commandExecutor, session_id);
}

async function main() {
   
  const webdriverio = require('webdriverio');
  var path = require('path');
  
  var applitoolsKey = process.env.APPLITOOLS_API_KEY;
  
  //Open a Chrome Android browser
  const client = webdriverio.remote({
      port: 4723,
      logLevel: 'verbose',
      desiredCapabilities: {
         platformName: 'Android',
         deviceName: 'android',
         app:  path.resolve(__dirname, 'app-debug.apk'),
         appPackage: 'com.amazonaws.devicefarm.android.referenceapp'
      }
  });

  let browser = client.init();
 
  //wait for app to load. You can change this to any wait logic you want. Using sleep for now... 
  await sleep(30000);
  
  console.log("before");
  var opt = browser.options;
  var serverUrl = opt.protocol + '://' + opt.hostname + ':' + opt.port + '/wd/hub';
  driver = create_webdirver(serverUrl, client.requestHandler.sessionID);

  var Eyes = require('eyes.selenium').Eyes;
  var eyes = new Eyes();
  eyes.setApiKey(applitoolsKey);

  var ConsoleLogHandler = require('eyes.selenium').ConsoleLogHandler;
  eyes.setLogHandler(new ConsoleLogHandler(true));

  browser.addCommand("EyesOpen", function (appName, testName) {
      console.log("Opening eyes");
      eyes.open(driver, appName, testName);
  });

  browser.addCommand("EyesCheckWindow", function (tag) {
      console.log("Validating eyes");
      return eyes.checkWindow(tag);
  });

  browser.addCommand("EyesClose", function (throwEx) {
      console.log("Closing eyes");
      return eyes.close(throwEx).then(function (res) {
          console.log(">> Test Result <<");
          console.log(res);
          console.log(res.appUrls.session);
      });
  });

  try {
     
     await sleep(3000);
     
     await browser.EyesOpen('Example App', 'Main View');

     await browser.EyesCheckWindow('Main View');

     await browser.EyesClose(true);

  } finally {

     // Close the browser.
     await browser.end();

     // If the test was aborted before eyes.close was called ends the test as aborted.
     await eyes.abortIfNotClosed();

  }

}

main();