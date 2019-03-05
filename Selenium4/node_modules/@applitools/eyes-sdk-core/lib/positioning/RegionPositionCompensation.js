'use strict';

/* eslint-disable no-unused-vars */

/**
 * @abstract
 */
class RegionPositionCompensation {
  /**
   * @param {Region} region
   * @param {number} pixelRatio
   * @return {Region}
   */
  compensateRegionPosition(region, pixelRatio) {}
}

exports.RegionPositionCompensation = RegionPositionCompensation;
