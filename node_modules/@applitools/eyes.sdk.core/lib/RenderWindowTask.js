'use strict';

const PromisePool = require('es6-promise-pool');

const { ArgumentGuard } = require('./ArgumentGuard');
const { RenderStatus } = require('./renderer/RenderStatus');

const DEFAULT_CONCURRENCY_LIMIT = 100;

class RenderWindowTask {
  /**
   * @param {PromiseFactory} promiseFactory An object which will be used for creating deferreds/promises.
   * @param {Logger} logger A logger instance.
   * @param {ServerConnector} serverConnector Our gateway to the agent
   */
  constructor(promiseFactory, logger, serverConnector) {
    ArgumentGuard.notNull(promiseFactory, 'promiseFactory');
    ArgumentGuard.notNull(logger, 'logger');
    ArgumentGuard.notNull(serverConnector, 'serverConnector');

    this._promiseFactory = promiseFactory;
    this._logger = logger;
    this._serverConnector = serverConnector;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {RenderRequest} renderRequest
   * @return {Promise<string>} Rendered image URL
   */
  renderWindow(renderRequest) {
    const that = this;
    return that.postRender(renderRequest)
      .then(runningRender => that.getRenderStatus(runningRender))
      .then(renderStatus => renderStatus.getImageLocation());
  }

  /**
   * @param {RenderRequest} renderRequest
   * @return {Promise<RunningRender>}
   */
  postRender(renderRequest) {
    const that = this;
    return that._serverConnector.render(renderRequest).then(newRender => {
      if (newRender.getRenderStatus() === RenderStatus.NEED_MORE_RESOURCES) {
        renderRequest.setRenderId(newRender.getRenderId());

        return that.putResources(renderRequest.getDom(), newRender).then(() => that.postRender(renderRequest));
      }

      return newRender;
    });
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {RenderRequest[]} renderRequests
   * @return {Promise<RunningRender>}
   */
  postRenderBatch(renderRequests) {
    return this._serverConnector.render(renderRequests);
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {RenderRequest} renderRequest
   * @return {Promise<void>}
   */
  checkAndPutResources(renderRequest) {
    const that = this;
    return that._serverConnector.render(renderRequest).then(newRender => {
      if (newRender.getRenderStatus() === RenderStatus.NEED_MORE_RESOURCES) {
        return that.putResources(renderRequest.getDom(), newRender);
      }

      return null;
    });
  }

  /**
   * @param {RunningRender} runningRender
   * @param {boolean} [delayBeforeRequest=false]
   * @return {Promise<RenderStatusResults>}
   */
  getRenderStatus(runningRender, delayBeforeRequest = false) {
    const that = this;
    return that._serverConnector.renderStatus(runningRender, delayBeforeRequest).then(renderStatusResults => {
      if (renderStatusResults.getStatus() === RenderStatus.RENDERING) {
        return that.getRenderStatus(runningRender, true);
      }

      if (renderStatusResults.getStatus() === RenderStatus.ERROR) {
        return that._promiseFactory.reject(renderStatusResults.getError());
      }

      return renderStatusResults;
    });
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {string[]} renderIds
   * @param {boolean} [delayBeforeRequest=false] If {@code true}, then the request will be delayed
   * @return {Promise<RenderStatusResults[]>}
   */
  getRenderStatusBatch(renderIds, delayBeforeRequest) {
    return this._serverConnector.renderStatusById(renderIds, delayBeforeRequest);
  }

  /**
   * @param {RGridDom} rGridDom
   * @param {RunningRender} runningRender
   * @param {number} [concurrency]
   * @return {Promise<void>}
   */
  putResources(rGridDom, runningRender, concurrency = DEFAULT_CONCURRENCY_LIMIT) {
    const that = this;
    let promise = that._promiseFactory.resolve();

    if (runningRender.getNeedMoreDom()) {
      promise = promise.then(() => that._serverConnector.renderPutResource(runningRender, rGridDom.asResource()));
    }

    if (runningRender.getNeedMoreResources()) {
      const resources = rGridDom.getResources();

      const pool = new PromisePool(function* generatePutResourcesPromises() {
        for (let l = resources.length - 1; l >= 0; l -= 1) {
          if (runningRender.getNeedMoreResources().includes(resources[l].getUrl())) {
            yield that._serverConnector.renderPutResource(runningRender, resources[l]);
          }
        }
      }, concurrency);

      promise = promise.then(() => pool.start());
    }

    return promise;
  }
}

exports.RenderWindowTask = RenderWindowTask;
