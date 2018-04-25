'use strict';

/**
 * @interface
 */
class GetFloatingRegion {
    /**
     * @param {EyesBase} eyesBase
     * @param {EyesScreenshot} screenshot
     * @return {Promise.<FloatingMatchSettings>}
     */
    getRegion(eyesBase, screenshot) {}
}

module.exports = GetFloatingRegion;
