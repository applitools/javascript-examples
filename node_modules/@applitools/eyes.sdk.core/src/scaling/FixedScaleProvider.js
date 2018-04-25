'use strict';

const ArgumentGuard = require('../ArgumentGuard');
const ScaleProvider = require('./ScaleProvider');

class FixedScaleProvider extends ScaleProvider {
    /**
     * @param {Number} scaleRatio The scale ratio to use.
     */
    constructor(scaleRatio) {
        super();

        ArgumentGuard.greaterThanZero(scaleRatio, "scaleRatio");
        this._scaleRatio = scaleRatio;
    }

    /**
     * @return {Number} The ratio by which an image will be scaled.
     */
    getScaleRatio() {
        return this._scaleRatio;
    }
}

module.exports = FixedScaleProvider;
