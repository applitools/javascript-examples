'use strict';

const { GeneralUtils } = require('../utils/GeneralUtils');
const { Region } = require('../geometry/Region');
const {ScreenOrientation} = require('./ScreenOrientation');
const {EmulationDevice} = require('./EmulationDevice');

class EmulationInfo {
  /**
   * @param {device: EmulationDevice, deviceName: string, screenOrientation: ScreenOrientation}
   * @return {EmulationInfo}
   */
  constructor({device, deviceName, screenOrientation} = {}) {
    this._device = device;
    this._deviceName = deviceName;
    this._screenOrientation = screenOrientation;
  }

  /**
   * @param {Object} object
   * @return {EmulationInfo}
   */
  static fromObject(object) {
    const mapping = {};
    if (object.device) mapping.device = EmulationDevice.fromObject;
    
    return GeneralUtils.assignTo(new EmulationInfo(), object, mapping);
  }

  /** @return {EmulationDevice} */
  getDevice() {
    return this._device;
  }

  /** @param {EmulationDevice} value */
  setDevice(value) {
    this._device = value;
  }

  /** @return {string} */
  getDeviceName() {
    return this._deviceName;
  }

  /** @param {string} value */
  setDeviceName(value) {
    this._deviceName = value;
  }

  /** @return {ScreenOrientation} */
  getScreenOrientation() {
    return this._screenOrientation;
  }

  /** @param {ScreenOrientation} value */
  setScreenOrientation(value) {
    this._screenOrientation = value;
  }

  /** @override */
  toJSON() {
    if (this._device) {
      return Object.assign({
        screenOrientation: this._screenOrientation,
      }, this._device.toJSON());
    } else {
      return GeneralUtils.toPlain(this, ['_device']);
    }
  }

  /** @override */
  toString() {
    return `EmulationInfo { ${JSON.stringify(this)} }`;
  }
}

exports.EmulationInfo = EmulationInfo;
