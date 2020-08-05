'use strict'

const {GeneralUtils, RectangleSize} = require('@applitools/eyes-common')

class Image {
  /**
   * @param {string} id
   * @param {RectangleSize|object} size
   * @param {boolean} hasDom
   */
  constructor({id, size, hasDom} = {}) {
    if (size && !(size instanceof RectangleSize)) {
      size = new RectangleSize(size)
    }

    this._id = id
    this._size = size
    // this._rectangle = size;
    // this._location = size;
    this._hasDom = hasDom
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {string}
   */
  getId() {
    return this._id
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {string} value
   */
  setId(value) {
    this._id = value
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {RectangleSize}
   */
  getSize() {
    return this._size
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {RectangleSize} value
   */
  setSize(value) {
    this._size = value
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {boolean}
   */
  getHasDom() {
    return this._hasDom
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {boolean} value
   */
  setHasDom(value) {
    this._hasDom = value
  }

  /**
   * @override
   */
  toJSON() {
    return GeneralUtils.toPlain(this)
  }

  /**
   * @override
   */
  toString() {
    return `Image { ${JSON.stringify(this)} }`
  }
}

exports.Image = Image
