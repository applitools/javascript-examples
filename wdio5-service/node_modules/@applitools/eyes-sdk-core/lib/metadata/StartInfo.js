'use strict';

const { GeneralUtils } = require('@applitools/eyes-common');

const { ImageMatchSettings } = require('./ImageMatchSettings');
const { BatchInfo } = require('./BatchInfo');
const { AppEnvironment } = require('../AppEnvironment');

class StartInfo {
  /**
   * @param {string} sessionType
   * @param {boolean} isTransient
   * @param {boolean} ignoreBaseline
   * @param {string} appIdOrName
   * @param {boolean} compareWithParentBranch
   * @param {string} scenarioIdOrName
   * @param {BatchInfo|object} batchInfo
   * @param {AppEnvironment|object} environment
   * @param {MatchLevel|string} matchLevel
   * @param {ImageMatchSettings|object} defaultMatchSettings
   * @param {string} agentId
   * @param {object[]} properties
   * @param {boolean} render
   */
  constructor({ sessionType, isTransient, ignoreBaseline, appIdOrName, compareWithParentBranch, scenarioIdOrName,
    batchInfo, environment, matchLevel, defaultMatchSettings, agentId, properties, render } = {}) {
    if (batchInfo && !(batchInfo instanceof BatchInfo)) {
      batchInfo = new BatchInfo(batchInfo);
    }

    if (defaultMatchSettings && !(defaultMatchSettings instanceof ImageMatchSettings)) {
      defaultMatchSettings = new ImageMatchSettings(defaultMatchSettings);
    }

    if (environment && !(environment instanceof AppEnvironment)) {
      environment = new AppEnvironment(environment);
    }

    this._sessionType = sessionType;
    this._isTransient = isTransient;
    this._ignoreBaseline = ignoreBaseline;
    this._appIdOrName = appIdOrName;
    this._compareWithParentBranch = compareWithParentBranch;
    this._scenarioIdOrName = scenarioIdOrName;
    this._batchInfo = batchInfo;
    this._environment = environment;
    this._matchLevel = matchLevel;
    this._defaultMatchSettings = defaultMatchSettings;
    this._agentId = agentId;
    this._properties = properties;
    this._render = render;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {string}
   */
  getSessionType() {
    return this._sessionType;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {string} value
   */
  setSessionType(value) {
    this._sessionType = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {boolean}
   */
  getIsTransient() {
    return this._isTransient;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {boolean} value
   */
  setIsTransient(value) {
    this._isTransient = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {boolean}
   */
  getIgnoreBaseline() {
    return this._ignoreBaseline;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {boolean} value
   */
  setIgnoreBaseline(value) {
    this._ignoreBaseline = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {string}
   */
  getAppIdOrName() {
    return this._appIdOrName;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {string} value
   */
  setAppIdOrName(value) {
    this._appIdOrName = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {boolean}
   */
  getCompareWithParentBranch() {
    return this._compareWithParentBranch;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {boolean} value
   */
  setCompareWithParentBranch(value) {
    this._compareWithParentBranch = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {string}
   */
  getScenarioIdOrName() {
    return this._scenarioIdOrName;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {string} value
   */
  setScenarioIdOrName(value) {
    this._scenarioIdOrName = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {BatchInfo}
   */
  getBatchInfo() {
    return this._batchInfo;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {BatchInfo} value
   */
  setBatchInfo(value) {
    this._batchInfo = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {AppEnvironment}
   */
  getEnvironment() {
    return this._environment;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {AppEnvironment} value
   */
  setEnvironment(value) {
    this._environment = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {string}
   */
  getMatchLevel() {
    return this._matchLevel;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {string} value
   */
  setMatchLevel(value) {
    this._matchLevel = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {ImageMatchSettings}
   */
  getDefaultMatchSettings() {
    return this._defaultMatchSettings;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {ImageMatchSettings} value
   */
  setDefaultMatchSettings(value) {
    this._defaultMatchSettings = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {string}
   */
  getAgentId() {
    return this._agentId;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {string} value
   */
  setAgentId(value) {
    this._agentId = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {object[]}
   */
  getProperties() {
    return this._properties;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {object[]} value
   */
  setProperties(value) {
    this._properties = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {boolean}
   */
  getRender() {
    return this._render;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {boolean} value
   */
  setRender(value) {
    this._render = value;
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
    return `StartInfo { ${JSON.stringify(this)} }`;
  }
}

exports.StartInfo = StartInfo;
