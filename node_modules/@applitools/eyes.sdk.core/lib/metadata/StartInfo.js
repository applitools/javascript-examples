'use strict';

const { GeneralUtils } = require('../utils/GeneralUtils');

class StartInfo {
  constructor() {
    this._sessionType = undefined;
    this._isTransient = undefined;
    this._ignoreBaseline = undefined;
    this._appIdOrName = undefined;
    this._compareWithParentBranch = undefined;
    this._scenarioIdOrName = undefined;
    this._batchInfo = undefined;
    this._environment = undefined;
    this._matchLevel = undefined;
    this._defaultMatchSettings = undefined;
    this._agentId = undefined;
    this._properties = undefined;
    this._render = undefined;
  }

  /**
   * @param {object} object
   * @return {StartInfo}
   */
  static fromObject(object) {
    return GeneralUtils.assignTo(new StartInfo(), object);
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {string} */
  getSessionType() {
    return this._sessionType;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setSessionType(value) {
    this._sessionType = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {boolean} */
  getIsTransient() {
    return this._isTransient;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {boolean} value */
  setIsTransient(value) {
    this._isTransient = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {string} */
  getAppIdOrName() {
    return this._appIdOrName;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setAppIdOrName(value) {
    this._appIdOrName = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {boolean} */
  getCompareWithParentBranch() {
    return this._compareWithParentBranch;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {boolean} value */
  setCompareWithParentBranch(value) {
    this._compareWithParentBranch = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {string} */
  getScenarioIdOrName() {
    return this._scenarioIdOrName;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setScenarioIdOrName(value) {
    this._scenarioIdOrName = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {BatchInfo} */
  getBatchInfo() {
    return this._batchInfo;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {BatchInfo} value */
  setBatchInfo(value) {
    this._batchInfo = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {AppEnvironment} */
  getEnvironment() {
    return this._environment;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {AppEnvironment} value */
  setEnvironment(value) {
    this._environment = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {string} */
  getMatchLevel() {
    return this._matchLevel;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setMatchLevel(value) {
    this._matchLevel = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {ImageMatchSettings} */
  getDefaultMatchSettings() {
    return this._defaultMatchSettings;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {ImageMatchSettings} value */
  setDefaultMatchSettings(value) {
    this._defaultMatchSettings = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {string} */
  getAgentId() {
    return this._agentId;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setAgentId(value) {
    this._agentId = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {object[]} */
  getProperties() {
    return this._properties;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {object[]} value */
  setProperties(value) {
    this._properties = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {boolean} */
  getRender() {
    return this._render;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {boolean} value */
  setRender(value) {
    this._render = value;
  }

  /** @override */
  toJSON() {
    return GeneralUtils.toPlain(this);
  }

  /** @override */
  toString() {
    return `StartInfo { ${JSON.stringify(this)} }`;
  }
}

exports.StartInfo = StartInfo;
