'use strict';

/**
 * A container for a MatchWindowData along with the screenshot used for
 * creating it. (We specifically avoid inheritance so we don't have to deal
 * with serialization issues).
 */
class MatchWindowDataWithScreenshot {

    /**
     * @param {MatchWindowData} matchWindowData
     * @param {EyesScreenshot} screenshot
     */
    constructor(matchWindowData, screenshot) {
        this._matchWindowData = matchWindowData;
        this.screenshot = screenshot;
    }

    // noinspection JSUnusedGlobalSymbols
    getMatchWindowData() {
        return this._matchWindowData;
    }

    getScreenshot() {
        return this.screenshot;
    }
}

module.exports = MatchWindowDataWithScreenshot;
