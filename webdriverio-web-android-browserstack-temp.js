//Install npm package: npm install '@applitools/eyes.webdriverio' --save-dev
//Start appium server
//Run: node webdriverio-web-android-temp.js

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
  
  var bsUser = process.env.BS_USER;
  var bsKey = process.env.BS_KEY;
  var applitoolsKey = process.env.APPLITOOLS_API_KEY;
  
  //Open a Chrome Android browser
  const client = webdriverio.remote({
     user: bsUser,
     key: bsKey,
     host: 'hub-cloud.browserstack.com',
     port: 80,
     logLevel: 'verbose',
     desiredCapabilities: {
        browser: 'chrome',
        os_version: '7.1',
        device: 'Google Pixel',
        real_mobile: 'true',
        'browserstack.local': 'false',
     }
  });

  let browser = client.init();

  await browser
     .timeouts('script', 60000)
     .url('https://applitools.com/helloworld')
     .waitForExist('body > div > div.section.button-section', 60000);
   
  await sleep(5000);
  
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
     
     await browser.EyesOpen('Hello World', 'Main Page');

     await browser.EyesCheckWindow('Main Window');

     await browser.click('button');
 
     await browser.EyesCheckWindow('Click Me!');

     await browser.EyesClose(true);

  } finally {

      // Close the browser.
      await browser.end();

      // If the test was aborted before eyes.close was called ends the test as aborted.
      await eyes.abortIfNotClosed();

  }

}

main();