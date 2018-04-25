'use strict';

const GeneralUtils = require('../GeneralUtils');

/**
 * An application output (title, image, etc).
 */
class AppOutput {

    /**
     * @param {String} title The title of the screen of the application being captured.
     * @param {Buffer} [screenshot64] Base64 encoding of the screenshot's bytes (the byte can be in either in compressed or uncompressed form)
     * @param {String} [screenshotUrl] The URL that points to the screenshot
     */
    constructor(title, screenshot64, screenshotUrl) {
        this._title = title;
        this._screenshot64 = screenshot64;
        this._screenshotUrl = screenshotUrl;
    }

    // noinspection JSUnusedGlobalSymbols
    getTitle() {
        return this._title;
    }

    // noinspection JSUnusedGlobalSymbols
    setTitle(value) {
        this._title = value;
    }

    // noinspection JSUnusedGlobalSymbols
    getScreenshot64() {
        return this._screenshot64;
    }

    // noinspection JSUnusedGlobalSymbols
    setScreenshot64(value) {
        this._screenshot64 = value;
    }

    // noinspection JSUnusedGlobalSymbols
    getScreenshotUrl() {
        return this._screenshotUrl;
    }

    // noinspection JSUnusedGlobalSymbols
    setScreenshotUrl(value) {
        this._screenshotUrl = value;
    }

    toJSON() {
        const object = {
            title: this._title,
        };

        if (this._screenshot64) {
            object.screenshot64 = this._screenshot64;
        }

        if (this._screenshotUrl) {
            object.screenshotUrl = this._screenshotUrl;
        }

        return object;
    }

    /** @override */
    toString() {
        const object = this.toJSON();

        if (object.screenshot64) {
            object.screenshot64 = "REMOVED_FROM_OUTPUT";
        }

        return `AppOutput { ${object} }`;
    }
}

module.exports = AppOutput;
