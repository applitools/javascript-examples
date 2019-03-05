'use strict';

const { GeneralUtils } = require('@applitools/eyes-common');

/**
 * Encapsulates data for the render currently running in the client.
 */
class RunningRender {
  /**
   * @param {string} renderId
   * @param {string} jobId
   * @param {RenderStatus} renderStatus
   * @param {string[]} needMoreResources
   * @param {boolean} needMoreDom
   */
  constructor({ renderId, jobId, renderStatus, needMoreResources, needMoreDom } = {}) {
    this._renderId = renderId;
    this._jobId = jobId;
    this._renderStatus = renderStatus;
    this._needMoreResources = needMoreResources;
    this._needMoreDom = needMoreDom;
  }

  /**
   * @return {string}
   */
  getRenderId() {
    return this._renderId;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {string} value
   */
  setRenderId(value) {
    this._renderId = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {string}
   */
  getJobId() {
    return this._jobId;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {string} value
   */
  setJobId(value) {
    this._jobId = value;
  }

  /**
   * @return {RenderStatus}
   */
  getRenderStatus() {
    return this._renderStatus;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {RenderStatus} value
   */
  setRenderStatus(value) {
    this._renderStatus = value;
  }

  /**
   * @return {string[]}
   */
  getNeedMoreResources() {
    return this._needMoreResources;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {string[]} value
   */
  setNeedMoreResources(value) {
    this._needMoreResources = value;
  }

  /**
   * @return {boolean}
   */
  getNeedMoreDom() {
    return this._needMoreDom;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {boolean} value
   */
  setNeedMoreDom(value) {
    this._needMoreDom = value;
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
    return `RunningRender { ${JSON.stringify(this)} }`;
  }
}

exports.RunningRender = RunningRender;
