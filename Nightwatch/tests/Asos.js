var driver;
var Eyes = require('eyes.selenium').Eyes;
var MatchLevel = require('eyes.sdk/src/MatchSettings').MatchLevel;
var eyes = new Eyes();
var assert = require('assert');
var FixedCutProvider = require('eyes.selenium').FixedCutProvider;
//require('NightEyes');

eyes.setApiKey('9RkMajXrzS1Zu110oTWQps102CHiPRPmeyND99E9iL0G7yAc110');
eyes.setForceFullPageScreenshot(true);
eyes.setStitchMode(Eyes.StitchMode.CSS);
//eyes.setStitchMode(Eyes.StitchMode.Scroll);
eyes.setMatchLevel(MatchLevel.Layout2);
//eyes.setImageCut(new FixedCutProvider(100,0,0,0));

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
  
  'Demo test Asos' : function (browser) {
    browser
    .url(browser.launchUrl)
    .perform(function(c,done){
      eyes.open(driver, 'Applitools', 'Test Web Page', {width: 1024, height: 650})
      // Visual validation point #1
      eyes.checkWindow('Main Page').then(function(){
        done();
      });
    })
    .setValue('#txtSearch', "adidas")
    .click('.go')
    .perform(function(c,done){
        eyes.checkWindow('Searching adidas').then(function(){
          done();
        });
      })
    .perform(function(c,done){
        // End visual testing. Validate visual correctness.
        eyes.close(false).then(function(res){
          assert.equal(res.isDifferent, false);
          console.log(res);
          done();
        });
      })
      .end();
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
