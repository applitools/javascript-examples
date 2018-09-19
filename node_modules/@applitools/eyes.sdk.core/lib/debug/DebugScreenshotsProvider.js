'use strict';

const DEFAULT_PREFIX = 'screenshot_';
const DEFAULT_PATH = '';

/**
 * Interface for saving debug screenshots.
 *
 * @abstract
 */
class DebugScreenshotsProvider {
  constructor() {
    this._prefix = DEFAULT_PREFIX;
    this._path = undefined;
  }

  getPrefix() {
    return this._prefix;
  }

  setPrefix(value) {
    this._prefix = value || DEFAULT_PREFIX;
  }

  getPath() {
    return this._path;
  }

  setPath(value) {
    if (value) {
      this._path = value.endsWith('/') ? value : `${value}/`;
    } else {
      this._path = DEFAULT_PATH;
    }
  }

  /**
   * @abstract
   * @param {MutableImage} image
   * @param {string} suffix
   * @return {Promise<void>}
   */
  save(image, suffix) {}
}

exports.DebugScreenshotsProvider = DebugScreenshotsProvider;
