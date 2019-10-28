// example of a test group
// note: all tests under the test directory are ran

var ConsoleLogHandler = require('eyes.selenium').ConsoleLogHandler;

const {Eyes, Target} = require('@applitools/eyes.webdriverio');
const eyes = new Eyes();

import pry from 'pryjs'

//without services
describe('webdriver.io page', async ()=> {

    it('should have the right title - the fancy generator way', async ()=> {

       await browser.url('/')
       await eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
       await eyes.setLogHandler(new ConsoleLogHandler(true));
       await eyes.open(browser, 'wdio.com', 'WebdriverIO! Test', { width: 1200, height: 700 });
       
       //await eval(pry.it)
       
       await eyes.check('WDIO Page', Target.window());
       await eyes.close(false)
       .then(function (results) {
           console.log("My Results: " + results);
           assert.equal(results._status, 'Passed');
       });
    });
});