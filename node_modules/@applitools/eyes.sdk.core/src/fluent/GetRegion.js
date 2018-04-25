'use strict';

/**
 * @interface
 */
class GetRegion {
    /**
     * @param {EyesBase} eyesBase
     * @param {EyesScreenshot} screenshot
     * @return {Promise.<Region>}
     */
    getRegion(eyesBase, screenshot) {}
}

module.exports = GetRegion;
