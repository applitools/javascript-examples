'use strict';

const ArgumentGuard = require('../ArgumentGuard');
const TestResultsStatus = require('./TestResultsStatus');

/**
 * Eyes test results.
 */
class TestResults {

    constructor() {
        /** @type {String} */
        this.name = null;
        /** @type {String} */
        this.secretToken = null;
        /** @type {String} */
        this.id = null;
        /** @type {TestResultsStatus} */
        this.status = null;
        /** @type {String} */
        this.appName = null;
        /** @type {String} */
        this.batchName = null;
        /** @type {String} */
        this.batchId = null;
        /** @type {String} */
        this.branchName = null;
        /** @type {String} */
        this.hostOS = null;
        /** @type {String} */
        this.hostApp = null;
        /** @type {{width: int, height: width}} */
        this.hostDisplaySize = null;
        /** @type {String} */
        this.startedAt = null;
        /** @type {int} */
        this.duration = null;
        /** @type {Boolean} */
        this.isNew = null;
        /** @type {Boolean} */
        this.isDifferent = null;
        /** @type {Boolean} */
        this.isAborted = null;
        /** @type {Object} */
        this.defaultMatchSettings = null;
        /** @type {{batch: string, session: string}} */
        this.appUrls = null;
        /** @type {{batch: string, session: string}} */
        this.apiUrls = null;
        /** @type {{name: string, isDifferent: boolean, hasBaselineImage: boolean, hasCurrentImage: boolean, appUrls: {step: string}, apiUrls: {baselineImage: string, currentImage: string, diffImage: string}}[]} */
        this.stepsInfo = null;
        /** @type {int} */
        this.steps = null;
        /** @type {int} */
        this.matches = null;
        /** @type {int} */
        this.mismatches = null;
        /** @type {int} */
        this.missing = null;
        /** @type {int} */
        this.exactMatches = null;
        /** @type {int} */
        this.strictMatches = null;
        /** @type {int} */
        this.contentMatches = null;
        /** @type {int} */
        this.layoutMatches = null;
        /** @type {int} */
        this.noneMatches = null;

        /** @type {String} */
        this.url = null;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @return {String}
     */
    getName() {
        return this.name;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @param {String} value
     */
    setName(value) {
        this.name = value;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @return {String}
     */
    getSecretToken() {
        return this.secretToken;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @param {String} value
     */
    setSecretToken(value) {
        this.secretToken = value;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @return {String}
     */
    getId() {
        return this.id;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @param {String} value
     */
    setId(value) {
        this.id = value;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @return {TestResultsStatus}
     */
    getStatus() {
        return this.status;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @param {TestResultsStatus} value
     */
    setStatus(value) {
        this.status = value;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @return {String}
     */
    getAppName() {
        return this.appName;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @param {String} value
     */
    setAppName(value) {
        this.appName = value;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @return {String}
     */
    getBatchName() {
        return this.batchName;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @param {String} value
     */
    setBatchName(value) {
        this.batchName = value;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @return {String}
     */
    getBatchId() {
        return this.batchId;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @param {String} value
     */
    setBatchId(value) {
        this.batchId = value;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @return {String}
     */
    getBranchName() {
        return this.branchName;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @param {String} value
     */
    setBranchName(value) {
        this.branchName = value;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @return {String}
     */
    getHostOS() {
        return this.hostOS;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @param {String} value
     */
    setHostOS(value) {
        this.hostOS = value;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @return {String}
     */
    getHostApp() {
        return this.hostApp;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @param {String} value
     */
    setHostApp(value) {
        this.hostApp = value;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @return {{width: int, height: width}}
     */
    getHostDisplaySize() {
        return this.hostDisplaySize;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @param {{width: int, height: width}} value
     */
    setHostDisplaySize(value) {
        this.hostDisplaySize = value;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @return {String}
     */
    getStartedAt() {
        return this.startedAt;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @param {String} value
     */
    setStartedAt(value) {
        this.startedAt = value;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @return {int}
     */
    getDuration() {
        return this.duration;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @param {int} value
     */
    setDuration(value) {
        this.duration = value;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @return {Boolean} Whether or not this is a new test.
     */
    getIsNew() {
        return this.isNew;
    }

    /**
     * @param {Boolean} value Whether or not this test has an existing baseline.
     */
    setIsNew(value) {
        this.isNew = value;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @return {Boolean}
     */
    getIsDifferent() {
        return this.isDifferent;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @param {Boolean} value
     */
    setIsDifferent(value) {
        this.isDifferent = value;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @return {Object}
     */
    getDefaultMatchSettings() {
        return this.defaultMatchSettings;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @param {Object} value
     */
    setDefaultMatchSettings(value) {
        this.defaultMatchSettings = value;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @return {Boolean}
     */
    getIsAborted() {
        return this.isAborted;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @param {Boolean} value
     */
    setIsAborted(value) {
        this.isAborted = value;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @return {{batch: string, session: string}}
     */
    getAppUrls() {
        return this.appUrls;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @param {{batch: string, session: string}} value
     */
    setAppUrls(value) {
        this.appUrls = value;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @return {{batch: string, session: string}}
     */
    getApiUrls() {
        return this.apiUrls;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @param {{batch: string, session: string}} value
     */
    setApiUrls(value) {
        this.apiUrls = value;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @return {{name: string, isDifferent: boolean, hasBaselineImage: boolean, hasCurrentImage: boolean, appUrls: {step: string}, apiUrls: {baselineImage: string, currentImage: string, diffImage: string}}[]}
     */
    getStepsInfo() {
        return this.stepsInfo;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @param {{name: string, isDifferent: boolean, hasBaselineImage: boolean, hasCurrentImage: boolean, appUrls: {step: string}, apiUrls: {baselineImage: string, currentImage: string, diffImage: string}}[]} value
     */
    setStepsInfo(value) {
        this.stepsInfo = value;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @return {int} The total number of test steps.
     */
    getSteps() {
        return this.steps;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @param {int} value The number of visual checkpoints in the test.
     */
    setSteps(value) {
        ArgumentGuard.greaterThanOrEqualToZero(value, "steps");
        this.steps = value;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @return {int} The total number of test steps that matched the baseline.
     */
    getMatches() {
        return this.matches;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @param value {int} The number of visual matches in the test.
     */
    setMatches(value) {
        ArgumentGuard.greaterThanOrEqualToZero(value, "matches");
        this.matches = value;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @return {int} The total number of test steps that did not match the baseline.
     */
    getMismatches() {
        return this.mismatches;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @param {int} value The number of mismatches in the test.
     */
    setMismatches(value) {
        ArgumentGuard.greaterThanOrEqualToZero(value, "mismatches");
        this.mismatches = value;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @return {int} The total number of baseline test steps that were missing in the test.
     */
    getMissing() {
        return this.missing;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @param {int} value The number of visual checkpoints that were available in the baseline but were not found in the current test.
     */
    setMissing(value) {
        ArgumentGuard.greaterThanOrEqualToZero(value, "missing");
        this.missing = value;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @return {int} The total number of test steps that exactly matched the baseline.
     */
    getExactMatches() {
        return this.exactMatches;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @param {int} value The number of matches performed with match level set to {@link MatchLevel#Exact}
     */
    setExactMatches(value) {
        ArgumentGuard.greaterThanOrEqualToZero(value, "exactMatches");
        this.exactMatches = value;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @return {int} The total number of test steps that strictly matched the
     * baseline.
     */
    getStrictMatches() {
        return this.strictMatches;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @param {int} value The number of matches performed with match level set to {@link MatchLevel#Strict}
     */
    setStrictMatches(value) {
        ArgumentGuard.greaterThanOrEqualToZero(value, "strictMatches");
        this.strictMatches = value;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @return {int} The total number of test steps that matched the baseline by
     * content.
     */
    getContentMatches() {
        return this.contentMatches;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @param {int} value The number of matches performed with match level set to {@link MatchLevel#Content}
     */
    setContentMatches(value) {
        ArgumentGuard.greaterThanOrEqualToZero(value, "contentMatches");
        this.contentMatches = value;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @return {int} The total number of test steps that matched the baseline by layout.
     */
    getLayoutMatches() {
        return this.layoutMatches;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @param {int} value The number of matches performed with match level set to {@link MatchLevel#Layout}
     */
    setLayoutMatches(value) {
        ArgumentGuard.greaterThanOrEqualToZero(value, "layoutMatches");
        this.layoutMatches = value;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @return {int} The total number of test steps that matched the baseline without performing any comparison.
     */
    getNoneMatches() {
        return this.noneMatches;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @param {int} value The number of matches performed with match level set to {@link MatchLevel#None}
     */
    setNoneMatches(value) {
        ArgumentGuard.greaterThanOrEqualToZero(value, "noneMatches");
        this.noneMatches = value;
    }

    /**
     * @return {String} The URL where test results can be viewed.
     */
    getUrl() {
        return this.url;
    }

    /**
     * @param {String} value The URL of the test results.
     */
    setUrl(value) {
        this.url = value;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @return {Boolean} Whether or not this test passed.
     */
    isPassed() {
        return this.status === TestResultsStatus.Passed;
    }

    /** @override */
    toString() {
        const isNewTestStr = this.isNew ? "New test" : "Existing test";
        return `${isNewTestStr} [steps: ${this.steps}, matches: ${this.matches}, mismatches: ${this.mismatches}, missing: ${this.missing}] , URL: ${this.url}, status: ${this.status}`;
    }
}

module.exports = TestResults;
