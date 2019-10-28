'use strict';

const chromedriver = require('chromedriver');
const {remote} = require('webdriverio');
const {
  Eyes,
  Target,
  ClassicRunner,
  Configuration,
  BatchInfo
} = require('../index'); // should be replaced to '@applitools/eyes-webdriverio'

(async () => {
  chromedriver.start();

  // Open a Chrome browser.
  const chrome = {
    capabilities: {
      browserName: 'chrome'
    }
  };
  const browser = await remote(chrome);

  // Initialize the eyes SDK and set your private API key.
  const eyes = new Eyes(new ClassicRunner());

  try {
    const batchInfo = new BatchInfo();
    batchInfo.setSequenceName('alpha sequence');

    const configuration = new Configuration();
    configuration.setBatch(batchInfo);
    configuration.setAppName('Eyes Examples');
    configuration.setTestName('My first Javascript test!');
    // eyes.setApiKey('Your API Key');
    configuration.setApiKey(process.env.APPLITOOLS_API_KEY);
    eyes.setConfiguration(configuration);

    const driver = await eyes.open(browser);

    // Navigate the browser to the "hello world!" web-site.
    await driver.url('https://applitools.com/helloworld');

    // Visual checkpoint #1.
    await eyes.check('Main Page', Target.window().fully());

    // Click the "Click me!" button.
    const b = await browser.$('button');
    await b.click();

    // Visual checkpoint #2.
    await eyes.check('Click!', Target.window().fully());

    // End the test.
    // const results = await eyes.close(); // will return only first TestResults, but as we have two browsers, we need more result
    await eyes.close(false);
    const results = await eyes.getRunner().getAllTestResults(false);
    console.log(results);
  } catch (e) {
    console.log(`Error ${e}`);
  } finally {
    // Close the browser.
    await browser.deleteSession();

    // If the test was aborted before eyes.close was called ends the test as aborted.
    await eyes.abort();

    await chromedriver.stop();
  }
})();
