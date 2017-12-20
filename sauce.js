var webdriver = require('selenium-webdriver'),
    username = "",
    accessKey = "",
    driver;
    
var Eyes = require('eyes.selenium').Eyes;
var eyes = new Eyes();

eyes.setApiKey(process.env.APPLITOOLS_KEY);
 
driver = new webdriver.Builder().
  withCapabilities({
    'browserName': 'firefox',
    'platform': 'Windows 10',
    'version': '49.0',
    'username': username,
    'accessKey': accessKey
  }).
  usingServer("http://" + username + ":" + accessKey +
              "@ondemand.saucelabs.com:80/wd/hub").
  build();

try {

   // Start the test and set the browser's viewport size to 800x600.
   eyes.open(driver, 'Hello World!', 'My first Javascript test!', {width: 800, height: 600});

   // Navigate the browser to the "hello world!" web-site.
   driver.get('https://applitools.com/helloworld');

   // Visual checkpoint #1.
   eyes.checkWindow('Main Page');

   eyes.checkElementBy(webdriver.By.css("div.section"), null, "Hello World Image");

   // Click the "Click me!" button.
   driver.findElement(webdriver.By.tagName('button')).click();

   // Visual checkpoint #2.
   eyes.checkWindow('Click!');

   // End the test.
   eyes.close(false);

} finally {

 // Close the browser.
 driver.quit();

 // If the test was aborted before eyes.close was called ends the test as aborted.
 eyes.abortIfNotClosed();

}