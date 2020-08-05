'use strict';
//https://github.com/applitools/eyes.webdriverio.javascript/blob/master/test/TestNativeApp_Android.js

const {Eyes, ConsoleLogHandler} = require('@applitools/eyes.webdriverio');
const webdriverio = require('webdriverio');
const appName = 'NativeApp';
let eyes = new Eyes();
let browser;


describe(appName, function () {

  before(function () {
    eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
    eyes.setLogHandler(new ConsoleLogHandler(true));
  });

  beforeEach(async () => {
    const browserOptions = {
      port: '4723',
      path: '/wd/hub',
      host: 'localhost',
      desiredCapabilities: {
        platformName: "Android",
        deviceName: "Android Emulator",
        app: "https://applitools.bintray.com/Examples/app-debug.apk",
        appPackage: "com.applitoolstest",
        appActivity: "com.applitoolstest.ScrollActivity"
      }
    };

    browser = webdriverio.remote(browserOptions);
    await browser.init();
    return eyes.open(browser, 'Android Example', 'Main activity');
  });

  it('TestCheckWindow', () => {
    browser.executeAsync(function (done) {
      eyes.checkWindow('Window');
      eyes.close(false);
      equal(result.getAsExpected(), true);
      setTimeout(done, 59000)
    });

  });

  afterEach(async () => {
    await eyes.abortIfNotClosed();
    await browser.end();
  });

});