'use strict';

/**
 * Determines how detected failures are reported.
 *
 * @readonly
 * @enum {Number}
 */
const FailureReports = {
    /**
     * Failures are reported immediately when they are detected.
     */
    IMMEDIATE: 'Immediate',

    /**
     * Failures are reported when tests are completed (i.e., when {@link EyesBase#close()} is called).
     */
    ON_CLOSE: 'OnClose'
};

Object.freeze(FailureReports);
module.exports = FailureReports;
