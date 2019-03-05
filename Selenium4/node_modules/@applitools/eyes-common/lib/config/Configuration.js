'use strict';

const { BatchInfo } = require('./BatchInfo');
const { PropertyData } = require('./PropertyData');
const { ProxySettings } = require('./ProxySettings');
const { RectangleSize } = require('../geometry/RectangleSize');
const { ArgumentGuard } = require('../utils/ArgumentGuard');
const { TypeUtils } = require('../utils/TypeUtils');

const MIN_MATCH_TIMEOUT = 500;

const DEFAULT_VALUES = {
  isDisabled: false,
  matchTimeout: 2000, // ms
  serverUrl: 'https://eyesapi.applitools.com',
  compareWithParentBranch: false,
  saveFailedTests: false,
  saveNewTests: true,
  ignoreBaseline: false,
  properties: [],
};

class Configuration {
  /**
   * @param {Configuration} [configuration]
   */
  constructor(configuration) {
    /** @type {boolean} */ this._showLogs = undefined;
    /** @type {boolean} */ this._saveDebugData = undefined;

    /** @type {string} */ this._appName = undefined;
    /** @type {string} */ this._testName = undefined;
    /** @type {boolean} */ this._isDisabled = undefined;
    /** @type {number} */ this._matchTimeout = undefined;
    /** @type {SessionType} */ this._sessionType = undefined;
    /** @type {RectangleSize} */ this._viewportSize = undefined;
    /** @type {string} */ this._agentId = undefined;

    /** @type {string} */ this._apiKey = undefined;
    /** @type {string} */ this._serverUrl = undefined;
    /** @type {ProxySettings} */ this._proxySettings = undefined;
    /** @type {number} */ this._connectionTimeout = undefined;
    /** @type {boolean} */ this._removeSession = undefined;

    /** @type {BatchInfo} */ this._batch = undefined;

    /** @type {PropertyData[]} */ this._properties = undefined;

    /** @type {string} */ this._baselineEnvName = undefined;
    /** @type {string} */ this._environmentName = undefined;

    /** @type {string} */ this._branchName = undefined;
    /** @type {string} */ this._parentBranchName = undefined;
    /** @type {string} */ this._baselineBranchName = undefined;
    /** @type {boolean} */ this._compareWithParentBranch = undefined;

    /** @type {boolean} */ this._saveFailedTests = undefined;
    /** @type {boolean} */ this._saveNewTests = undefined;
    /** @type {boolean} */ this._ignoreBaseline = undefined;
    /** @type {boolean} */ this._saveDiffs = undefined;

    if (configuration) {
      this.mergeConfig(configuration);
    }
  }

  /**
   * @return {boolean}
   */
  getShowLogs() {
    return this._showLogs;
  }

  /**
   * @param showLogs {boolean}
   */
  setShowLogs(showLogs) {
    ArgumentGuard.isBoolean(showLogs, 'showLogs');
    this._showLogs = showLogs;
  }

  /**
   * @return {boolean}
   */
  getSaveDebugData() {
    return this._saveDebugData;
  }

