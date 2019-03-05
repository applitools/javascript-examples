'use strict';

const { GeneralUtils } = require('../utils/GeneralUtils');
const { RectangleSize } = require('../geometry/RectangleSize');
const { Region } = require('../geometry/Region');

/**
 * Encapsulates data for the render currently running in the client.
 */
class RenderStatusResults {
  constructor() {
    this._status = undefined;
    this._imageLocation = undefined;
    this._domLocation = undefined;
    this._error = undefined;
    this._os = undefined;
    this._userAgent = undefined;
    this._deviceSize = undefined;
    this._selectorRegions = undefined;
  }

  /**
   * @param {object} object
   * @return {RenderStatusResults}
   */
  static fromObject(object) {
    const mapping = {};
    if (object.deviceSize) mapping.deviceSize = RectangleSize.fromObject;
    if (object.selectorRegions) mapping.selectorRegions = regions => regions ? regions.map(regionFromRGridObj) : regions;
    return GeneralUtils.assignTo(new RenderStatusResults(), object, mapping);
  }

  /** @return {boolean} */
  isEmpty() {
    return (
      this._status === undefined &&
      this._imageLocation === undefined &&
      this._domLocation === undefined &&
      this._error === undefined &&
      this._os === undefined &&
      this._userAgent === undefined &&
      this._deviceSize === undefined &&
      this._selectorRegions === undefined
    );
  }

  /** @return {RenderStatus} */
  getStatus() {
    return this._status;
  }

  /** @param {string} value */
  setStatus(value) {
    this._status = value;
  }

  /** @return {string} */
  getImageLocation() {
    return this._imageLocation;
  }

  /** @param {string} value */
  setImageLocation(value) {
    this._imageLocation = value;
  }

  /** @return {string} */
  getDomLocation() {
    return this._domLocation;
  }

  /** @param {string} value */
  setDomLocation(value) {
    this._domLocation = value;
  }

  /** @return {string} */
  getError() {
    return this._error;
  }

  /** @param {string} value */
  setError(value) {
    this._error = value;
  }

  /** @return {string} */
  getOS() {
    return this._os;
  }

  /** @param {string} value */
  setOS(value) {
    this._os = value;
  }

  /** @return {string} */
  getUserAgent() {
    return this._userAgent;
  }

  /** @param {string} value */
  setUserAgent(value) {
    this._userAgent = value;
  }

  /** @return {RectangleSize} */
  getDeviceSize() {
    return this._deviceSize;
  }

  /** @param {RectangleSize} value */
  setDeviceSize(value) {
    this._deviceSize = value;
  }

  /** @return {Region[]} */
  getSelectorRegions() {
    return this._selectorRegions;
  }

  /** @param {Region[]} value */
  setSelectorRegions(value) {
    this._selectorRegions = value;
  }

  /** @override */
  toJSON() {
    return GeneralUtils.toPlain(this);
  }

  /** @override */
  toString() {
    return `RenderStatusResults { ${JSON.stringify(this)} }`;
  }
}

function regionFromRGridObj({x, y, width, height}) {
  return Region.fromObject({
    left: x,
    top: y,
    width,
    height
  });
}

exports.RenderStatusResults = RenderStatusResults;
