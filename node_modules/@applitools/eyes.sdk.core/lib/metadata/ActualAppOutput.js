'use strict';

const { GeneralUtils } = require('../utils/GeneralUtils');

class ActualAppOutput {
  constructor() {
    this._image = undefined;
    this._thumbprint = undefined;
    this._imageMatchSettings = undefined;
    this._ignoreExpectedOutputSettings = undefined;
    this._isMatching = undefined;
    this._areImagesMatching = undefined;

    this._occurredAt = undefined;

    this._userInputs = undefined;
    this._windowTitle = undefined;
    this._tag = undefined;
    this._isPrimary = undefined;
  }

  /**
   * @param {object} object
   * @return {ActualAppOutput}
   */
  static fromObject(object) {
    return GeneralUtils.assignTo(new ActualAppOutput(), object);
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {Image} */
  getImage() {
    return this._image;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {Image} value */
  setImage(value) {
    this._image = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {Image} */
  getThumbprint() {
    return this._thumbprint;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {Image} value */
  setThumbprint(value) {
    this._thumbprint = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {ImageMatchSettings} */
  getImageMatchSettings() {
    return this._imageMatchSettings;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {ImageMatchSettings} value */
  setImageMatchSettings(value) {
    this._imageMatchSettings = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {boolean} */
  getIgnoreExpectedOutputSettings() {
    return this._ignoreExpectedOutputSettings;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {boolean} value */
  setIgnoreExpectedOutputSettings(value) {
    this._ignoreExpectedOutputSettings = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {boolean} */
  getIsMatching() {
    return this._isMatching;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {boolean} value */
  setIsMatching(value) {
    this._isMatching = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {boolean} */
  getAreImagesMatching() {
    return this._areImagesMatching;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {boolean} value */
  setAreImagesMatching(value) {
    this._areImagesMatching = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {Date} */
  getOccurredAt() {
    return this._occurredAt;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {Date} value */
  setOccurredAt(value) {
    this._occurredAt = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {object[]} */
  getUserInputs() {
    return this._userInputs;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {object[]} value */
  setUserInputs(value) {
    this._userInputs = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {string} */
  getWindowTitle() {
    return this._windowTitle;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setWindowTitle(value) {
    this._windowTitle = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {string} */
  getTag() {
    return this._tag;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setTag(value) {
    this._tag = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {boolean} */
  getIsPrimary() {
    return this._isPrimary;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {boolean} value */
  setIsPrimary(value) {
    this._isPrimary = value;
  }

  /** @override */
  toJSON() {
    return GeneralUtils.toPlain(this);
  }

  /** @override */
  toString() {
    return `ActualAppOutput { ${JSON.stringify(this)} }`;
  }
}

exports.ActualAppOutput = ActualAppOutput;
