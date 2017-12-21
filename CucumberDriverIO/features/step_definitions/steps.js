/**
 * to run these tests you need install Cucumber.js on your machine
 * take a look at https://github.com/cucumber/cucumber-js for more informations
 *
 * first, install Cucumber.js via NPM
 * $ npm install -g cucumber
 *
 * then go into the cucumber directory and start the tests with
 * $ cucumber.js
 */

var assert = require('assert'),
    tmpResult;

//module.exports = function () {
   
      // Given(/^I go on the website "([^"]*)"$/) do |arg1|
      //   pending # Write code here that turns the phrase above into concrete actions
      // end
      //
      // Then(/^should the element "([^"]*)" be (\d+)px wide and (\d+)px high$/) do |arg1, arg2, arg3|
      //   pending # Write code here that turns the phrase above into concrete actions
      // end
      //
      // Then(/^should the title of the page be "([^"]*)"$/) do |arg1|
      //   pending # Write code here that turns the phrase above into concrete actions
      // end

    // this.Given(/^I go on the website "([^"]*)"$/, function (url) {
    //     browser.url(url);
    // });
    
    this.Given(/^I go on the website "([^"]*)"$/, function (arg1, callback) {
             browser.url(url);
             callback(null, 'finished');
           });

    this.Then(/^should the element "([^"]*)" be (\d+)px wide and (\d+)px high$/, function (selector, width, height) {
        browser.EyesOpen("MyTest");
        //var elemSize = browser.getElementSize(selector);
        browser.EyesCheckWindow("test");

        //browser.EyesCheckWindow("test2");
        //assert.equal(elemSize.width, width, 'width of element is ' + elemSize.width + ' but should be ' + width);
        //assert.equal(elemSize.height, height, 'height of element is ' + elemSize.height + ' but should be ' + height);
        browser.EyesClose(true);
    });

    this.Then(/^should the title of the page be "([^"]*)"$/, function (expectedTitle) {
        var title = browser.getTitle();
        //var elemSize = browser.getElementSize(selector);
        //assert.equal(elemSize.width, width, 'width of element is ' + elemSize.width + ' but should be ' + width);
        //assert.equal(elemSize.height, height, 'height of element is ' + elemSize.height + ' but should be ' + height);
        assert.equal(title, expectedTitle, ' title is "' + title + '" but should be "' + expectedTitle);
    });

//};