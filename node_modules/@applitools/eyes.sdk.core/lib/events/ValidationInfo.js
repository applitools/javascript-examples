'use strict';

const { GeneralUtils } = require('./../utils/GeneralUtils');

/**
 * Encapsulates the information for the validation about to execute.
 */
class ValidationInfo {
  constructor() {
    this._validationId = undefined;
    this._tag = undefined;
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

  getTag() {
    return this._tag;
  }

  /** @override */
  toJSON() {
    return GeneralUtils.toPlain(this);
  }
}

exports.ValidationInfo = ValidationInfo;
