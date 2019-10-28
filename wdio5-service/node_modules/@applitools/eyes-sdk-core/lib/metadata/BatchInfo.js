'use strict';

const { GeneralUtils, DateTimeUtils } = require('@applitools/eyes-common');

class BatchInfo {
  /**
   * @param {string} id
   * @param {string} name
   * @param {Date|string} startedAt
   */
  constructor({ id, name, startedAt } = {}) {
    if (startedAt && !(startedAt instanceof Date)) {
      startedAt = DateTimeUtils.fromISO8601DateTime(startedAt);
    }

    this._id = id;
    this._name = name;
    this._startedAt = startedAt;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {string}
   */
  getId() {
    return this._id;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {string} value
   */
  setId(value) {
    this._id = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {string}
   */
  getName() {
    return this._name;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {string} value
   */
  setName(value) {
    this._name = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {Date}
   */
  getStartedAt() {
    return this._startedAt;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {Date} value
   */
  setStartedAt(value) {
    this._startedAt = value;
  }

  /**
   * @override
   */
  toJSON() {
    return GeneralUtils.toPlain(this);
  }

  /**
   * @override
   */
  toString() {
    return `BatchInfo { ${JSON.stringify(this)} }`;
  }
}

exports.BatchInfo = BatchInfo;
