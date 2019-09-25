const { Eyes, Target } = require('@applitools/eyes-selenium');
const {Capabilities, Builder, By, Actions} = require("selenium-webdriver"); 
var webdriver = require("selenium-webdriver");


async function chromeExample() {
 var eyes = new Eyes(); 
 eyes.setApiKey(process.env.APPLITOOLS_API_KEY); 
 var innerDriver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build(); 
 //var innerDriver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.firefox()).build(); 
 
 await eyes.open(innerDriver, 'MyApp', 'JS', {width: 1024, height: 768}); 
 try {
  innerDriver.get("https://www.w3schools.com/howto/howto_css_dropdown.asp"); 
  let elem = await innerDriver.findElement(By.css(".dropbtn")); 
  //This performs the hover action  
  await innerDriver.actions().move({origin: elem}).perform(); 
  await eyes.check('initial screen', Target.window()); 
  await eyes.close();  
 } finally {
  eyes.abortIfNotClosed();
  innerDriver.quit();
 }
}
chromeExample();