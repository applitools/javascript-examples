'use strict';

const { GeneralUtils } = require('../utils/GeneralUtils');
const { RenderingInfo } = require('./RenderingInfo');

/**
 * Encapsulates data for the session currently running in the agent.
 */
class RunningSession {
  constructor() {
    this._id = undefined;
    this._sessionId = undefined;
    this._batchId = undefined;
    this._baselineId = undefined;
    this._url = undefined;
    this._renderingInfo = undefined;

    this._isNewSession = false;
  }

  /**
   * @param {object} object
   * @return {RunningSession}
   */
  static fromObject(object) {
    return GeneralUtils.assignTo(new RunningSession(), object, {
      renderingInfo: RenderingInfo.fromObject,
    });
  }

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
  /** @return {string} */
  getSessionId() {
    return this._sessionId;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setSessionId(value) {
    this._sessionId = value;
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
  getBaselineId() {
    return this._baselineId;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setBaselineId(value) {
    this._baselineId = value;
  }

  /** @return {string} */
  getUrl() {
    return this._url;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setUrl(value) {
    this._url = value;
  }

  /** @return {RenderingInfo} */
  getRenderingInfo() {
    return this._renderingInfo;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {RenderingInfo} value */
  setRenderingInfo(value) {
    this._renderingInfo = value;
  }

  /** @return {boolean} */
  getIsNewSession() {
    return this._isNewSession;
  }

  /** @param {boolean} value */
  setNewSession(value) {
    this._isNewSession = value;
  }

  /** @override */
  toJSON() {
    return GeneralUtils.toPlain(this);
  }

  /** @override */
  toString() {
    return `RunningSession { ${JSON.stringify(this)} }`;
  }
}

exports.RunningSession = RunningSession;
