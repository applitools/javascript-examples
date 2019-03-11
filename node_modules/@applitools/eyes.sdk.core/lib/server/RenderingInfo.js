'use strict';

const { GeneralUtils } = require('../utils/GeneralUtils');

class RenderingInfo {
  constructor() {
    this._serviceUrl = undefined;
    this._accessToken = undefined;
    this._resultsUrl = undefined;
  }

  /**
   * @param {object} object
   * @return {RenderingInfo}
   */
  static fromObject(object) {
    return GeneralUtils.assignTo(new RenderingInfo(), object);
  }

  /** @return {string} */
  getServiceUrl() {
    return this._serviceUrl;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setServiceUrl(value) {
    this._serviceUrl = value;
  }

  /** @return {string} */
  getAccessToken() {
    return this._accessToken;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setAccessToken(value) {
    this._accessToken = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {string} */
  getResultsUrl() {
    return this._resultsUrl;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setResultsUrl(value) {
    this._resultsUrl = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {{sub: string, exp: number, iss: string}} */
  getDecodedAccessToken() {
    if (this._payload) {
      this._payload = GeneralUtils.jwtDecode(this._accessToken);
    }
    return this._payload;
  }

  /** @override */
  toJSON() {
    return GeneralUtils.toPlain(this, ['_payload']);
  }

  /** @override */
  toString() {
    return `RenderingInfo { ${JSON.stringify(this)} }`;
  }
}

exports.RenderingInfo = RenderingInfo;
