'use strict';

const { Configuration, ArgumentGuard, TypeUtils } = require('@applitools/eyes-sdk-core');

const { StitchMode } = require('./StitchMode');

/**
 * @typedef {{width: number, height: number, name: BrowserType}} RenderBrowserInfo
 * @typedef {{deviceName: string, screenOrientation: ScreenOrientation}} DeviceInfo
 */

const DEFAULT_VALUES = {
  waitBeforeScreenshots: 100, // ms
  stitchMode: StitchMode.SCROLL,
  hideScrollbars: true,
  hideCaret: true,
  stitchOverlap: 50, // px

  concurrentSessions: 3,
  isThrowExceptionOn: false,
  browsersInfo: [],
};

class SeleniumConfiguration extends Configuration {
  /**
   * @param {SeleniumConfiguration} [configuration]
   */
  constructor(configuration) {
    super();

    // selenium
    /** @type {boolean} */ this._forceFullPageScreenshot = undefined;
    /** @type {number} */ this._waitBeforeScreenshots = undefined;
    /** @type {StitchMode} */ this._stitchMode = undefined;
    /** @type {boolean} */ this._hideScrollbars = undefined;
    /** @type {boolean} */ this._hideCaret = undefined;
    /** @type {number} */ this._stitchOverlap = undefined;

    // visual grid
    /** @type {number} */ this._concurrentSessions = undefined;
    /** @type {boolean} */ this._isThrowExceptionOn = undefined;
    /** @type {(RenderBrowserInfo|DeviceInfo)[]} */ this._browsersInfo = undefined;

    if (configuration) {
      this.mergeConfig(configuration);
    }
  }

  /**
   * Forces a full page screenshot (by scrolling and stitching) if the browser only supports viewport screenshots).
   *
   * @param {boolean} forceFullPageScreenshot Whether to force a full page screenshot or not.
   */
  setForceFullPageScreenshot(forceFullPageScreenshot) {
    this._forceFullPageScreenshot = forceFullPageScreenshot;
  }

  /**
   * @return {boolean} Whether Eyes should force a full page screenshot.
   */
  getForceFullPageScreenshot() {
    return this._forceFullPageScreenshot;
  }

  /**
   * Sets the time to wait just before taking a screenshot (e.g., to allow positioning to stabilize when performing a
   * full page stitching).
   *
   * @param {number} waitBeforeScreenshots The time to wait (Milliseconds). Values smaller or equal to 0, will cause the
   *   default value to be used.
   */
  setWaitBeforeScreenshots(waitBeforeScreenshots) {
    if (waitBeforeScreenshots <= 0) {
      this._waitBeforeScreenshots = undefined;
    } else {
      this._waitBeforeScreenshots = waitBeforeScreenshots;
    }
  }

  /**
   * @return {number} The time to wait just before taking a screenshot.
   */
  getWaitBeforeScreenshots() {
    return TypeUtils.getOrDefault(this._waitBeforeScreenshots, DEFAULT_VALUES.waitBeforeScreenshots);
  }

  /**
   * Set the type of stitching used for full page screenshots. When the page includes fixed position header/sidebar,
   * use {@link StitchMode#CSS}. Default is {@link StitchMode#SCROLL}.
   *
   * @param {StitchMode} stitchMode The stitch mode to set.
   */
  setStitchMode(stitchMode) {
    this._stitchMode = stitchMode;
  }

  /**
   * @return {StitchMode} The current stitch mode settings.
   */
  getStitchMode() {
    return TypeUtils.getOrDefault(this._stitchMode, DEFAULT_VALUES.stitchMode);
  }

  /**
   * Hide the scrollbars when taking screenshots.
   *
   * @param {boolean} hideScrollbars Whether to hide the scrollbars or not.
   */
  setHideScrollbars(hideScrollbars) {
    this._hideScrollbars = hideScrollbars;
  }

  /**
   * @return {boolean} Whether or not scrollbars are hidden when taking screenshots.
   */
  getHideScrollbars() {
    return TypeUtils.getOrDefault(this._hideScrollbars, DEFAULT_VALUES.hideScrollbars);
  }

