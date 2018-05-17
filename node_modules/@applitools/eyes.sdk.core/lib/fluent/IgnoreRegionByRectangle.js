'use strict';

const { GetRegion } = require('./GetRegion');

class IgnoreRegionByRectangle extends GetRegion {
  /**
   * @param {Region} region
   */
  constructor(region) {
    super();
    this._region = region;
  }

  /**
   * @override
   */
  getRegion(eyesBase, screenshot) {
    return eyesBase.getPromiseFactory().resolve(this._region);
  }
}

exports.IgnoreRegionByRectangle = IgnoreRegionByRectangle;
