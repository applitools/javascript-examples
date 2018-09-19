'use strict';

const { GeneralUtils } = require('../utils/GeneralUtils');

class BatchInfo {
  constructor() {
    this._id = undefined;
    this._name = undefined;
    this._startedAt = undefined;
  }

  /**
   * @param {object} object
   * @return {BatchInfo}
   */
  static fromObject(object) {
    return GeneralUtils.assignTo(new BatchInfo(), object);
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {string} */
  getId() {
    return this._id;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setId(value) {
    this._id = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {string} */
  getName() {
    return this._name;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setName(value) {
    this._name = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {Date} */
  getStartedAt() {
    return this._startedAt;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {Date} value */
  setStartedAt(value) {
    this._startedAt = value;
  }

  /** @override */
  toJSON() {
    return GeneralUtils.toPlain(this);
  }

  /** @override */
  toString() {
    return `BatchInfo { ${JSON.stringify(this)} }`;
  }
}

exports.BatchInfo = BatchInfo;
