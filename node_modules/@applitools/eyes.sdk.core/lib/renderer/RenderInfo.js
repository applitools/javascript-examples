'use strict';

const { GeneralUtils } = require('../utils/GeneralUtils');
const { Region } = require('../geometry/Region');

class RenderInfo {
  constructor() {
    this._width = undefined;
    this._height = undefined;
    this._sizeMode = undefined;
    this._selector = undefined;
    this._region = undefined;
  }

  /**
   * @param {Object} object
   * @return {RenderInfo}
   */
  static fromObject(object) {
    const mapping = {};
    if (object.region) mapping.region = Region.fromObject;
    
    return GeneralUtils.assignTo(new RenderInfo(), object, mapping);
  }

  /**
   * @param {RectangleSize} size
   * @param {string} [sizeMode='full-page'] supported values [viewport|full-page]
   * @return {RenderInfo}
   */
  static fromRectangleSize(size, sizeMode = 'full-page') {
    const renderInfo = new RenderInfo();
    renderInfo.setWidth(size.getWidth());
    renderInfo.setHeight(size.getHeight());
    renderInfo.setSizeMode(sizeMode);
    return renderInfo;
  }

  /** @return {number} */
  getWidth() {
    return this._width;
  }

  /** @param {number} value */
  setWidth(value) {
    this._width = value;
  }

  /** @return {number} */
  getHeight() {
    return this._height;
  }

  /** @param {number} value */
  setHeight(value) {
    this._height = value;
  }

  /** @return {string} */
  getSizeMode() {
    return this._sizeMode;
  }

  /** @param {string} value */
  setSizeMode(value) {
    this._sizeMode = value;
  }

  /** @return {string} */
  getSelector() {
    return this._selector;
  }

  /** @param {string} value */
  setSelector(value) {
    this._selector = value;
  }

  /** @return {Region} */
  getRegion() {
    return this._region;
  }

  /** @param {Region} value */
  setRegion(value) {
    this._region = value;
  }

  /** @override */
  toJSON() {
    const obj = GeneralUtils.toPlain(this);
    
    // TODO remove this when rendering-grid changes x/y to left/top
    if (obj.region) {
      obj.region.x = obj.region.left;
      obj.region.y = obj.region.top;
      delete obj.region.left;
      delete obj.region.top;
    }
    return obj;
  }

  /** @override */
  toString() {
    return `RenderInfo { ${JSON.stringify(this)} }`;
  }
}

exports.RenderInfo = RenderInfo;
