'use strict';

/**
 * @readonly
 * @enum {string}
 */
const TestResultsStatus = {
  Passed: 'Passed',
  Unresolved: 'Unresolved',
  Failed: 'Failed',
};

Object.freeze(TestResultsStatus);
exports.TestResultsStatus = TestResultsStatus;
