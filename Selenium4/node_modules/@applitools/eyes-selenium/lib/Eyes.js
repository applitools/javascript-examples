'use strict';

const { TypeUtils } = require('@applitools/eyes-common');

const { EyesSelenium } = require('./EyesSelenium');
const { EyesVisualGrid } = require('./EyesVisualGrid');

/**
 * @extends EyesVisualGrid
 * @extends EyesSelenium
 */
class Eyes {
  // noinspection JSAnnotator
  /**
   * Creates a new (possibly disabled) Eyes instance that interacts with the Eyes Server at the specified url.
   *
   * @param {string|boolean} [serverUrl=EyesBase.getDefaultServerUrl()] The Eyes server URL.
   * @param {boolean} [isDisabled=false] Set to true to disable Applitools Eyes and use the webdriver directly.
   * @param {boolean} [isVisualGrid]
   * @return {EyesSelenium|EyesVisualGrid}
   */
  constructor(serverUrl, isDisabled, isVisualGrid) {
    if (TypeUtils.isBoolean(serverUrl)) {
      isVisualGrid = serverUrl;
      serverUrl = undefined;
    }

    if (isVisualGrid === true) {
      return new EyesVisualGrid(serverUrl, isDisabled);
    }

    return new EyesSelenium(serverUrl, isDisabled);
  }
}

exports.Eyes = Eyes;
