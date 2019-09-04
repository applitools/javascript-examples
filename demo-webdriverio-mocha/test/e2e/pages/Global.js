const {
    Eyes,
    BatchInfo,
    ConsoleLogHandler,
    MatchLevel,
    StitchMode
} = require('@applitools/eyes-webdriverio');

const sleep = require('sleep');

const eyes = new Eyes(); 
var BatchId = Math.round((new Date()).getTime() / 1000).toString();
const batchInfo = new BatchInfo("WebdriverIO5");
batchInfo.setSequenceName('Insights Batch');

class Global {

    myEyes(log = false) {
        eyes.setServerUrl("https://eyes.applitools.com")
        //eyes.setBatch({name: "Visual Tests", id: BatchId});
        eyes.setBatch(batchInfo);
        eyes.setLogHandler(new ConsoleLogHandler(log));
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
            sleep.msleep(100);
            //console.log("\nI AM LAZY LOADING...\n")
        }
    };
}

export const global = new Global();