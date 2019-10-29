'use strict';
// example of a test group
// note: all tests under the test directory are ran

var ConsoleLogHandler = require('eyes.selenium').ConsoleLogHandler;

const {By, Eyes, Target} = require('@applitools/eyes.webdriverio');
const eyes = new Eyes();

import pry from 'pryjs'

////Without eyes-services
describe('webdriver.io page', async ()=> {

    it('WDIO Example', async ()=> {

       await browser.url('/')
       await eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
       await eyes.setLogHandler(new ConsoleLogHandler(true));
       await eyes.open(browser, 'wdio.com', 'WebdriverIO Test!', { width: 1200, height: 700 });
       
       //Use pryjs to set a breakpoint and enter into the node console.
       //await eval(pry.it)
       
       await eyes.check('WDIO Page', Target.window());
       
       await eyes.close(false)
       .then(function (results) {
           console.log("My Results: " + results);
           assert.equal(results._status, 'Passed');
       });
    });

    after(async () => {
       await eyes.abort();
    });
});

//With eyes-services. DOES NOT WORK...
// describe('WDIO4 EyesServices', () => {

//     beforeEach( () => {
//        browser.url('https://www.github.com/');
//     });
  
//     it('checkWindow', () => {
//        browser.eyesCheckWindow('github');
//     });

//     //Mocha Skip a test...
//     it.skip('checkWindow', () => {
//         browser.eyesCheckWindow('main');
//     });
// });