'use strict';

const { EyesScreenshotFactory } = require('./EyesScreenshotFactory');
const { EyesSimpleScreenshot } = require('./EyesSimpleScreenshot');

/**
 * Encapsulates the instantiation of an EyesSimpleScreenshot.
 */
class EyesSimpleScreenshotFactory extends EyesScreenshotFactory {
  // noinspection JSMethodCanBeStatic
  /**
   * @inheritDoc
   * @return {Promise<EyesSimpleScreenshot>}
   */
  async makeScreenshot(image) {
    return new EyesSimpleScreenshot(image);
  }
}

exports.EyesSimpleScreenshotFactory = EyesSimpleScreenshotFactory;
