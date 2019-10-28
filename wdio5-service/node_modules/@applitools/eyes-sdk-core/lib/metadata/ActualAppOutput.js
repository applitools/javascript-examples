'use strict';

const { GeneralUtils, DateTimeUtils } = require('@applitools/eyes-common');

const { ImageMatchSettings } = require('./ImageMatchSettings');
const { Image } = require('./Image');

class ActualAppOutput {
  // noinspection FunctionWithMoreThanThreeNegationsJS
  /**
   * @param {Image|object} image
   * @param {Image|object} thumbprint
   * @param {ImageMatchSettings|object} imageMatchSettings
   * @param {boolean} ignoreExpectedOutputSettings
   * @param {boolean} isMatching
   * @param {boolean} areImagesMatching
   * @param {Date|string} occurredAt
   * @param {object[]} userInputs
   * @param {string} windowTitle
   * @param {string} tag
   * @param {boolean} isPrimary
   */
  constructor({ image, thumbprint, imageMatchSettings, ignoreExpectedOutputSettings, isMatching, areImagesMatching,
    occurredAt, userInputs, windowTitle, tag, isPrimary } = {}) {
    if (image && !(image instanceof Image)) {
      image = new Image(image);
    }

    if (thumbprint && !(thumbprint instanceof Image)) {
      thumbprint = new Image(thumbprint);
    }

    if (imageMatchSettings && !(imageMatchSettings instanceof ImageMatchSettings)) {
      imageMatchSettings = new ImageMatchSettings(imageMatchSettings);
    }

    if (occurredAt && !(occurredAt instanceof Date)) {
      occurredAt = DateTimeUtils.fromISO8601DateTime(occurredAt);
    }

    this._image = image;
    this._thumbprint = thumbprint;
    this._imageMatchSettings = imageMatchSettings;
    this._ignoreExpectedOutputSettings = ignoreExpectedOutputSettings;
    this._isMatching = isMatching;
    this._areImagesMatching = areImagesMatching;
    this._occurredAt = occurredAt;
    this._userInputs = userInputs;
    this._windowTitle = windowTitle;
    this._tag = tag;
    this._isPrimary = isPrimary;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {Image}
   */
  getImage() {
    return this._image;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {Image} value
   */
  setImage(value) {
    this._image = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {Image}
   */
  getThumbprint() {
    return this._thumbprint;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {Image} value
   */
  setThumbprint(value) {
    this._thumbprint = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {ImageMatchSettings}
   */
  getImageMatchSettings() {
    return this._imageMatchSettings;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {ImageMatchSettings} value
   */
  setImageMatchSettings(value) {
    this._imageMatchSettings = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {boolean}
   */
  getIgnoreExpectedOutputSettings() {
    return this._ignoreExpectedOutputSettings;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {boolean} value
   */
  setIgnoreExpectedOutputSettings(value) {
    this._ignoreExpectedOutputSettings = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {boolean}
   */
  getIsMatching() {
    return this._isMatching;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {boolean} value
   */
  setIsMatching(value) {
    this._isMatching = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {boolean}
   */
  getAreImagesMatching() {
    return this._areImagesMatching;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {boolean} value
   */
  setAreImagesMatching(value) {
    this._areImagesMatching = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {Date}
   */
  getOccurredAt() {
    return this._occurredAt;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {Date} value
   */
  setOccurredAt(value) {
    this._occurredAt = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {object[]}
   */
  getUserInputs() {
    return this._userInputs;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {object[]} value
   */
  setUserInputs(value) {
    this._userInputs = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {string}
   */
  getWindowTitle() {
    return this._windowTitle;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {string} value
   */
  setWindowTitle(value) {
    this._windowTitle = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {string}
   */
  getTag() {
    return this._tag;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {string} value
   */
  setTag(value) {
    this._tag = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {boolean}
   */
  getIsPrimary() {
    return this._isPrimary;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {boolean} value
   */
  setIsPrimary(value) {
    this._isPrimary = value;
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
    return `ActualAppOutput { ${JSON.stringify(this)} }`;
  }
}

exports.ActualAppOutput = ActualAppOutput;
