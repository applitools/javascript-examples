exports.config = {

    //
    // ==================
    // Specify Test Files
    // ==================
    // Define which test specs should run. The pattern is relative to the directory
    // from which `wdio` was called. Notice that, if you are calling `wdio` from an
    // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
    // directory is where your package.json resides, so `wdio` will be called from there.
    //
    specs: [
        './features/*.feature'
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    //
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
    // time. Depending on the number of capabilities, WebdriverIO launches several test
    // sessions. Within your capabilities you can overwrite the spec and exclude options in
    // order to group specific specs to a specific capability.
    //
    // First, you can define how many instances should be started at the same time. Let's
    // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
    // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
    // files and you set maxInstances to 10, all spec files will get tested at the same time
    // and 30 processes will get spawned. The property handles how many capabilities
    // from the same test should run tests.
    //
    maxInstances: 10,
    //
    // If you have trouble getting all important capabilities together, check out the
    // Sauce Labs platform configurator - a great tool to configure your capabilities:
    // https://docs.saucelabs.com/reference/platforms-configurator
    //
    capabilities: [{
        // maxInstances can get overwritten per capability. So if you have an in-house Selenium
        // grid with only 5 firefox instance available you can make sure that not more than
        // 5 instance gets started at a time.
        maxInstances: 5,
        //
        browserName: 'firefox'
    }],
    //
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // By default WebdriverIO commands are executed in a synchronous way using
    // the wdio-sync package. If you still want to run your tests in an async way
    // e.g. using promises you can set the sync option to false.
    sync: true,
    //
    // Level of logging verbosity: silent | verbose | command | data | result | error
    logLevel: 'silent',
    //
    // Enables colors for log output.
    coloredLogs: true,
    //
    // Saves a screenshot to a given path if a command fails.
    screenshotPath: './errorShots/',
    //
    // Set a base URL in order to shorten url command calls. If your url parameter starts
    // with "/", then the base url gets prepended.
    baseUrl: 'http://webdriver.io',
    //
    // Default timeout for all waitFor* commands.
    waitforTimeout: 60000,
    //
    // Default timeout in milliseconds for request
    // if Selenium Grid doesn't send response
    connectionRetryTimeout: 90000,
    //
    // Default request retries count
    connectionRetryCount: 3,
    //
    // Initialize the browser instance with a WebdriverIO plugin. The object should have the
    // plugin name as key and the desired plugin options as properties. Make sure you have
    // the plugin installed before running any tests. The following plugins are currently
    // available:
    // WebdriverCSS: https://github.com/webdriverio/webdrivercss
    // WebdriverRTC: https://github.com/webdriverio/webdriverrtc
    // Browserevent: https://github.com/webdriverio/browserevent
    // plugins: {
    //     webdrivercss: {
    //         screenshotRoot: 'my-shots',
    //         failedComparisonsRoot: 'diffs',
    //         misMatchTolerance: 0.05,
    //         screenWidth: [320,480,640,1024]
    //     },
    //     webdriverrtc: {},
    //     browserevent: {}
    // },
    //
    // Test runner services
    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.
    // services: [],//
    // Framework you want to run your specs with.
    // The following are supported: Mocha, Jasmine, and Cucumber
    // see also: http://webdriver.io/guide/testrunner/frameworks.html
    //
    // Make sure you have the wdio adapter package for the specific framework installed
    // before running any tests.
    framework: 'cucumber',

    services: ['selenium-standalone'],
    //
    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: http://webdriver.io/guide/testrunner/reporters.html
    // reporters: ['dot'],//
    // If you are using Cucumber you need to specify the location of your step definitions.
    cucumberOpts: {
        require: ['./features/steps.js'],        // <string[]> (file/dir) require files before executing features
        backtrace: false,   // <boolean> show full backtrace for errors
        compiler: [],       // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
        dryRun: false,      // <boolean> invoke formatters without executing steps
        failFast: false,    // <boolean> abort the run on first failure
        format: ['pretty'], // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
        colors: true,       // <boolean> disable colors in formatter output
        snippets: true,     // <boolean> hide step definition snippets for pending steps
        source: true,       // <boolean> hide source uris
        profile: [],        // <string[]> (name) specify the profile to use
        strict: false,      // <boolean> fail if there are any undefined or pending steps
        tags: [],           // <string[]> (expression) only execute the features or scenarios with tags matching the expression
        timeout: 30000,     // <number> timeout for step definitions
        ignoreUndefinedDefinitions: false // <boolean> Enable this config to treat undefined definitions as warnings.
    },

    //
    // =====
    // Hooks
    // =====
    // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    //
    // Gets executed once before all workers get launched.
    // onPrepare: function (config, capabilities) {
    //    console.log("onPrepare");
    //    console.log(config);
    // },
    //
    // Gets executed before test execution begins. At this point you can access all global
    // variables, such as `browser`. It is the perfect place to define custom commands.
    before: function (capabilities, specs) {
        // console.log("before");
        // var opt = browser.options;
        // var serverUrl = opt.protocol + '://' + opt.hostname + ':' + opt.port + '/wd/hub';
        // driver = create_webdirver3(serverUrl, browser.sessionId);
        // var Eyes = require('eyes.selenium').Eyes;
        // var eyes = new Eyes();
        // eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
        // eyes.setForceFullPageScreenshot(true);
        // browser.addCommand("EyesOpen", function (testName) {
        //     console.log("Opening eyes");
        //     eyes.open(driver, "MyApp", testName, {width: 1200, height: 700});
        // });
        //
        // browser.addCommand("EyesCheckWindow", function async(tag) {
        //     console.log("Validating eyes");
        //     return eyes.checkWindow(tag);
        // });
        //
        // browser.addCommand("EyesClose", function async(throwEx) {
        //     console.log("Closing eyes");
        //     return eyes.close(throwEx).then(function (res) {
        //         console.log(">> Test Result <<");
        //         console.log(res);
        //         console.log(res.appUrls.session);
        //     });
        // });
    },
    //
    // Hook that gets executed before the suite starts
    //beforeSuite: function (suite) {
    //    console.log("beforeSuite");
    //},
    //
    // Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
    // beforeEach in Mocha)
    //beforeHook: function () {
    //    console.log("beforeHook");
    //},
    //
    // Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
    // afterEach in Mocha)
    // afterHook: function () {
    // },
    //
    // Function to be executed before a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
    //beforeTest: function (test) {
    //    console.log("beforeTest");
    //},
    //
    // Runs before a WebdriverIO command gets executed.
    // beforeCommand: function (commandName, args) {
    // },
    //
    // Runs after a WebdriverIO command gets executed
    // afterCommand: function (commandName, args, result, error) {
    // },
    //
    // Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
    // afterTest: function (test) {
    // },
    //
    // Hook that gets executed after the suite has ended
    // afterSuite: function (suite) {
    // },
    //
    // Gets executed after all tests are done. You still have access to all global variables from
    // the test.
    // after: function (result, capabilities, specs) {
    // },
    //
    // Gets executed after all workers got shut down and the process is about to exit. It is not
    // possible to defer the end of the process using a promise.
    // onComplete: function(exitCode) {
    // }
};

// function create_webdirver(server_url, session_id) {
//     var webdriver = require('selenium-webdriver');
//     var http = require('selenium-webdriver/http');
//
//     var commandExecutor = new http.Executor(new http.HttpClient(server_url));
//     return webdriver.WebDriver.attachToSession(commandExecutor, session_id);
// }
//
// // For selenium 3
// function create_webdirver3(server_url, session_id) {
//     var webdriver = require('selenium-webdriver');
//     var _http = require('selenium-webdriver/http');
//     var url = require('url');
//
//     var client = Promise.resolve(url)
//     .then(function (url) {
//       return new _http.HttpClient(server_url, null, null)
//     });
//     var executor = new _http.Executor(client);
//
//     return webdriver.WebDriver.attachToSession(executor, session_id);
// }