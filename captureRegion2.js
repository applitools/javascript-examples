require('chromedriver');
//var webdriver = require('selenium-webdriver');
const {Builder, By, until} = require('selenium-webdriver');
const {ConsoleLogHandler, Target, MatchLevel, StitchMode} = require('eyes.selenium');
var Eyes = require('eyes.selenium').Eyes;
var eyes = new Eyes();
eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
eyes.setForceFullPageScreenshot(true);
eyes.setStitchMode(Eyes.StitchMode.CSS);

var driver = null, eyes = null;

describe('Eyes.Selenium.JavaScript - Selenium', function () {

    this.timeout(5 * 60 * 1000);

    before(function () {
        driver = new Builder()
            .forBrowser('chrome')
            .build();

        eyes = new Eyes();
        eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
        eyes.setLogHandler(new ConsoleLogHandler(true));
        eyes.setForceFullPageScreenshot(true);
        eyes.setStitchMode(Eyes.StitchMode.SCROLL);
    });

    beforeEach(function () {
        var appName = this.test.parent.title;
        var testName = this.currentTest.title;

        return eyes.open(driver, 'USA Today', 'Capture Video Regions').then(function (browser) {
           driver = browser;
        });
    });

    it("check video regions", function () {
       driver.get("http://uw.usatoday.com/story/tech/nation-now/2018/02/07/spacex-falcon-heavy-center-booster/314813002/");
       
       var videos = driver.findElements(By.css('#videoWrap > video-wrap'));
       
       videos.then(function(elements) {
           for (var i = 0; i < elements.length; i++) {
              eyes.checkRegionByElement(elements[i], 'test');
           }
       });
       
       return eyes.close();
   });
   
    afterEach(function () {
        return driver.quit().then(function () {
            return eyes.abortIfNotClosed();
        });
    });
});