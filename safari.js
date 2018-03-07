function main() {

    const {Builder, By, until} = require('selenium-webdriver');

    var driver = new Builder().forBrowser('chrome').build();

    var Eyes = require('eyes.selenium').Eyes;
    var eyes = new Eyes();

    eyes.setApiKey(process.env.APPLITOOLS_KEY);
    
    eyes.setForceFullPageScreenshot(true);
    eyes.setStitchMode(Eyes.StitchMode.CSS);

    try {

        eyes.open(driver, 'Applitools', 'Life', {width: 1440, height: 1012});

        driver.get('http://uw.usatoday.com/news/nation/');
        
        driver.executeScript("window.scrollTo(0, document.body.scrollHeight);")

        eyes.checkWindow('Life');

        eyes.close(false);

    } finally {

      driver.quit();
      eyes.abortIfNotClosed();

  }

}

main();