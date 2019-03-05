'use strict';

/* eslint-disable no-unused-vars */

/**
 * @abstract
 */
class RegionVisibilityStrategy {
  // noinspection JSMethodCanBeStatic, JSUnusedGlobalSymbols
  /**
   * @param {PositionProvider} positionProvider
   * @param {Location} location
   * @return {Promise<void>}
   */
  async moveToRegion(positionProvider, location) {
    throw new TypeError('The method is not implemented!');
  }

  // noinspection JSMethodCanBeStatic, JSUnusedGlobalSymbols
  /**
   * @param {PositionProvider} positionProvider
   * @return {Promise<void>}
   */
  async returnToOriginalPosition(positionProvider) {
    throw new TypeError('The method is not implemented!');
  }
}

exports.RegionVisibilityStrategy = RegionVisibilityStrategy;
