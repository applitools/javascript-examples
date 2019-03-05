'use strict';

const { RegionPositionCompensation } = require('./RegionPositionCompensation');

class NullRegionPositionCompensation extends RegionPositionCompensation {
  /**
   * @inheritDoc
   */
  compensateRegionPosition(region, pixelRatio) { // eslint-disable-line no-unused-vars
    return region;
  }
}

exports.NullRegionPositionCompensation = NullRegionPositionCompensation;
