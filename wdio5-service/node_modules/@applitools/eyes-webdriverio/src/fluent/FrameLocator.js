'use strict';

class FrameLocator {

  constructor() {
    /** @type {WebElement} */
    this._frameElement = null;
    /** @type {By} */
    this._frameSelector = null;
    /** @type {String} */
    this._frameNameOrId = null;
    /** @type {Integer} */
    this._frameIndex = null;
    /** @type {By} */
    this._scrollRootSelector = undefined;
    /** @type {WebElement} */
    this._scrollRootElement = undefined;
  }

  /**
   * @return {Integer}
   */
  getFrameIndex() {
    return this._frameIndex;
  }

  /**
   * @return {String}
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
  /**
   * @param {By} frameSelector
   */
  setFrameSelector(frameSelector) {
    this._frameSelector = frameSelector;
  }
  /**
   * @return {WebElement}
   */
  getFrameElement() {
    return this._frameElement;
  }

  /**
   * @param {WebElement} frameElement
   */
  setFrameElement(frameElement) {
    this._frameElement = frameElement;
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
   * @return {WebElement}
   */
  getScrollRootElement() {
    return this._scrollRootElement;
  }

  /**
   * @param {WebElement} scrollRootElement
   */
  setScrollRootElement(scrollRootElement) {
    this._scrollRootElement = scrollRootElement;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {By}
   */
  getScrollRootSelector() {
    return this._scrollRootSelector;
  }

  /**
   * @param {By} scrollRootSelector
   */
  setScrollRootSelector(scrollRootSelector) {
    this._scrollRootSelector = scrollRootSelector;
  }
}

module.exports = FrameLocator;
