'use strict';

/**
 * Handles log messages produces by the Eyes API.
 *
 * @abstract
 */
class LogHandler {

    constructor() {
        this._isVerbose = false;
    }

    //noinspection JSUnusedGlobalSymbols
    /**
     * Whether to handle or ignore verbose log messages.
     *
     * @param {Boolean} isVerbose
     */
    setIsVerbose(isVerbose) {
        // noinspection PointlessBooleanExpressionJS
        this._isVerbose = !!isVerbose;
    }

    //noinspection JSUnusedGlobalSymbols
    /**
     * Whether to handle or ignore verbose log messages.
     *
     * @return {Boolean} isVerbose
     */
    getIsVerbose() {
        return this._isVerbose;
    }

    /**
     * @abstract
     */
    open() {}

    /**
     * @abstract
     */
    close() {}

    /**
     * @abstract
     * @param {Boolean} verbose
     * @param {String} logString
     */
    onMessage(verbose, logString) {}
}

module.exports = LogHandler;
