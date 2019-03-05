'use strict';

const { ArgumentGuard } = require('../utils/ArgumentGuard');
const { GeneralUtils } = require('../utils/GeneralUtils');
const { TypeUtils } = require('../utils/TypeUtils');
const { DateTimeUtils } = require('../utils/DateTimeUtils');

/**
 * A batch of tests.
 */
class BatchInfo {
  /**
   * Creates a new BatchInfo instance.
   *
   * @signature `new BatchInfo(batchInfo)`
   * @signature `new BatchInfo(name, startedAt?, id?)`
   * @signature `new BatchInfo({id: string, name: string, startedAt: Date|string})`
   *
   * @param {BatchInfo|{id?: string, name?: string, startedAt?: Date|string}|string} [varArg] BatchInfo or the name of
   *   this batch.
   * @param {string} [optStartedAt] Batch start time, defaults to the current time.
   * @param {string} [optId] ID of the batch, should be generated using GeneralUtils.guid().
   */
  constructor(varArg = {}, optStartedAt, optId) {
    if (varArg instanceof BatchInfo) {
      return new BatchInfo({ id: varArg.getId(), name: varArg.getName(), startedAt: varArg.getStartedAt() });
    }

    if (TypeUtils.isString(varArg)) {
      return new BatchInfo({ id: optId, name: varArg, startedAt: optStartedAt });
    }

    const { id, name } = varArg;
    let { startedAt } = varArg;

    if (startedAt && !(startedAt instanceof Date)) {
      startedAt = DateTimeUtils.fromISO8601DateTime(startedAt);
    }

    this._id = id || process.env.APPLITOOLS_BATCH_ID || GeneralUtils.guid();
    this._name = name || process.env.APPLITOOLS_BATCH_NAME;
    this._startedAt = startedAt || new Date();
  }

  /**
   * @return {string} The id of the current batch.
   */
  getId() {
    return this._id;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * Sets a unique identifier for the batch. Sessions with batch info which includes the same ID will be grouped
   * together.
   *
   * @param {string} value The batch's ID
   */
  setId(value) {
    ArgumentGuard.notNullOrEmpty(value, 'id');
    this._id = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return The name of the batch or {@code null} if anonymous.
   */
  getName() {
    return this._name;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {Date} The batch start date
   */
  getStartedAt() {
    return this._startedAt;
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
