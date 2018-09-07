'use strict';

const { DebugScreenshotsProvider } = require('./DebugScreenshotsProvider');

/**
 * A mock debug screenshot provider.
 */
class NullDebugScreenshotProvider extends DebugScreenshotsProvider {
  // noinspection JSMethodCanBeStatic, JSUnusedGlobalSymbols
  /**
   * @param {MutableImage} image
   * @param {string} suffix
   * @return {Promise<void>}
   */
  save(image, suffix) {
    // Do nothing.
    return image.resolve(null);
  }
}

exports.NullDebugScreenshotProvider = NullDebugScreenshotProvider;
