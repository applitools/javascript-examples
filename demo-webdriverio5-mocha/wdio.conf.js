const { join } = require('path');
const { TimelineService } = require('wdio-timeline-reporter/timeline-service');
const { NullCutProvider } = require('@applitools/eyes-webdriverio');
let batchId = String;

exports.config = {
    runner: 'local',
    hostname: 'localhost',
    port: 4444,
    path: '/wd/hub',
    specs: ['./test/e2e/specs/*.js'],
    maxInstances: 50,
    capabilities: [
        {
            // maxInstances: 50,
            browserName: 'chrome',
            // 'safari.options': {
            //     technologyPreview: true
            // }
            //'goog:chromeOptions': {
            //    args: [
                    //awesome-testing.com/2019/03/disabling-javascript-using-selenium.html
                   /// 'profile.managed_default_content_settings.javascript'
           //     ]
           // }
        },
    ],
    logLevel: 'trace',
    outputDir: './test-report/output',
    bail: 0,
    baseUrl: '',
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    framework: 'mocha',
    reporters: [
        'dot',
        'spec',
        [
            'allure',
            {
                outputDir: './test-report/allure-result/',
                disableWebdriverStepsReporting: false,
                disableWebdriverScreenshotsReporting: false,
            },
        ],
        ['timeline', { outputDir: './test-report/timeline' }],
    ],
    mochaOpts: {
        ui: 'bdd',
        compilers: ['js:@babel/register'],
        timeout: 1200000000,
        bail: 0
    },
    
    sync: false,

    services: [
        [TimelineService],
        // Uncomment to run tests with Selenium Standalone, if you have JDK installed.
        ['selenium-standalone'],

    ],
    // seleniumArgs: { javaArgs: ['-Dwebdriver.edge.driver=/Users/justin/Downloads/msedgedriver2'] },
    before() {
        browser.setWindowSize(1200, 800);
    },

    beforeSession() {
        global.batchId = Math.round((new Date()).getTime() / 1000).toString();
     },
};