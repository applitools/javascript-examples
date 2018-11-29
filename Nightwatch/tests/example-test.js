var driver;
var Eyes = require('eyes.selenium').Eyes;
var eyes = new Eyes();
var assert = require('assert');

eyes.setApiKey(process.env.APPLITOOLS_KEY);
eyes.setForceFullPageScreenshot(true);
eyes.setStitchMode(Eyes.StitchMode.CSS);
   
//'@tags': ['eyes-nightwatch'],
module.exports = {
   before : function(browser) {
      console.log('Setting up...');
      browser.pause(2000);
 
      browser.session(function(session){
         console.log("********My Session ID********");
         console.log(browser.sessionId);
         driver = create_webdriver('http://localhost:4444/wd/hub', browser.sessionId);
      });
   },

   afterEach : function(browser, done) {
      browser.end(function(){
         done();
      });
   },
   
   'Nightwatch Example' : function (browser) {
      browser.url(browser.launchUrl).perform(function(c,done) {
      eyes.open(driver, 'Applitools Nightwatch', 'Hello World', {width: 1024, height: 650});
      eyes.checkWindow('Home Page').then(function(){
         done();
      });
      }).click('div.section:nth-child(3) > button:nth-child(1)').perform(function(c,done) {
         eyes.checkWindow('Click!').then(function() {
            done();
         });
      }).perform(function(c,done) {
         eyes.close(false).then(function(res) {
            assert.equal(res.isDifferent, false);
            console.log(res);
            done();
         });
      }).end();
   }
};

function create_webdriver(server_url, session_id) {
  var webdriver = require('selenium-webdriver');
  var _http = require('selenium-webdriver/http');
  var url = require('url');

  var client = Promise.resolve(url)
  .then(function (url) {
    return new _http.HttpClient(server_url, null, null)
  });
  var executor = new _http.Executor(client);

  return webdriver.WebDriver.attachToSession(executor, session_id);
}