'use strict';

const { GeneralUtils } = require('../utils/GeneralUtils');

class Branch {
  constructor() {
    this._id = undefined;
    this._name = undefined;
    this._isDeleted = undefined;
  }

  /**
   * @param {object} object
   * @return {Branch}
   */
  static fromObject(object) {
    return GeneralUtils.assignTo(new Branch(), object);
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
  /** @return {boolean} */
  getIsDeleted() {
    return this._isDeleted;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {boolean} value */
  setIsDeleted(value) {
    this._isDeleted = value;
  }

  /** @override */
  toJSON() {
    return GeneralUtils.toPlain(this);
  }

  /** @override */
  toString() {
    return `Branch { ${JSON.stringify(this)} }`;
  }
}

exports.Branch = Branch;
