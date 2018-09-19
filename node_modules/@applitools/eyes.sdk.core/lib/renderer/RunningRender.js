'use strict';

const { GeneralUtils } = require('../utils/GeneralUtils');

/**
 * Encapsulates data for the render currently running in the client.
 */
class RunningRender {
  constructor() {
    this._renderId = false;
    this._jobId = false;

    this._renderStatus = undefined;
    this._needMoreResources = undefined;
    this._needMoreDom = undefined;
  }

  /**
   * @param {object} object
   * @return {RunningRender}
   */
  static fromObject(object) {
    return GeneralUtils.assignTo(new RunningRender(), object);
  }

  /** @return {string} */
  getRenderId() {
    return this._renderId;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setRenderId(value) {
    this._renderId = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {string} */
  getJobId() {
    return this._jobId;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setJobId(value) {
    this._jobId = value;
  }

  /** @return {RenderStatus} */
  getRenderStatus() {
    return this._renderStatus;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {RenderStatus} value */
  setRenderStatus(value) {
    this._renderStatus = value;
  }

  /** @return {string[]} */
  getNeedMoreResources() {
    return this._needMoreResources;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string[]} value */
  setNeedMoreResources(value) {
    this._needMoreResources = value;
  }

  /** @return {boolean} */
  getNeedMoreDom() {
    return this._needMoreDom;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {boolean} value */
  setNeedMoreDom(value) {
    this._needMoreDom = value;
  }

  /** @override */
  toJSON() {
    return GeneralUtils.toPlain(this);
  }

  /** @override */
  toString() {
    return `RunningRender { ${JSON.stringify(this)} }`;
  }
}

exports.RunningRender = RunningRender;
