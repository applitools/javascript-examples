'use strict';

/**
 * The type of the session.
 *
 * @readonly
 * @enum {Number}
 */
const SessionType = {
    /**
     * Default type of sessions.
     */
    SEQUENTIAL: 'SEQUENTIAL',

    /**
     * A timing test session
     */
    PROGRESSION: 'PROGRESSION'
};

Object.freeze(SessionType);
module.exports = SessionType;