  /**
   * @param saveDebugData {boolean}
   */
  setSaveDebugData(saveDebugData) {
    ArgumentGuard.isBoolean(saveDebugData, 'saveDebugData');
    this._saveDebugData = saveDebugData;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {string} The currently set API key or {@code null} if no key is set.
   */
  getApiKey() {
    return TypeUtils.getOrDefault(this._apiKey, process.env.APPLITOOLS_API_KEY);
  }

  /**
   * Sets the API key of your applitools Eyes account.
   *
   * @param apiKey {string} The api key to be used.
   */
  setApiKey(apiKey) {
    ArgumentGuard.isString(apiKey, 'apiKey');
    ArgumentGuard.alphanumeric(apiKey, 'apiKey');
    this._apiKey = apiKey;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {string} The URI of the eyes server.
   */
  getServerUrl() {
    return TypeUtils.getOrDefault(this._serverUrl, process.env.APPLITOOLS_SERVER_URL || DEFAULT_VALUES.serverUrl);
  }

  /**
   * Sets the current server URL used by the rest client.
   *
   * @param serverUrl {string} The URI of the rest server, or {@code null} to use the default server.
   */
  setServerUrl(serverUrl) {
    ArgumentGuard.isString(serverUrl, 'serverUrl', false);
    this._serverUrl = serverUrl;
  }

  /**
   * @return {ProxySettings} The current proxy settings, or {@code undefined} if no proxy is set.
   */
  getProxy() {
    return this._proxySettings;
  }

  /**
   * Sets the proxy settings to be used by the rest client.
   *
   * @param {ProxySettings|string|boolean} varArg The ProxySettings object or proxy url to be used.
   *  Use {@code false} to disable proxy (even if it set via env variables). Use {@code null} to reset proxy settings.
   * @param {string} [username]
   * @param {string} [password]
   */
  setProxy(varArg, username, password) {
    if (TypeUtils.isNull(varArg)) {
      this._proxySettings = undefined;
      return;
    }

    if (varArg === false) {
      this._proxySettings = new ProxySettings(varArg);
      return;
    }

    if (varArg instanceof ProxySettings) {
      this._proxySettings = varArg;
    } else {
      this._proxySettings = new ProxySettings(varArg, username, password);
    }
  }

  /**
   * @return {number} The timeout for web requests (in milliseconds).
   */
  getConnectionTimeout() {
    return this._connectionTimeout;
  }

  /**
   * Sets the connect and read timeouts for web requests.
   *
   * @param {number} connectionTimeout Connect/Read timeout in milliseconds. 0 equals infinity.
   */
  setConnectionTimeout(connectionTimeout) {
    ArgumentGuard.greaterThanOrEqualToZero(connectionTimeout, 'connectionTimeout', true);
    this._connectionTimeout = connectionTimeout;
  }

  /**
   * @return {boolean} Whether sessions are removed immediately after they are finished.
   */
  getRemoveSession() {
    return this._removeSession;
  }

  /**
   * Whether sessions are removed immediately after they are finished.
   *
   * @param {boolean} removeSession
   */
  setRemoveSession(removeSession) {
    ArgumentGuard.isBoolean(removeSession, 'removeSession');
    this._removeSession = removeSession;
  }

  /**
   * @return {boolean} The currently compareWithParentBranch value
   */
  getCompareWithParentBranch() {
    return TypeUtils.getOrDefault(this._compareWithParentBranch, DEFAULT_VALUES.compareWithParentBranch);
  }

  /**
   * @param {boolean} compareWithParentBranch New compareWithParentBranch value, default is false
   */
  setCompareWithParentBranch(compareWithParentBranch) {
    ArgumentGuard.isBoolean(compareWithParentBranch, 'compareWithParentBranch');
    this._compareWithParentBranch = compareWithParentBranch;
  }

  /**
   * @return {boolean} The currently ignoreBaseline value
   */
  getIgnoreBaseline() {
    return TypeUtils.getOrDefault(this._ignoreBaseline, DEFAULT_VALUES.ignoreBaseline);
  }

  /**
   * @param {boolean} ignoreBaseline New ignoreBaseline value, default is false
   */
  setIgnoreBaseline(ignoreBaseline) {
    ArgumentGuard.isBoolean(ignoreBaseline, 'ignoreBaseline');
    this._ignoreBaseline = ignoreBaseline;
  }

  /**
   * @return {boolean} True if new tests are saved by default.
   */
  getSaveNewTests() {
    return TypeUtils.getOrDefault(this._saveNewTests, DEFAULT_VALUES.saveNewTests);
  }

  /**
   * Used for automatic save of a test run. New tests are automatically saved by default.
   *
   * @param {boolean} saveNewTests True if new tests should be saved by default. False otherwise.
   */
  setSaveNewTests(saveNewTests) {
    ArgumentGuard.isBoolean(saveNewTests, 'saveNewTests');
    this._saveNewTests = saveNewTests;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {boolean} True if failed tests are saved by default.
   */
  getSaveFailedTests() {
    return TypeUtils.getOrDefault(this._saveFailedTests, DEFAULT_VALUES.saveFailedTests);
  }

  /**
   * Set whether or not failed tests are saved by default.
   *
   * @param {boolean} saveFailedTests True if failed tests should be saved by default, false otherwise.
   */
  setSaveFailedTests(saveFailedTests) {
    ArgumentGuard.isBoolean(saveFailedTests, 'saveFailedTests');
    this._saveFailedTests = saveFailedTests;
  }

  /**
   * @return {number} The maximum time in ms {@link #checkWindowBase(RegionProvider, string, boolean, number)} waits
   *   for a match.
   */
  getMatchTimeout() {
    return TypeUtils.getOrDefault(this._matchTimeout, DEFAULT_VALUES.matchTimeout);
  }

  /**
   * Sets the maximum time (in ms) a match operation tries to perform a match.
   * @param {number} matchTimeout Total number of ms to wait for a match.
   */
  setMatchTimeout(matchTimeout) {
    ArgumentGuard.greaterThanOrEqualToZero(matchTimeout, 'matchTimeout', true);

    if (matchTimeout !== 0 && MIN_MATCH_TIMEOUT > matchTimeout) {
      throw new TypeError(`Match timeout must be set in milliseconds, and must be > ${MIN_MATCH_TIMEOUT}`);
    }

    this._matchTimeout = matchTimeout;
  }

  /**
   * @return {boolean} Whether eyes is disabled.
   */
  getIsDisabled() {
    return TypeUtils.getOrDefault(this._isDisabled, DEFAULT_VALUES.isDisabled);
  }

  /**
   * @param isDisabled {boolean} If true, all interactions with this API will be silently ignored.
   */
  setIsDisabled(isDisabled) {
    ArgumentGuard.isBoolean(isDisabled, 'isDisabled', false);
    this._isDisabled = isDisabled;
  }

  /**
   * @return {BatchInfo}
   */
  getBatch() {
    if (this._batch === undefined) {
      this._batch = new BatchInfo();
    }

    return this._batch;
  }

  /**
   * Sets the batch in which context future tests will run or {@code null} if tests are to run standalone.
   *
   * @param {BatchInfo|string} batchOrName - the batch name or batch object
   * @param {string} [batchId] - ID of the batch, should be generated using GeneralUtils.guid()
   * @param {string} [batchDate] - start date of the batch, can be created as new Date().toUTCString()
   */
  setBatch(batchOrName, batchId, batchDate) {
    if (TypeUtils.isNull(batchOrName)) {
      this._batch = undefined;
    } else {
      this._batch = new BatchInfo(batchOrName, batchId, batchDate);
    }
  }

  /**
   * @return {PropertyData[]}
   */
  getProperties() {
    return TypeUtils.getOrDefault(this._properties, DEFAULT_VALUES.properties);
  }

  /**
   * @param {PropertyData[]} properties
   */
  setProperties(properties) {
    ArgumentGuard.isArray(properties, 'properties');
    this._properties = properties;
  }

  /**
   * Adds a property to be sent to the server.
   *
   * @param {PropertyData|string} propertyOrName The property name or PropertyData object.
   * @param {string} [propertyValue] The property value.
   */
  addProperty(propertyOrName, propertyValue) {
    if (!(propertyOrName instanceof PropertyData)) {
      ArgumentGuard.isString(propertyOrName, 'propertyName');
      ArgumentGuard.notNull(propertyValue, 'propertyValue');
      propertyOrName = new PropertyData(propertyOrName, propertyValue);
    }

    if (this._properties === undefined) {
      this._properties = [];
    }

    this._properties.push(propertyOrName);
  }

  /**
   * @return {string}
   */
  getBranchName() {
    return TypeUtils.getOrDefault(this._branchName, process.env.APPLITOOLS_BRANCH);
  }

  /**
   * @param {string} branchName
   */
  setBranchName(branchName) {
    ArgumentGuard.isString(branchName, 'branchName');
    this._branchName = branchName;
  }

  /**
   * @return {string}
   */
  getAgentId() {
    return this._agentId;
  }

  /**
   * @param {string} agentId
   */
  setAgentId(agentId) {
    ArgumentGuard.isString(agentId, 'agentId');
    this._agentId = agentId;
  }

  /**
   * @return {string}
   */
  getParentBranchName() {
    return TypeUtils.getOrDefault(this._parentBranchName, process.env.APPLITOOLS_PARENT_BRANCH);
  }

  /**
   * @param {string} parentBranchName
   */
  setParentBranchName(parentBranchName) {
    ArgumentGuard.isString(parentBranchName, 'parentBranchName');
    this._parentBranchName = parentBranchName;
  }

  /**
   * @return {string}
   */
  getBaselineBranchName() {
    return TypeUtils.getOrDefault(this._baselineBranchName, process.env.APPLITOOLS_BASELINE_BRANCH);
  }

  /**
   * @param {string} baselineBranchName
   */
  setBaselineBranchName(baselineBranchName) {
    ArgumentGuard.isString(baselineBranchName, 'baselineBranchName');
    this._baselineBranchName = baselineBranchName;
  }

  /**
   * @return {string}
   */
  getBaselineEnvName() {
    return this._baselineEnvName;
  }

  /**
   * @param {string} baselineEnvName
   */
  setBaselineEnvName(baselineEnvName) {
    ArgumentGuard.isString(baselineEnvName, 'baselineEnvName');
    this._baselineEnvName = baselineEnvName;
  }

  /**
   * @return {string}
   */
  getEnvironmentName() {
    return this._environmentName;
  }

  /**
   * @param {string} environmentName
   */
  setEnvironmentName(environmentName) {
    ArgumentGuard.isString(environmentName, 'environmentName');
    this._environmentName = environmentName;
  }

  /**
   * @return {boolean}
   */
  getSaveDiffs() {
    return this._saveDiffs;
  }

  /**
   * @param {boolean} saveDiffs
   */
  setSaveDiffs(saveDiffs) {
    ArgumentGuard.isBoolean(saveDiffs, 'saveDiffs');
    this._saveDiffs = saveDiffs;
  }

  /**
   * @return {string}
   */
  getAppName() {
    return this._appName;
  }

  /**
   * The default app name if no current name was provided. If this is {@code null} then there is no default appName.
   *
   * @param {string} appName
   */
  setAppName(appName) {
    ArgumentGuard.isString(appName, 'appName', false);
    this._appName = appName;
  }

  /**
   * @return {string}
   */
  getTestName() {
    return this._testName;
  }

  /**
   * @param {string} testName
   */
  setTestName(testName) {
    ArgumentGuard.isString(testName, 'testName', false);
    this._testName = testName;
  }

  /**
   * @return {RectangleSize}
   */
  getViewportSize() {
    return this._viewportSize;
  }

  /**
   * @param {RectangleSize|RectangleSizeObject} viewportSize
   */
  setViewportSize(viewportSize) {
    if (TypeUtils.isNull(viewportSize)) {
      this._viewportSize = undefined;
    } else {
      this._viewportSize = new RectangleSize(viewportSize);
    }
  }

  /**
   * @return {SessionType}
   */
  getSessionType() {
    return this._sessionType;
  }

  /**
   * @param {SessionType} sessionType
   */
  setSessionType(sessionType) {
    this._sessionType = sessionType;
  }

  /**
   * @return {Configuration} other
   */
  mergeConfig(other) {
    ArgumentGuard.isValidType(other, Configuration);

    Object.keys(other).forEach(prop => {
      if (this.hasOwnProperty(prop) && other[prop] !== undefined) {
        this[prop] = other[prop];
      }
    });
  }

  /**
   * @return {Configuration}
   */
  cloneConfig() {
    return new Configuration(this);
  }
}

exports.Configuration = Configuration;
