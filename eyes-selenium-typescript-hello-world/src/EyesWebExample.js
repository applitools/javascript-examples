"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("chromedriver");
const selenium_webdriver_1 = require("selenium-webdriver");
const eyes_selenium_1 = require("eyes.selenium");
(() => __awaiter(this, void 0, void 0, function* () {
    // Open a Chrome browser.
    const driver = new selenium_webdriver_1.Builder()
        .withCapabilities(selenium_webdriver_1.Capabilities.chrome())
        .build();
    // Initialize the eyes SDK and set your private API key.
    const eyes = new eyes_selenium_1.Eyes();
    // eyes.setApiKey('YOUR API KEY');
    eyes.setLogHandler(new eyes_selenium_1.ConsoleLogHandler(false));
    try {
        // Start the test and set the browser's viewport size to 800x600.
        yield eyes.open(driver, 'Hello World!', 'My first Javascript test!', { width: 800, height: 600 });
        
        yield var value = eyes.getIsOpen();
        console.log("Eyes Open: " + value);
        
        // Navigate the browser to the "hello world!" web-site.
        yield driver.get('https://applitools.com/helloworld');
        // Visual checkpoint #1.
        yield eyes.checkWindow('Main Page', -1);
        // Click the "Click me!" button.
        yield driver.findElement(selenium_webdriver_1.By.css('button')).click();
        // Visual checkpoint #2.
        yield eyes.checkWindow('Click!', -1);
        // End the test.
        yield eyes.close();
    }
    finally {
        // Close the browser.
        yield driver.quit();
        // If the test was aborted before eyes.close was called ends the test as aborted.
        yield eyes.abortIfNotClosed();
    }
}))();
