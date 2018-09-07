'use strict';

/**
 * An application output (title, image, etc).
 */
class AppOutput {
  /**
   * @param {string} title The title of the screen of the application being captured.
   * @param {Buffer} [screenshot64] Base64 encoding of the screenshot's bytes (the byte can be in either in compressed
   *   or uncompressed form)
   * @param {string} [screenshotUrl] The URL that points to the screenshot
   * @param {string} [domUrl] URL that points to a dom capture of the provided screenshot
   */
  constructor(title, screenshot64, screenshotUrl, domUrl) {
    this._title = title;
    this._screenshot64 = screenshot64;
    this._screenshotUrl = screenshotUrl;
    this._domUrl = domUrl;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {string} */
  getTitle() {
    return this._title;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setTitle(value) {
    this._title = value;
  }

  /** @return {Buffer} */
  getScreenshot64() {
    return this._screenshot64;
  }

  /** @param {Buffer} value */
  setScreenshot64(value) {
    this._screenshot64 = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {string} */
  getScreenshotUrl() {
    return this._screenshotUrl;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setScreenshotUrl(value) {
    this._screenshotUrl = value;
  }
  
  // noinspection JSUnusedGlobalSymbols
  /** @return {string} */
  getDomUrl() {
    return this._domUrl;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setDomUrl(value) {
    this._domUrl = value;
  }

  /** @override */
  toJSON() {
    const object = {
      title: this._title,
    };

    if (this._screenshot64) {
      object.screenshot64 = this._screenshot64;
    }

    if (this._screenshotUrl) {
      object.screenshotUrl = this._screenshotUrl;
    }

    if (this._domUrl) {
      object.domUrl = this._domUrl;
    }

    return object;
  }

  /** @override */
  toString() {
    const object = this.toJSON();

    if (object.screenshot64) {
      object.screenshot64 = 'REMOVED_FROM_OUTPUT';
    }

    return `AppOutput { ${object} }`;
  }
}

exports.AppOutput = AppOutput;
