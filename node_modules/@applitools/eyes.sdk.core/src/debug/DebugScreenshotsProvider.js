'use strict';

const DEFAULT_PREFIX = "screenshot_";
const DEFAULT_PATH = "";

/**
 * Interface for saving debug screenshots.
 *
 * @abstract
 */
class DebugScreenshotsProvider {

    constructor() {
        this._prefix = DEFAULT_PREFIX;
        this._path = null;
    }

    getPrefix() {
        return this._prefix;
    }

    setPrefix(value) {
        this._prefix = value || DEFAULT_PREFIX;
    }

    getPath() {
        return this._path;
    }

    setPath(value) {
        if (value) {
            value = value.endsWith("/") ? value : value + '/';
        } else {
            value = DEFAULT_PATH;
        }

        this._path = value;
    }

    /**
     * @abstract
     * @param {MutableImage} image
     * @param {String} suffix
     * @return {Promise}
     */
    save(image, suffix) {}
}

module.exports = DebugScreenshotsProvider;
