'use strict';

const { GeneralUtils } = require('@applitools/eyes-common');

/**
 * The result of a window match by the agent.
 */
class MatchResult {
  /**
   * @param {boolean} [asExpected]
   * @param {number} [windowId]
   */
  constructor({ asExpected, windowId } = {}) {
    this._asExpected = asExpected;
    this._windowId = windowId;
  }

  /**
   * @return {boolean}
   */
  getAsExpected() {
    return this._asExpected;
  }

  /**
   * @param {boolean} value
   */
  setAsExpected(value) {
    this._asExpected = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {number}
   */
  getWindowId() {
    return this._windowId;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {number} value
   */
  setWindowId(value) {
    this._windowId = value;
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
    return `MatchResult { ${JSON.stringify(this)} }`;
  }
}

exports.MatchResult = MatchResult;
