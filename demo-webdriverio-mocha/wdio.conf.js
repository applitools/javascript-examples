const { join } = require('path');
const { TimelineService } = require('wdio-timeline-reporter/timeline-service');

exports.config = {
    runner: 'local',
    hostname: 'localhost',
    port: 4444,
    path: '/wd/hub',
    specs: ['./test/e2e/specs/*.spec.js'],
    //maxInstances: 5,
    capabilities: [
        {
            maxInstances: 10,
            browserName: 'chrome',
            // 'zal:recordVideo': true,
            // 'zal:name': 'Demo Integration Tests',
            // 'zal:build': 'WebDriverIO',
        },
    ],
    logLevel: 'trace',
    outputDir: './test-report/output',
    bail: 0,
    baseUrl: 'http://automationpractice.com',
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
        timeout: 60000,
        bail: 0
    },
    
    sync: false,

    services: [
        [TimelineService],
        // Uncomment to run tests with Selenium Standalone, if you have JDK installed.
        ['selenium-standalone'],
    ],
    before() {
        browser.setWindowSize(1200, 800);
    },
};
