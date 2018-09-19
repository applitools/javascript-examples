function main() {

    const {Builder, By, until} = require('selenium-webdriver');
        
    var driver = new Builder().forBrowser('safari').build();

    var Eyes = require('eyes.selenium').Eyes;
    var eyes = new Eyes();

    eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
    
    eyes.setForceFullPageScreenshot(true);
    eyes.setStitchMode(Eyes.StitchMode.CSS);

    try {

        eyes.open(driver, 'Github', 'Home Page', {width: 1440, height: 1012});

        driver.get('http://github.com');
        
        //driver.executeScript("window.scrollTo(0, document.body.scrollHeight);")

        eyes.checkWindow('Github');

        eyes.close(false);

    } finally {

      driver.quit();
      eyes.abortIfNotClosed();

  }

}

main();