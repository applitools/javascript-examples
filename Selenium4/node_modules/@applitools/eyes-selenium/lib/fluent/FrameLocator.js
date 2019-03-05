'use strict';

class FrameLocator {
  constructor() {
    /** @type {WebElement} */
    this._frameElement = null;
    /** @type {By} */
    this._frameSelector = null;
    /** @type {string} */
    this._frameNameOrId = undefined;
    /** @type {number} */
    this._frameIndex = undefined;
  }

  /**
   * @return {number}
   */
  getFrameIndex() {
    return this._frameIndex;
  }

  /**
   * @return {string}
   */
  getFrameNameOrId() {
    return this._frameNameOrId;
  }

  /**
   * @return {By}
   */
  getFrameSelector() {
    return this._frameSelector;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {WebElement}
   */
  getFrameElement() {
    return this._frameElement;
  }

  /**
   * @param frameSelector
   */
  setFrameSelector(frameSelector) {
    this._frameSelector = frameSelector;
  }

  /**
   * @param frameNameOrId
   */
  setFrameNameOrId(frameNameOrId) {
    this._frameNameOrId = frameNameOrId;
  }

  /**
   * @param frameIndex
   */
  setFrameIndex(frameIndex) {
    this._frameIndex = frameIndex;
  }

  /**
   * @param frameElement
   */
  setFrameElement(frameElement) {
    this._frameElement = frameElement;
  }
}

exports.FrameLocator = FrameLocator;
