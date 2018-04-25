'use strict';

const DebugScreenshotsProvider = require('./DebugScreenshotsProvider');

/**
 * A mock debug screenshot provider.
 */
class NullDebugScreenshotProvider extends DebugScreenshotsProvider {

    // noinspection JSMethodCanBeStatic, JSUnusedGlobalSymbols
    /**
     * @param {MutableImage} image
     * @param {String} suffix
     * @return {Promise}
     */
    save(image, suffix) {
        // Do nothing.
    }
}

module.exports = NullDebugScreenshotProvider;
