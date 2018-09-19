'use strict';

const { GeneralUtils } = require('../utils/GeneralUtils');

class SessionResults {
  constructor() {
    this._id = undefined;
    this._revision = undefined;
    this._runningSessionId = undefined;
    this._isAborted = undefined;
    this._isStarred = undefined;
    this._startInfo = undefined;
    this._batchId = undefined;
    this._secretToken = undefined;
    this._state = undefined;
    this._status = undefined;
    this._isDefaultStatus = undefined;
    this._startedAt = undefined;
    this._duration = undefined;
    this._isDifferent = undefined;
    this._env = undefined;
    this._branch = undefined;
    this._expectedAppOutput = undefined;
    this._actualAppOutput = undefined;
    this._baselineId = undefined;
    this._baselineRevId = undefined;
    this._scenarioId = undefined;
    this._scenarioName = undefined;
    this._appId = undefined;
    this._baselineModelId = undefined;
    this._baselineEnvId = undefined;
    this._baselineEnv = undefined;
    this._appName = undefined;
    this._baselineBranchName = undefined;
    this._isNew = undefined;
  }

  /**
   * @param {object} object
   * @return {SessionResults}
   */
  static fromObject(object) {
    return GeneralUtils.assignTo(new SessionResults(), object);
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {string} */
  getId() {
    return this._id;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setId(value) {
    this._id = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {Integer} */
  getRevision() {
    return this._revision;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {Integer} value */
  setRevision(value) {
    this._revision = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {string} */
  getRunningSessionId() {
    return this._runningSessionId;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setRunningSessionId(value) {
    this._runningSessionId = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {boolean} */
  getIsAborted() {
    return this._isAborted;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {boolean} value */
  setIsAborted(value) {
    this._isAborted = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {boolean} */
  getIsStarred() {
    return this._isStarred;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {boolean} value */
  setIsStarred(value) {
    this._isStarred = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {StartInfo} */
  getStartInfo() {
    return this._startInfo;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {StartInfo} value */
  setStartInfo(value) {
    this._startInfo = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {string} */
  getBatchId() {
    return this._batchId;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setBatchId(value) {
    this._batchId = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {string} */
  getSecretToken() {
    return this._secretToken;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setSecretToken(value) {
    this._secretToken = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {string} */
  getState() {
    return this._state;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setState(value) {
    this._state = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {string} */
  getStatus() {
    return this._status;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setStatus(value) {
    this._status = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {boolean} */
  getIsDefaultStatus() {
    return this._isDefaultStatus;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {boolean} value */
  setIsDefaultStatus(value) {
    this._isDefaultStatus = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {string} */
  getStartedAt() {
    return this._startedAt;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setStartedAt(value) {
    this._startedAt = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {Integer} */
  getDuration() {
    return this._duration;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {Integer} value */
  setDuration(value) {
    this._duration = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {boolean} */
  getIsDifferent() {
    return this._isDifferent;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {boolean} value */
  setIsDifferent(value) {
    this._isDifferent = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {AppEnvironment} */
  getEnv() {
    return this._env;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {AppEnvironment} value */
  setEnv(value) {
    this._env = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {Branch} */
  getBranch() {
    return this._branch;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {Branch} value */
  setBranch(value) {
    this._branch = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {ExpectedAppOutput[]} */
  getExpectedAppOutput() {
    return this._expectedAppOutput;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {ExpectedAppOutput[]} value */
  setExpectedAppOutput(value) {
    this._expectedAppOutput = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {ActualAppOutput[]} */
  getActualAppOutput() {
    return this._actualAppOutput;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {ActualAppOutput[]} value */
  setActualAppOutput(value) {
    this._actualAppOutput = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {string} */
  getBaselineId() {
    return this._baselineId;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setBaselineId(value) {
    this._baselineId = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {string} */
  getBaselineRevId() {
    return this._baselineRevId;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setBaselineRevId(value) {
    this._baselineRevId = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {string} */
  getScenarioId() {
    return this._scenarioId;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setScenarioId(value) {
    this._scenarioId = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {string} */
  getScenarioName() {
    return this._scenarioName;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setScenarioName(value) {
    this._scenarioName = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {string} */
  getAppId() {
    return this._appId;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setAppId(value) {
    this._appId = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {string} */
  getBaselineModelId() {
    return this._baselineModelId;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setBaselineModelId(value) {
    this._baselineModelId = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {string} */
  getBaselineEnvId() {
    return this._baselineEnvId;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setBaselineEnvId(value) {
    this._baselineEnvId = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {AppEnvironment} */
  getBaselineEnv() {
    return this._baselineEnv;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {AppEnvironment} value */
  setBaselineEnv(value) {
    this._baselineEnv = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {string} */
  getAppName() {
    return this._appName;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setAppName(value) {
    this._appName = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {string} */
  getBaselineBranchName() {
    return this._baselineBranchName;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setBaselineBranchName(value) {
    this._baselineBranchName = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {boolean} */
  getIsNew() {
    return this._isNew;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {boolean} value */
  setIsNew(value) {
    this._isNew = value;
  }

  /** @override */
  toJSON() {
    return GeneralUtils.toPlain(this);
  }

  /** @override */
  toString() {
    return `SessionResults { ${JSON.stringify(this)} }`;
  }
}

exports.SessionResults = SessionResults;
