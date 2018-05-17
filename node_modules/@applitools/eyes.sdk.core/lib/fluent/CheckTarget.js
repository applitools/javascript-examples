'use strict';

const { CheckSettings } = require('./CheckSettings');

class CheckTarget {
  /**
   * @return {CheckSettings}
   */
  static window() {
    return new CheckSettings();
  }

  /**
   * @param {Region|RegionObject} rect
   * @return {CheckSettings}
   */
  static region(rect) {
    return new CheckSettings(undefined, rect);
  }
}

exports.CheckTarget = CheckTarget;
