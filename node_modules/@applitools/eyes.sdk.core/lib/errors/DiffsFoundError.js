'use strict';

const { TestFailedError } = require('./TestFailedError');
const { SessionStartInfo } = require('../server/SessionStartInfo');

/**
 * Indicates that an existing test ended, and that differences where found from the baseline.
 */
class DiffsFoundError extends TestFailedError {
  /**
   * Creates a new DiffsFoundError instance.
   *
   * @param {TestResults} testResults The results of the current test if available, {@code null} otherwise.
   * @param {string|SessionStartInfo} message The error description
   * @param [params...] Other params for Error constructor
   */
  constructor(testResults, message, ...params) {
    if (message instanceof SessionStartInfo) {
      message = `Test '${message.getScenarioIdOrName()}' of '${message.getAppIdOrName()}' detected differences!. See details at: ${testResults.getUrl()}`;
    }

    super(testResults, message, ...params);
  }
}

exports.DiffsFoundError = DiffsFoundError;
