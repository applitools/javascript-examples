'use strict';

const { GeneralUtils } = require('../utils/GeneralUtils');

/**
 * Handles log messages produces by the Eyes API.
 *
 * @abstract
 */
class LogHandler {
  constructor() {
    this._isVerbose = false;
    this._isPrintSessionId = false;
    this._sessionId = undefined;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * Whether to handle or ignore verbose log messages.
   *
   * @param {boolean} isVerbose
   */
  setIsVerbose(isVerbose) {
    // noinspection PointlessBooleanExpressionJS
    this._isVerbose = !!isVerbose;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * Whether to handle or ignore verbose log messages.
   *
   * @return {boolean} isVerbose
   */
  getIsVerbose() {
    return this._isVerbose;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * If set to {@code true} then log output include session id, useful in multi-thread environment
   *
   * @param {boolean} [isPrintSessionId=false]
   */
  setPrintSessionId(isPrintSessionId) {
    this._isPrintSessionId = isPrintSessionId || false;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {boolean}
   */
  getIsPrintSessionId() {
    return this._isPrintSessionId;
  }

  /**
   * @param {string} sessionId
   */
  setSessionId(sessionId) {
    this._sessionId = sessionId;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {string}
   */
  getSessionId() {
    return this._sessionId;
  }

  /**
   * @protected
   * @param {string} logString
   */
  formatMessage(logString) {
    let eyes = 'Eyes:';
    if (this._isPrintSessionId) {
      eyes = `Eyes[${this._sessionId}]:`;
    }

    return `${GeneralUtils.toISO8601DateTime()} ${eyes} ${logString}`;
  }

  /**
   * @abstract
   */
  open() {}

  /**
   * @abstract
   */
  close() {}

  /**
   * @abstract
   * @param {boolean} verbose
   * @param {string} logString
   */
  onMessage(verbose, logString) {}
}

exports.LogHandler = LogHandler;
