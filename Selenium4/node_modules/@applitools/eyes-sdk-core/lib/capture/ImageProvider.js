'use strict';

/**
 * Encapsulates image retrieval.
 *
 * @abstract
 */
class ImageProvider {
  // noinspection JSMethodCanBeStatic
  /**
   * @return {Promise<MutableImage>}
   */
  async getImage() {
    throw new TypeError('The method is not implemented!');
  }
}

exports.ImageProvider = ImageProvider;
