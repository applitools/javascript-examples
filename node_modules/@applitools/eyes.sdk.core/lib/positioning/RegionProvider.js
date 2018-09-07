'use strict';

const { ArgumentGuard } = require('../ArgumentGuard');

/**
 * Encapsulates a getRegion "callback" and how the region's coordinates should be used.
 */
class RegionProvider {
  /**
   * @param {Region} [region]
   * @param {PromiseFactory} [promiseFactory]
   */
  constructor(region, promiseFactory) {
    if (region) {
      ArgumentGuard.notNull(promiseFactory, 'promiseFactory');
    }

    this._region = region;
    this._promiseFactory = promiseFactory;
  }

  // noinspection JSMethodCanBeStatic
  /**
   * @return {Promise<Region>} A region with "as is" viewport coordinates.
   */
  getRegion() {
    return this._promiseFactory.resolve(this._region);
  }
}

exports.RegionProvider = RegionProvider;
