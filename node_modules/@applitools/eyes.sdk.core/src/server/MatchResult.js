'use strict';

/**
 * The result of a window match by the agent.
 */
class MatchResult {

    constructor() {
        this.asExpected = null;
        this.windowId = null;
    }

    getAsExpected() {
        return this.asExpected;
    }

    setAsExpected(value) {
        this.asExpected = value;
    }

    getWindowId() {
        return this.windowId;
    }

    setWindowId(value) {
        this.windowId = value;
    }
}

module.exports = MatchResult;
