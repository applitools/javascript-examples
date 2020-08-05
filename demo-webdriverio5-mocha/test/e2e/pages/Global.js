import { config } from '../../../../JS-Mocha-WebdriverIO/wdio.conf';

const {
    Eyes,
    BatchInfo,
    ConsoleLogHandler,
    // FileLogHandler,
    MatchLevel,
    StitchMode,
    Configuration,
    ClassicRunner
} = require('@applitools/eyes-webdriverio');

const sleep = require('sleep');
const runner = new ClassicRunner();
const eyes = new Eyes(runner); 

class Global {

    myEyes(log = false) {
        eyes.setServerUrl("https://eyesapi.applitools.com")
        //The batch.id is only needed if you're running in parallel with multiple instances. This is set in the wdio.conf file.
        //console.log("MY BATCH ID: " + batchId);
        eyes.setBatch({
            id: batchId,
            name: 'WDIO5',
            sequenceName: 'WDIO5',
            notifyOnCompletion: true
        });
        eyes.setLogHandler(new ConsoleLogHandler(false));
        //This will write logs to a file. Helpful for debugging issues at Applitools.
        // eyes.setLogHandler(new FileLogHandler('/user/justin/logs/log.log'));
        eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
        eyes.setForceFullPageScreenshot(true);
        return eyes;
    }

    async getPageHeight() {
        var clientHeight = await browser.execute("return document.documentElement.clientHeight");
        var bodyClientHeight = await browser.execute("return document.body.clientHeight");
        var scrollHeight = await browser.execute("return document.documentElement.scrollHeight");
        var bodyScrollHeight = await browser.execute("return document.body.scrollHeight");
        var maxDocElementHeight = Math.max(clientHeight, scrollHeight);
        var maxBodyHeight = Math.max(bodyClientHeight, bodyScrollHeight);
        return Math.max(maxDocElementHeight, maxBodyHeight);
    };

    //This is a helper method. It's not usually needed but just incase. 
    async lazyLoadPage() {
        var height =  await browser.execute("return window.innerHeight");
        var pageHeight = await this.getPageHeight();
        for (var j = 0; j < pageHeight; j += (height - 20)) {
            await browser.execute("window.scrollTo(0," + j + ")");
            sleep.msleep(200);
            //console.log("\nI AM LAZY LOADING...\n")
        }
        await browser.execute("window.scrollTo(0,0)");
        sleep.msleep(500);
    };
}

export const global = new Global();