'use strict';

/**
 * Encapsulates the information for the validation about to execute.
 */
class ValidationResult {
  constructor() {
    this._asExpected = undefined;
  }

  setAsExpected(value) {
    this._asExpected = value;
  }

  getAsExpected() {
    return this._asExpected;
  }
}

exports.ValidationResult = ValidationResult;
