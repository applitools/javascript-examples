'use strict';

const { GeneralUtils, DateTimeUtils } = require('@applitools/eyes-common');

const { Annotations } = require('./Annotations');
const { Image } = require('./Image');

class ExpectedAppOutput {
  // noinspection FunctionWithMoreThanThreeNegationsJS
  /**
   * @param {string} tag
   * @param {Image|object} image
   * @param {Image|object} thumbprint
   * @param {Date|string} occurredAt
   * @param {Annotations|object} annotations
   */
  constructor({ tag, image, thumbprint, occurredAt, annotations } = {}) {
    if (image && !(image instanceof Image)) {
      image = new Image(image);
    }

    if (thumbprint && !(thumbprint instanceof Image)) {
      thumbprint = new Image(thumbprint);
    }

    if (annotations && !(annotations instanceof Annotations)) {
      annotations = new Annotations(annotations);
    }

    if (occurredAt && !(occurredAt instanceof Date)) {
      occurredAt = DateTimeUtils.fromISO8601DateTime(occurredAt);
    }

    this._tag = tag;
    this._image = image;
    this._thumbprint = thumbprint;
    this._occurredAt = occurredAt;
    this._annotations = annotations;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {string}
   */
  getTag() {
    return this._tag;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {string} value
   */
  setTag(value) {
    this._tag = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {Image}
   */
  getImage() {
    return this._image;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {Image} value
   */
  setImage(value) {
    this._image = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {Image}
   */
  getThumbprint() {
    return this._thumbprint;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {Image} value
   */
  setThumbprint(value) {
    this._thumbprint = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {Date}
   */
  getOccurredAt() {
    return this._occurredAt;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {Date} value
   */
  setOccurredAt(value) {
    this._occurredAt = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {Annotations}
   */
  getAnnotations() {
    return this._annotations;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {Annotations} value
   */
  setAnnotations(value) {
    this._annotations = value;
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
    return `ExpectedAppOutput { ${JSON.stringify(this)} }`;
  }
}

exports.ExpectedAppOutput = ExpectedAppOutput;
