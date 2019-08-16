const {
    Eyes,
    Target,
    BatchInfo,
    ConsoleLogHandler,
    By,
    MatchLevel
} = require('@applitools/eyes-webdriverio');

const eyes = new Eyes(); 

var BatchId = Math.round((new Date()).getTime() / 1000).toString();
var appName = "apple.com"
var viewport = {width: 1000, height: 600}

var expect = require('chai').expect;

class GlobalPage {

    eyesOpen(testName) {
        eyes.setServerUrl("https://eyes.applitools.com")
        eyes.setBatch({name: "Apple Visual Tests", id: BatchId});
        eyes.setLogHandler(new ConsoleLogHandler(false));
        eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
        browser.call(() => eyes.open(browser, appName, testName, viewport))
    }

    eyesCheckPage(tag, fullpage) {
        browser.call(() => eyes.check(tag, Target.window().fully(fullpage)))
    }

    eyesCheckRegion(tag, region) {
        browser.call(() => eyes.check(tag, Target.region(eval(region))
            .fully(true))
            //.matchLevel(eval('MatchLevel.' + matchLevel))
        )
    }

    eyesClose(throwException) {
        browser.call(() => eyes.close(throwException)
            .then(function (results) {
                console.log("Applitools Results: " + results);
                expect(results._status).to.equal('Passed');
            })
        );
    }

    eyesAbortIfNotClosed() {
        browser.call(() => eyes.abortIfNotClosed())
    }
 
}

export const globalPage = new GlobalPage();