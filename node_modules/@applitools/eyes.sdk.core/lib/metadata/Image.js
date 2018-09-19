'use strict';

const { GeneralUtils } = require('../utils/GeneralUtils');

class Image {
  constructor() {
    this._id = undefined;
    this._size = undefined;
  }

  /**
   * @param {object} object
   * @return {Image}
   */
  static fromObject(object) {
    return GeneralUtils.assignTo(new Image(), object);
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
  /** @return {RectangleSize} */
  getSize() {
    return this._size;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {RectangleSize} value */
  setSize(value) {
    this._size = value;
  }

  /** @override */
  toJSON() {
    return GeneralUtils.toPlain(this);
  }

  /** @override */
  toString() {
    return `Image { ${JSON.stringify(this)} }`;
  }
}

exports.Image = Image;
