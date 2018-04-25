'use strict';

const GeneralUtils = require('../GeneralUtils');

/**
 * Encapsulates data for the render currently running in the client.
 */
class RenderStatusResults {

    constructor(arg1, imageLocation, error) {
        if (arg1 instanceof Object) {
            return new RenderStatusResults(arg1.status, arg1.imageLocation, arg1.error);
        }

        this._status = arg1;
        this._imageLocation = imageLocation;
        this._error = error;
    }

    /**
     * @returns {RenderStatus}
     */
    getStatus() {
        return this._status;
    }

    /**
     * @returns {String}
     */
    getImageLocation() {
        return this._imageLocation;
    }

    /**
     * @returns {String}
     */
    getError() {
        return this._error;
    }

    toJSON() {
        return {
            status: this._status,
            imageLocation: this._imageLocation,
            error: this._error
        };
    }

    /** @override */
    toString() {
        return `RenderStatusResults { ${GeneralUtils.toJson(this)} }`;
    }
}

module.exports = RenderStatusResults;
