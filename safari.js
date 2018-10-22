function main() {

    //const {Builder, By, until} = require('selenium-webdriver');
        
    //var driver = new Builder().forBrowser('safari').build();
    
    let wd = require('selenium-webdriver');
    let safari = require('selenium-webdriver/safari');
    let opts = new safari.Options();
    opts.setTechnologyPreview(false);
    let caps = opts.toCapabilities();
    let driver = new wd.Builder().withCapabilities(caps).build(); 
    
    var Eyes = require('eyes.selenium').Eyes;
    var eyes = new Eyes();

    eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
    
    eyes.setForceFullPageScreenshot(true);
    eyes.setStitchMode(Eyes.StitchMode.CSS);

    try {

        eyes.open(wd, 'Github', 'Home Page', {width: 1440, height: 1012});

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