  /**
   * @param {boolean} hideCaret
   */
  setHideCaret(hideCaret) {
    this._hideCaret = hideCaret;
  }

  /**
   * @return {boolean}
   */
  getHideCaret() {
    return TypeUtils.getOrDefault(this._hideCaret, DEFAULT_VALUES.hideCaret);
  }

  /**
   * Sets the stitch overlap in pixels.
   *
   * @param {number} stitchOverlap The width (in pixels) of the overlap.
   */
  setStitchOverlap(stitchOverlap) {
    this._stitchOverlap = stitchOverlap;
  }

  /**
   * @return {number} Returns the stitching overlap in pixels.
   */
  getStitchOverlap() {
    return TypeUtils.getOrDefault(this._stitchOverlap, DEFAULT_VALUES.stitchOverlap);
  }

  /*----------- Visual Grid properties -----------*/

  /**
   * @param {number} concurrentSessions
   */
  setConcurrentSessions(concurrentSessions) {
    this._concurrentSessions = concurrentSessions;
  }

  /**
   * @return {number}
   */
  getConcurrentSessions() {
    return TypeUtils.getOrDefault(this._concurrentSessions, DEFAULT_VALUES.concurrentSessions);
  }

  /**
   * @param {boolean} isThrowExceptionOn
   */
  setIsThrowExceptionOn(isThrowExceptionOn) {
    this._isThrowExceptionOn = isThrowExceptionOn;
  }

  /**
   * @return {boolean}
   */
  getIsThrowExceptionOn() {
    return TypeUtils.getOrDefault(this._isThrowExceptionOn, DEFAULT_VALUES.isThrowExceptionOn);
  }

  /**
   * @param {(RenderBrowserInfo|DeviceInfo)[]} browsersInfo
   */
  setBrowsersInfo(browsersInfo) {
    this._browsersInfo = browsersInfo;
  }

  /**
   * @return {(RenderBrowserInfo|DeviceInfo)[]}
   */
  getBrowsersInfo() {
    return TypeUtils.getOrDefault(this._browsersInfo, DEFAULT_VALUES.browsersInfo);
  }

  /**
   * @param {RenderBrowserInfo...} browsersInfo
   * @return {SeleniumConfiguration}
   */
  addBrowsers(...browsersInfo) {
    if (this._browsersInfo === undefined) {
      this._browsersInfo = [];
    }

    this._browsersInfo.push(...browsersInfo);
    return this;
  }

  /**
   * @param {number} width
   * @param {number} height
   * @param {BrowserType} browserType
   * @return {SeleniumConfiguration}
   */
  addBrowser(width, height, browserType) {
    const browserInfo = {
      width,
      height,
      name: browserType,
    };

    this.addBrowsers(browserInfo);
    return this;
  }

  /**
   * @param {string} deviceName
   * @param {ScreenOrientation} screenOrientation
   * @return {SeleniumConfiguration}
   */
  addDevice(deviceName, screenOrientation) {
    const deviceInfo = {
      deviceName, screenOrientation,
    };

    if (this._browsersInfo === undefined) {
      this._browsersInfo = [];
    }

    this._browsersInfo.push(deviceInfo);
    return this;
  }

  /**
   * TODO: rename this method, the name of method should clearly declare that it only works for browsers and devices
   *
   * @deprecated This method is not doing what it should do, don't use it
   * @param config
   * @return {SeleniumConfiguration}
   */
  static fromObject(config) {
    ArgumentGuard.isValidType(config, Object);

    const cfg = new SeleniumConfiguration();
    if (config.browser) {
      const browsers = Array.isArray(config.browser) ? config.browser : [config.browser];
      browsers.forEach(browser => {
        if (browser.name) {
          cfg.addBrowser(browser.width, browser.height, browser.name);
        } else if (browser.deviceName) {
          cfg.addDevice(browser.deviceName, browser.screenOrientation);
        }
      });
    }

    return cfg;
  }

  /**
   * @return {SeleniumConfiguration}
   */
  cloneConfig() {
    return new SeleniumConfiguration(this);
  }
}

exports.SeleniumConfiguration = SeleniumConfiguration;
