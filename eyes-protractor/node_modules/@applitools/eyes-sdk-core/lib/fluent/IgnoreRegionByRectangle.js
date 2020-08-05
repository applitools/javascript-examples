'use strict'

const {GetRegion} = require('./GetRegion')

/**
 * @ignore
 */
class IgnoreRegionByRectangle extends GetRegion {
  /**
   * @param {Region} region
   */
  constructor(region) {
    super()
    this._region = region
  }

  /**
   * @inheritDoc
   */
  async getRegion(_eyesBase, _screenshot) {
    return [this._region]
  }

  async toPersistedRegions(_driver) {
    return [this._region.toJSON()]
  }
}

exports.IgnoreRegionByRectangle = IgnoreRegionByRectangle
