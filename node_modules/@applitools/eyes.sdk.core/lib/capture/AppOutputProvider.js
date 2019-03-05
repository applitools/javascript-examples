'use strict';

/**
 * Encapsulates a callback which returns an application output.
 *
 * @abstract
 */
class AppOutputProvider {
  // noinspection JSMethodCanBeStatic, JSUnusedGlobalSymbols
  /**
   * @abstract
   * @param {Region} region
   * @param {EyesScreenshot} lastScreenshot
   * @param {CheckSettings} checkSettings
   * @return {Promise<AppOutputWithScreenshot>}
   */
  getAppOutput(region, lastScreenshot, checkSettings) {
    throw new TypeError('The method `getAppOutput` from `AppOutputProvider` should be implemented!');
  }
}

exports.AppOutputProvider = AppOutputProvider;
