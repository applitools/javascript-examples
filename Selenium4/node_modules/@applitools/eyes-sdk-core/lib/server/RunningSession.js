'use strict';

const { GeneralUtils } = require('@applitools/eyes-common');

const { RenderingInfo } = require('./RenderingInfo');

/**
 * Encapsulates data for the session currently running in the agent.
 */
class RunningSession {
  /**
   * @param {string} id
   * @param {string} sessionId
   * @param {string} batchId
   * @param {string} baselineId
   * @param {string} url
   * @param {RenderingInfo|object} renderingInfo
   */
  constructor({ id, sessionId, batchId, baselineId, url, renderingInfo } = {}) {
    if (renderingInfo && !(renderingInfo instanceof RenderingInfo)) {
      renderingInfo = new RenderingInfo(renderingInfo);
    }

    this._id = id;
    this._sessionId = sessionId;
    this._batchId = batchId;
    this._baselineId = baselineId;
    this._url = url;
    this._renderingInfo = renderingInfo;

    this._isNewSession = false;
  }

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
   * @return {string}
   */
  getSessionId() {
    return this._sessionId;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {string} value
   */
  setSessionId(value) {
    this._sessionId = value;
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

  /**
   * @return {string}
   */
  getUrl() {
    return this._url;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {string} value
   */
  setUrl(value) {
    this._url = value;
  }

  /**
   * @return {RenderingInfo}
   */
  getRenderingInfo() {
    return this._renderingInfo;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {RenderingInfo} value
   */
  setRenderingInfo(value) {
    this._renderingInfo = value;
  }

  /**
   * @return {boolean}
   */
  getIsNewSession() {
    return this._isNewSession;
  }

  /**
   * @param {boolean} value
   */
  setNewSession(value) {
    this._isNewSession = value;
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
    return `RunningSession { ${JSON.stringify(this)} }`;
  }
}

exports.RunningSession = RunningSession;
