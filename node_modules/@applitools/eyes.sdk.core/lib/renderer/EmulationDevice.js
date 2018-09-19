'use strict';

const { GeneralUtils } = require('../utils/GeneralUtils');

class EmulationDevice {
  constructor({width, height, deviceScaleFactor, mobile} = {}) {
    this._width = width;
    this._height = height;
    this._deviceScaleFactor = deviceScaleFactor;
    this._mobile = mobile;
  }

    /**
   * @param {Object} object
   * @return {EmulationDevice}
   */
  static fromObject(object) {
    return GeneralUtils.assignTo(new EmulationDevice(), object);
  }

  /** @return {number} */
  getWidth() {
    return this._width;
  }

  /** @param {number} value */
  setWidth(value) {
    this._width = value;
  }

  /** @return {number} */
  getHeight() {
    return this._height;
  }

  /** @param {number} value */
  setHeight(value) {
    this._height = value;
  }

  /** @return {string} */
  getDeviceScaleFactor() {
    return this._deviceScaleFactor;
  }

  /** @param {string} value */
  setDeviceScaleFactor(value) {
    this._deviceScaleFactor = value;
  }

  /** @return {string} */
  getMobile() {
    return this._mobile;
  }

  /** @param {string} value */
  setMobile(value) {
    this._mobile = value;
  }

  /** @override */
  toJSON() {
    return GeneralUtils.toPlain(this);
  }

  /** @override */
  toString() {
    return `EmulationDevice { ${JSON.stringify(this)} }`;
  }
}

exports.EmulationDevice = EmulationDevice;
