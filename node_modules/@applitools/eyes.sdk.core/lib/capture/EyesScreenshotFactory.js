'use strict';

/**
 * Encapsulates the instantiation of an EyesScreenshot object.
 *
 * @interface
 */
class EyesScreenshotFactory {
  /**
   * @param {MutableImage} image
   * @return {Promise<EyesScreenshot>}
   */
  makeScreenshot(image) {}
}

exports.EyesScreenshotFactory = EyesScreenshotFactory;
