'use strict';

/**
 * Encapsulates the information for the validation about to execute.
 */
class ValidationInfo {
  constructor() {
    this._validationId = null;
    this._tag = null;
  }

  setValidationId(value) {
    this._validationId = value;
  }

  getValidationId() {
    return this._validationId;
  }

  setTag(value) {
    this._tag = value;
  }

  // noinspection JSUnusedGlobalSymbols
  getTag() {
    return this._tag;
  }

  // noinspection JSUnusedGlobalSymbols
  toObject() {
    return {
      validationId: this._validationId,
      tag: this._tag,
    };
  }
}

/**
 * Encapsulates the information for the validation about to execute.
 */
class ValidationResult {
  constructor() {
    this._asExpected = null;
  }

  setAsExpected(value) {
    this._asExpected = value;
  }

  getAsExpected() {
    return this._asExpected;
  }
}

/**
 * The base class for session event handler. Specific implementations should use this class as abstract.
 *
 * @abstract
 */
class SessionEventHandler {
  constructor() {
    this._promiseFactory = undefined;
  }

  setPromiseFactory(value) {
    this._promiseFactory = value;
  }

  getPromiseFactory() {
    return this._promiseFactory;
  }

  /**
   * Called when the data gathering for creating a session phase had started.
   */
  initStarted() {}

  /**
   * Called when the data garthering phase had ended.
   */
  initEnded() {}

  /**
   * Called when setting the size of the appolication window is about to start.
   *
   * @param sizeToSet {object} an object with 'width' and 'height' properties.
   */
  setSizeWillStart(sizeToSet) {}

  /**
   * Called 'set size' operation has ended (either failed/success).
   */
  setSizeEnded() {}

  /**
   * Called after a session had started.
   *
   * @param autSessionId {string} The AUT session ID.
   */
  testStarted(autSessionId) {}

  /**
   * Called after a session had ended.
   *
   * @param autSessionId {string} The AUT session ID.
   * @param testResults {object} The test results.
   */
  testEnded(autSessionId, testResults) {}

  /**
   * Called before a new validation will be started.
   *
   * @param autSessionId {string} The AUT session ID.
   * @param validationInfo {ValidationInfo} The validation parameters.
   */
  validationWillStart(autSessionId, validationInfo) {}

  /**
   * Called when a validation had ended.
   *
   * @param autSessionId {string} The AUT session ID.
   * @param validationId {string} The ID of the validation which had ended.
   * @param validationResult {ValidationResult} The validation results.
   */
  validationEnded(autSessionId, validationId, validationResult) {}
}

SessionEventHandler.ValidationInfo = ValidationInfo;
SessionEventHandler.ValidationResult = ValidationResult;
exports.SessionEventHandler = SessionEventHandler;
exports.ValidationInfo = ValidationInfo;
exports.ValidationResult = ValidationResult;
