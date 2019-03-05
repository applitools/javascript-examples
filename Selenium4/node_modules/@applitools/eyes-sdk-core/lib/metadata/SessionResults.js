'use strict';

const { GeneralUtils } = require('@applitools/eyes-common');

const { ActualAppOutput } = require('./ActualAppOutput');
const { ExpectedAppOutput } = require('./ExpectedAppOutput');
const { Branch } = require('./Branch');
const { StartInfo } = require('./StartInfo');
const { AppEnvironment } = require('../AppEnvironment');

class SessionResults {
  // noinspection FunctionWithMoreThanThreeNegationsJS
  /**
   * @param {string} id
   * @param {number} revision
   * @param {string} runningSessionId
   * @param {boolean} isAborted
   * @param {boolean} isStarred
   * @param {StartInfo|object} startInfo
   * @param {string} batchId
   * @param {string} secretToken
   * @param {string} state
   * @param {string} status
   * @param {string} isDefaultStatus
   * @param {string} startedAt
   * @param {number} duration
   * @param {boolean} isDifferent
   * @param {AppEnvironment|object} env
   * @param {Branch|object} branch
   * @param {ExpectedAppOutput[]|object[]} expectedAppOutput
   * @param {ActualAppOutput[]|object[]} actualAppOutput
   * @param {string} baselineId
   * @param {string} baselineRevId
   * @param {string} scenarioId
   * @param {string} scenarioName
   * @param {string} appId
   * @param {string} baselineModelId
   * @param {string} baselineEnvId
   * @param {AppEnvironment|object} baselineEnv
   * @param {string} appName
   * @param {string} baselineBranchName
   * @param {boolean} isNew
   */
  constructor({ id, revision, runningSessionId, isAborted, isStarred, startInfo, batchId, secretToken, state, status,
    isDefaultStatus, startedAt, duration, isDifferent, env, branch, expectedAppOutput, actualAppOutput, baselineId,
    baselineRevId, scenarioId, scenarioName, appId, baselineModelId, baselineEnvId, baselineEnv, appName,
    baselineBranchName, isNew } = {}) {
    if (env && !(env instanceof AppEnvironment)) {
      env = new AppEnvironment(env);
    }

    if (baselineEnv && !(baselineEnv instanceof AppEnvironment)) {
      baselineEnv = new AppEnvironment(baselineEnv);
    }

    if (branch && !(branch instanceof Branch)) {
      branch = new Branch(branch);
    }

    if (startInfo && !(startInfo instanceof StartInfo)) {
      startInfo = new StartInfo(startInfo);
    }

    if (actualAppOutput && actualAppOutput.length > 0 && !(actualAppOutput[0] instanceof ActualAppOutput)) {
      actualAppOutput = actualAppOutput.map(output => new ActualAppOutput(output));
    }

    if (expectedAppOutput && expectedAppOutput.length > 0 && !(expectedAppOutput[0] instanceof ExpectedAppOutput)) {
      expectedAppOutput = expectedAppOutput.map(output => new ExpectedAppOutput(output));
    }

    this._id = id;
    this._revision = revision;
    this._runningSessionId = runningSessionId;
    this._isAborted = isAborted;
    this._isStarred = isStarred;
    this._startInfo = startInfo;
    this._batchId = batchId;
    this._secretToken = secretToken;
    this._state = state;
    this._status = status;
    this._isDefaultStatus = isDefaultStatus;
    this._startedAt = startedAt;
    this._duration = duration;
    this._isDifferent = isDifferent;
    this._env = env;
    this._branch = branch;
    this._expectedAppOutput = expectedAppOutput;
    this._actualAppOutput = actualAppOutput;
    this._baselineId = baselineId;
    this._baselineRevId = baselineRevId;
    this._scenarioId = scenarioId;
    this._scenarioName = scenarioName;
    this._appId = appId;
    this._baselineModelId = baselineModelId;
    this._baselineEnvId = baselineEnvId;
    this._baselineEnv = baselineEnv;
    this._appName = appName;
    this._baselineBranchName = baselineBranchName;
    this._isNew = isNew;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {string}
   */
  getId() {
    return this._id;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {string} value
   */
  setId(value) {
    this._id = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {number}
   */
  getRevision() {
    return this._revision;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {number} value
   */
  setRevision(value) {
    this._revision = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {string}
   */
  getRunningSessionId() {
    return this._runningSessionId;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {string} value
   */
  setRunningSessionId(value) {
    this._runningSessionId = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {boolean}
   */
  getIsAborted() {
    return this._isAborted;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {boolean} value
   */
  setIsAborted(value) {
    this._isAborted = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {boolean}
   */
  getIsStarred() {
    return this._isStarred;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {boolean} value
   */
  setIsStarred(value) {
    this._isStarred = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {StartInfo}
   */
  getStartInfo() {
    return this._startInfo;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {StartInfo} value
   */
  setStartInfo(value) {
    this._startInfo = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {string}
   */
  getBatchId() {
    return this._batchId;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {string} value
   */
  setBatchId(value) {
    this._batchId = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {string}
   */
  getSecretToken() {
    return this._secretToken;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {string} value
   */
  setSecretToken(value) {
    this._secretToken = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {string}
   */
  getState() {
    return this._state;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {string} value
   */
  setState(value) {
    this._state = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {string}
   */
  getStatus() {
    return this._status;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {string} value
   */
  setStatus(value) {
    this._status = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {boolean}
   */
  getIsDefaultStatus() {
    return this._isDefaultStatus;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {boolean} value
   */
  setIsDefaultStatus(value) {
    this._isDefaultStatus = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {string}
   */
  getStartedAt() {
    return this._startedAt;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {string} value
   */
  setStartedAt(value) {
    this._startedAt = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {number}
   */
  getDuration() {
    return this._duration;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {number} value
   */
  setDuration(value) {
    this._duration = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {boolean}
   */
  getIsDifferent() {
    return this._isDifferent;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {boolean} value
   */
  setIsDifferent(value) {
    this._isDifferent = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {AppEnvironment}
   */
  getEnv() {
    return this._env;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {AppEnvironment} value
   */
  setEnv(value) {
    this._env = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {Branch}
   */
  getBranch() {
    return this._branch;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {Branch} value
   */
  setBranch(value) {
    this._branch = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {ExpectedAppOutput[]}
   */
  getExpectedAppOutput() {
    return this._expectedAppOutput;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {ExpectedAppOutput[]} value
   */
  setExpectedAppOutput(value) {
    this._expectedAppOutput = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {ActualAppOutput[]}
   */
  getActualAppOutput() {
    return this._actualAppOutput;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {ActualAppOutput[]} value
   */
  setActualAppOutput(value) {
    this._actualAppOutput = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {string}
   */
  getBaselineId() {
    return this._baselineId;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {string} value
   */
  setBaselineId(value) {
    this._baselineId = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {string}
   */
  getBaselineRevId() {
    return this._baselineRevId;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {string} value
   */
  setBaselineRevId(value) {
    this._baselineRevId = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {string}
   */
  getScenarioId() {
    return this._scenarioId;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {string} value
   */
  setScenarioId(value) {
    this._scenarioId = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {string}
   */
  getScenarioName() {
    return this._scenarioName;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {string} value
   */
  setScenarioName(value) {
    this._scenarioName = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {string}
   */
  getAppId() {
    return this._appId;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {string} value
   */
  setAppId(value) {
    this._appId = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {string}
   */
  getBaselineModelId() {
    return this._baselineModelId;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {string} value
   */
  setBaselineModelId(value) {
    this._baselineModelId = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {string}
   */
  getBaselineEnvId() {
    return this._baselineEnvId;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {string} value
   */
  setBaselineEnvId(value) {
    this._baselineEnvId = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {AppEnvironment}
   */
  getBaselineEnv() {
    return this._baselineEnv;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {AppEnvironment} value
   */
  setBaselineEnv(value) {
    this._baselineEnv = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {string}
   */
  getAppName() {
    return this._appName;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {string} value
   */
  setAppName(value) {
    this._appName = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {string}
   */
  getBaselineBranchName() {
    return this._baselineBranchName;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {string} value
   */
  setBaselineBranchName(value) {
    this._baselineBranchName = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {boolean}
   */
  getIsNew() {
    return this._isNew;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {boolean} value
   */
  setIsNew(value) {
    this._isNew = value;
  }

  /**
   * @override
   */
  toJSON() {
    return GeneralUtils.toPlain(this);
  }

  /**
   * @override
   */
  toString() {
    return `SessionResults { ${JSON.stringify(this)} }`;
  }
}

exports.SessionResults = SessionResults;
