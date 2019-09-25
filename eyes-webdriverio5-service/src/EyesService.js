'use strict';

const {Eyes, Target} = require('@applitools/eyes-webdriverio');


const DEFAULT_VIEWPORT = {
    width: 800,
    height: 600
};

class EyesService {
    constructor() {
        this._eyes = new Eyes();

        this._eyes.setHideScrollbars(true);
    }

    /**
     * Gets executed just before initialising the webdriver session and test framework.
     * It allows you to manipulate configurations depending on the capability or spec.
     *
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    beforeSession(config, capabilities, specs) {
        this._eyesConfig = config.eyes;
        if (this._eyesConfig) {
            this._eyes.setConfiguration(this._eyesConfig);
        }
    }

    /**
     * Gets executed before test execution begins. At this point you can access to all global variables like `browser`.
     * It is the perfect place to define custom commands.
     *
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    before(capabilities, specs) {
        global.browser.addCommand('eyesCheck', async (title, checkSettings = Target.window().fully()) => {
            await this._eyesOpen();

            const matchResult = await this._eyes.check(title, checkSettings);
            if (this._eyesConfig.throwErrorIfNotAsExpected && !matchResult.getAsExpected()) {
                throw new Error('Eyes detected visual mismatch!');
            }
            return matchResult;
        });

        // deprecated, alias of eyesCheck
        global.browser.addCommand('eyesCheckWindow', async (title, checkSettings) => {
            return global.browser.eyesCheck(title, checkSettings);
        });

        global.browser.addCommand('eyesSetScrollRootElement', (element) => {
            return this._eyes.setScrollRootElement(element);
        });

        global.browser.addCommand('eyesAddProperty', (key, value) => {
            return this._eyes.addProperty(key, value);
        });

        global.browser.addCommand('eyesClearProperties', () => {
            return this._eyes.clearProperties();
        });

        global.browser.addCommand('eyesGetTestResults', async () => {
            // because `afterTest` executes after `afterEach`, this is the way to get results in `afterEach` or `it`
            await this._eyesClose();
            return this._testResults;
        });

        global.browser.addCommand('eyesSetConfiguration', (configuration) => {
            return this._eyes.setConfiguration(configuration);
        });

        global.browser.addCommand('eyesGetIsOpen', () => {
            return this._eyes.getIsOpen();
        });

        global.browser.addCommand('eyesGetConfiguration', () => {
            return this._eyes.getConfiguration();
        });

        global.browser.addCommand('eyesGetAllTestResults', async () => {
            return this._eyes.getRunner().getAllTestResults();
        });
    }

    /**
     * Function to be executed before a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
     *
     * @param {Object} test test details
     */
    async beforeTest(test) {
        this._currentTestSuite = test.parent;
        this._currentTestName = test.title;
    }

    /**
     * Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) ends.
     * This function will be executed after `afterEach` (in Mocha).
     *
     * @param {Object} test test details
     */
    async afterTest(test) {
        await global.browser.call(async () => this._eyesClose());
    }

    /**
     * Gets executed after all tests are done. You still have access to all global variables from the test.
     *
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    async after(result, capabilities, specs) {
        await global.browser.call(async () => this._eyes.abort());
    }

    async _eyesOpen() {
        if (!this._eyes.getIsOpen()) {
            this._testResults = null;

            const appName = this._eyes.getConfiguration().getAppName() || this._currentTestSuite;
            const testName = this._eyes.getConfiguration().getTestName() || this._currentTestName;
            const viewport = this._eyes.getConfiguration().getViewportSize() || DEFAULT_VIEWPORT;

            await global.browser.call(async () => this._eyes.open(global.browser, appName, testName, viewport));
        }
    }

    async _eyesClose() {
        if (this._eyes.getIsOpen()) {
            this._testResults = await this._eyes.close(false);
        }
        return this._testResults;
    }
}

exports.EyesService = EyesService;
