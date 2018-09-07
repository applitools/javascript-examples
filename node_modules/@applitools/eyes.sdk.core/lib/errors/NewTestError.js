'use strict';

const { TestFailedError } = require('./TestFailedError');
const { SessionStartInfo } = require('../server/SessionStartInfo');

/**
 * Indicates that a new test (i.e., a test for which no baseline exists) ended.
 */
class NewTestError extends TestFailedError {
  /**
   * Creates a new NewTestError instance.
   *
   * @param {TestResults} testResults The results of the current test if available, {@code null} otherwise.
   * @param {string|SessionStartInfo} message The error description
   * @param [params...] Other params for Error constructor
   */
  constructor(testResults, message, ...params) {
    if (message instanceof SessionStartInfo) {
      message = `'${message.getScenarioIdOrName()}' of '${message.getAppIdOrName()}'. Please approve the new baseline at ${testResults.getUrl()}`;
    }

    super(testResults, message, ...params);
  }
}

exports.NewTestError = NewTestError;
