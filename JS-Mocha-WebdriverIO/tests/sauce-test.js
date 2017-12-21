var expect = require('chai').expect;

describe('Mocha Sauce Example', function() {
    it("Visual Validate Applitools.com", function() {

      console.log('RUNNING SAUCE TEST');

      browser.url('https://applitools.com/');

      console.log(browser.getUrl());

      browser.EyesOpen("Home Page");
      browser.EyesCheckWindow("Applitools Home");

      var results = browser.EyesClose(false);
      
      //assert the results object if you like...
      //http://support.applitools.com/customer/en/portal/articles/2191066-tests-results-advanced-information
    });
});
