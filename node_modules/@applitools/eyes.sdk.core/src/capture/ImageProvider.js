'use strict';

/**
 * Encapsulates image retrieval.
 *
 * @interface
 */
class ImageProvider {

    /**
     * @return {Promise.<MutableImage>}
     */
    getImage() {}
}

module.exports = ImageProvider;
