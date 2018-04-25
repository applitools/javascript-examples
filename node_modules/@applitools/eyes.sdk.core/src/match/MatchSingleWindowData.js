'use strict';

const GeneralUtils = require('../GeneralUtils');
const ArgumentGuard = require('../ArgumentGuard');
const MatchWindowData = require('./MatchWindowData');

/**
 * Encapsulates the data to be sent to the agent on a "matchWindow" command.
 */
class MatchSingleWindowData extends MatchWindowData {

    /**
     * @param {SessionStartInfo} startInfo The start parameters for the session.
     * @param {Trigger[]} userInputs A list of triggers between the previous matchWindow call and the current matchWindow call.
     *                               Can be array of size 0, but MUST NOT be null.
     * @param {AppOutput} appOutput The appOutput for the current matchWindow call.
     * @param {String} tag The tag of the window to be matched.
     * @param {?Boolean} ignoreMismatch
     * @param {?Options} options
     */
    constructor(startInfo, userInputs, appOutput, tag, ignoreMismatch, options) {
        super(userInputs, appOutput, tag, ignoreMismatch, options);

        this._startInfo = startInfo;
        this._updateBaseline = false;
        this._updateBaselineIfDifferent = false;
        this._updateBaselineIfNew = true;
        this._removeSession = false;
        this._removeSessionIfMatching = false;
        /** @type {string} */
        this._agentId = undefined;
    }

    // noinspection JSUnusedGlobalSymbols
    getUpdateBaseline() {
        return this._updateBaseline;
    }

    // noinspection JSUnusedGlobalSymbols
    setUpdateBaseline(updateBaseline) {
        this._updateBaseline = updateBaseline;
    }

    // noinspection JSUnusedGlobalSymbols
    getUpdateBaselineIfDifferent() {
        return this._updateBaselineIfDifferent;
    }

    // noinspection JSUnusedGlobalSymbols
    setUpdateBaselineIfDifferent(updateBaselineIfDifferent) {
        this._updateBaselineIfDifferent = updateBaselineIfDifferent;
    }

    // noinspection JSUnusedGlobalSymbols
    getUpdateBaselineIfNew() {
        return this._updateBaselineIfNew;
    }

    // noinspection JSUnusedGlobalSymbols
    setUpdateBaselineIfNew(updateBaselineIfNew) {
        this._updateBaselineIfNew = updateBaselineIfNew;
    }

    // noinspection JSUnusedGlobalSymbols
    getRemoveSession() {
        return this._removeSession;
    }

    // noinspection JSUnusedGlobalSymbols
    setRemoveSession(removeSession) {
        this._removeSession = removeSession;
    }

    // noinspection JSUnusedGlobalSymbols
    getRemoveSessionIfMatching() {
        return this._removeSessionIfMatching;
    }

    // noinspection JSUnusedGlobalSymbols
    setRemoveSessionIfMatching(removeSessionIfMatching) {
        this._removeSessionIfMatching = removeSessionIfMatching;
    }

    // noinspection JSUnusedGlobalSymbols
    getAgentId() {
        return this._agentId;
    }

    // noinspection JSUnusedGlobalSymbols
    setAgentId(agentId) {
        this._agentId = agentId;
    }

    toJSON() {
        return Object.assign({
            startInfo: this._startInfo,
            updateBaseline: this._updateBaseline,
            updateBaselineIfDifferent: this._updateBaselineIfDifferent,
            updateBaselineIfNew: this._updateBaselineIfNew,
            removeSession: this._removeSession,
            removeSessionIfMatching: this._removeSessionIfMatching,
            agentId: this._agentId,
        }, super.toJSON());
    }

    /** @override */
    toString() {
        const object = this.toJSON();

        if (object.appOutput.screenshot64) {
            object.appOutput.screenshot64 = "REMOVED_FROM_OUTPUT";
        }

        return `MatchSingleWindowData { ${GeneralUtils.toJson(object)} }`;
    }
}

module.exports = MatchSingleWindowData;
