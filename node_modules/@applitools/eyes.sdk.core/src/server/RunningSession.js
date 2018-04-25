'use strict';

const GeneralUtils = require('../GeneralUtils');

/**
 * Encapsulates data for the session currently running in the agent.
 */
class RunningSession {

    constructor(arg1, sessionId, batchId, baselineId, url) {
        if (arg1 instanceof Object) {
            return new RunningSession(arg1.id, arg1.sessionId, arg1.batchId, arg1.baselineId, arg1.url);
        }

        this._id = arg1;
        this._sessionId = sessionId;
        this._batchId = batchId;
        this._baselineId = baselineId;
        this._url = url;
        /** @type {RenderingInfo} */
        this._renderingInfo = null;

        this._isNewSession = false;
    }

    getId() {
        return this._id;
    }

    // noinspection JSUnusedGlobalSymbols
    setId(value) {
        this._id = value;
    }

    // noinspection JSUnusedGlobalSymbols
    getSessionId() {
        return this._sessionId;
    }

    // noinspection JSUnusedGlobalSymbols
    setSessionId(value) {
        this._sessionId = value;
    }

    // noinspection JSUnusedGlobalSymbols
    getBatchId() {
        return this._batchId;
    }

    // noinspection JSUnusedGlobalSymbols
    setBatchId(value) {
        this._batchId = value;
    }

    // noinspection JSUnusedGlobalSymbols
    getBaselineId() {
        return this._baselineId;
    }

    // noinspection JSUnusedGlobalSymbols
    setBaselineId(value) {
        this._baselineId = value;
    }

    getUrl() {
        return this._url;
    }

    // noinspection JSUnusedGlobalSymbols
    setUrl(value) {
        this._url = value;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @returns {RenderingInfo}
     */
    getRenderingInfo() {
        return this._renderingInfo;
    }

    // noinspection JSUnusedGlobalSymbols
    setRenderingInfo(value) {
        this._renderingInfo = value;
    }

    getIsNewSession() {
        return this._isNewSession;
    }

    setNewSession(value) {
        this._isNewSession = value;
    }

    toJSON() {
        return {
            id: this._id,
            sessionId: this._sessionId,
            batchId: this._batchId,
            baselineId: this._baselineId,
            url: this._url,
            renderingInfo: this._renderingInfo
        };
    }

    /** @override */
    toString() {
        return `RunningSession { ${GeneralUtils.toJson(this)} }`;
    }
}

module.exports = RunningSession;
