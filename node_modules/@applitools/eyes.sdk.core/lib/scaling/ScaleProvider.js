'use strict';

/**
 * Encapsulates scaling logic.
 *
 * @interface
 */
class ScaleProvider {
  /**
   * @return {Number} The ratio by which an image will be scaled.
   */
  getScaleRatio() {}
}

exports.ScaleProvider = ScaleProvider;
