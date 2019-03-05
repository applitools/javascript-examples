'use strict';

const axios = require('axios');
const zlib = require('zlib');

const { ProxySettings } = require('./ProxySettings');
const { RenderingInfo } = require('./RenderingInfo');
const { RunningSession } = require('./RunningSession');
const { TestResults } = require('../TestResults');
const { MatchResult } = require('../match/MatchResult');
const { GeneralUtils } = require('../utils/GeneralUtils');
const { ArgumentGuard } = require('../ArgumentGuard');

const { RunningRender } = require('../renderer/RunningRender');
const { RenderStatusResults } = require('../renderer/RenderStatusResults');

// Constants
const EYES_API_PATH = '/api/sessions';
const RETRY_REQUEST_INTERVAL = 500; // ms
const LONG_REQUEST_DELAY_MS = 2000; // ms
const MAX_LONG_REQUEST_DELAY_MS = 10000; // ms
const DEFAULT_TIMEOUT_MS = 300000; // ms (5 min)
const LONG_REQUEST_DELAY_MULTIPLICATIVE_INCREASE_FACTOR = 1.5;

const DEFAULT_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const HTTP_STATUS_CODES = {
  CREATED: 201,
  ACCEPTED: 202,
  OK: 200,
  GONE: 410,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  GATEWAY_TIMEOUT: 504,
};

/**
 * @private
 * @param {ServerConnector} that
 * @param {string} name
 * @param {object} options
 * @param {number} [retry=1]
 * @param {boolean} [delayBeforeRetry=false]
 * @return {Promise<AxiosResponse>}
 */
const sendRequest = (that, name, options, retry = 1, delayBeforeRetry = false) => {
  if (options.data instanceof Buffer && options.data.length === 0) {
    // This 'if' fixes a bug in Axios whereby Axios doesn't send a content-length when the buffer is of length 0.
    // This behavior makes the rendering-grid's nginx get stuck as it doesn't know when the body ends.
    // https://github.com/axios/axios/issues/1701
    options.data = '';
  }
  // eslint-disable-next-line max-len
  that._logger.verbose(`ServerConnector.${name} will now post call to ${options.url} with params ${JSON.stringify(options.params)}`);
  return axios(options)
    .then(response => {
      that._logger.verbose(`ServerConnector.${name} - result ${response.statusText}, status code ${response.status}, url ${options.url}`);
      return response;
    })
    .catch(error => {
      const reasonMessage = error.response && error.response.statusText ? error.response.statusText : error.message;
      that._logger.log(`ServerConnector.${name} - post failed on ${options.url}: ${reasonMessage} with params ${JSON.stringify(options.params).slice(0, 100)}`);

      const validStatusCodes = [
        HTTP_STATUS_CODES.NOT_FOUND,
        HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        HTTP_STATUS_CODES.GATEWAY_TIMEOUT,
      ];

      if (retry > 0 && ((error.response && validStatusCodes.includes(error.response.status)) || error.code === 'ECONNRESET')) {
        if (delayBeforeRetry) {
          return GeneralUtils.sleep(RETRY_REQUEST_INTERVAL, that._promiseFactory)
            .then(() => sendRequest(that, name, options, retry - 1, delayBeforeRetry));
        }

        return sendRequest(that, name, options, retry - 1, delayBeforeRetry);
      }

      throw error;
    });
};

/**
 * @private
 * @param {ServerConnector} that
 * @param {string} name
 * @param {object} options
 * @param {number} delay
 * @return {Promise<AxiosResponse>}
 */
const longRequestLoop = (that, name, options, delay) => {
  // eslint-disable-next-line no-param-reassign
  delay = Math.min(MAX_LONG_REQUEST_DELAY_MS, Math.floor(delay * LONG_REQUEST_DELAY_MULTIPLICATIVE_INCREASE_FACTOR));
  that._logger.verbose(`${name}: Still running... Retrying in ${delay} ms`);

  return GeneralUtils.sleep(delay, that._promiseFactory)
    .then(() => {
      options.headers['Eyes-Date'] = GeneralUtils.toRfc1123DateTime(); // eslint-disable-line no-param-reassign
      return sendRequest(that, name, options);
    })
    .then(response => {
      if (response.status !== HTTP_STATUS_CODES.OK) {
        return response;
      }
      return longRequestLoop(that, name, options, delay);
    });
};

/**
 * @private
 * @param {ServerConnector} that
 * @param {string} name
 * @param {AxiosResponse} response
 * @return {Promise<AxiosResponse>}
 */
const longRequestCheckStatus = (that, name, response) => {
  switch (response.status) {
    case HTTP_STATUS_CODES.OK: {
      return that._promiseFactory.resolve(response);
    }
    case HTTP_STATUS_CODES.ACCEPTED: {
      const options = GeneralUtils.mergeDeep(that._httpOptions, {
        method: 'GET',
        url: response.headers.location,
        params: { apiKey: that.getApiKey() },
      });
      return longRequestLoop(that, name, options, LONG_REQUEST_DELAY_MS)
        .then(requestResponse => longRequestCheckStatus(that, name, requestResponse));
    }
    case HTTP_STATUS_CODES.CREATED: {
      const options = GeneralUtils.mergeDeep(that._httpOptions, {
        method: 'DELETE',
        url: response.headers.location,
        params: { apiKey: that.getApiKey() },
        headers: { 'Eyes-Date': GeneralUtils.toRfc1123DateTime() },
      });
      return sendRequest(that, name, options);
    }
    case HTTP_STATUS_CODES.GONE: {
      return that._promiseFactory.reject(new Error('The server task has gone.'));
    }
    default: {
      return that._promiseFactory.reject(new Error(`Unknown error during long request: ${JSON.stringify(response)}`));
    }
  }
};

/**
 * @private
 * @param {ServerConnector} that
 * @param {string} name
 * @param {object} options
 * @return {Promise<AxiosResponse>}
 */
const sendLongRequest = (that, name, options = {}) => {
  // extend headers of the request
  options.headers['Eyes-Expect'] = '202+location'; // eslint-disable-line no-param-reassign
  options.headers['Eyes-Date'] = GeneralUtils.toRfc1123DateTime(); // eslint-disable-line no-param-reassign

  return sendRequest(that, name, options).then(response => longRequestCheckStatus(that, name, response));
};

/**
 * Creates a bytes representation of the given JSON.
 *
 * @private
 * @param {object} jsonData The data from for which to create the bytes representation.
 * @return {Buffer} a buffer of bytes which represents the stringified JSON, prefixed with size.
 */
const createDataBytes = jsonData => {
  const dataStr = JSON.stringify(jsonData);
  const dataLen = Buffer.byteLength(dataStr, 'utf8');

  // The result buffer will contain the length of the data + 4 bytes of size
  const result = Buffer.alloc(dataLen + 4);
  result.writeUInt32BE(dataLen, 0);
  result.write(dataStr, 4, dataLen);
  return result;
};

/**
 * Provides an API for communication with the Applitools server.
 */
class ServerConnector {
  /**
   * @param {PromiseFactory} promiseFactory An object which will be used for creating deferreds/promises.
   * @param {Logger} logger
   * @param {string} serverUrl
   */
  constructor(promiseFactory, logger, serverUrl) {
    this._promiseFactory = promiseFactory;
    this._logger = logger;
    this._serverUrl = serverUrl;
    this._apiKey = undefined;

    this._renderingServerUrl = undefined;
    this._renderingAuthToken = undefined;

    this._proxySettings = undefined;
    this._httpOptions = {
      proxy: undefined,
      headers: DEFAULT_HEADERS,
      timeout: DEFAULT_TIMEOUT_MS,
      responseType: 'json',
      params: {},
    };
  }

  /**
   * Sets the current server URL used by the rest client.
   *
   * @param serverUrl {string} The URI of the rest server.
   */
  setServerUrl(serverUrl) {
    ArgumentGuard.notNull(serverUrl, 'serverUrl');
    this._serverUrl = serverUrl;
  }

  /**
   * @return {string} The URI of the eyes server.
   */
  getServerUrl() {
    return this._serverUrl;
  }

  /**
   * Sets the API key of your applitools Eyes account.
   *
   * @param {string} apiKey The api key to set.
   */
  setApiKey(apiKey) {
    ArgumentGuard.notNull(apiKey, 'apiKey');
    this._apiKey = apiKey;
  }

  /**
   *
   * @return {string} The currently set API key or {@code null} if no key is set.
   */
  getApiKey() {
    // noinspection JSUnresolvedVariable
    return this._apiKey || process.env.APPLITOOLS_API_KEY;
  }

  /**
   * Sets the current rendering server URL used by the client.
   *
   * @param serverUrl {string} The URI of the rendering server.
   */
  setRenderingServerUrl(serverUrl) {
    ArgumentGuard.notNull(serverUrl, 'serverUrl');
    this._renderingServerUrl = serverUrl;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {string} The URI of the rendering server.
   */
  getRenderingServerUrl() {
    return this._renderingServerUrl;
  }

  /**
   * Sets the API key of your applitools Eyes account.
   *
   * @param {string} authToken The api key to set.
   */
  setRenderingAuthToken(authToken) {
    ArgumentGuard.notNull(authToken, 'authToken');
    this._renderingAuthToken = authToken;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   *
   * @return {string} The currently set API key or {@code null} if no key is set.
   */
  getRenderingAuthToken() {
    return this._renderingAuthToken;
  }

  /**
   * Sets the proxy settings to be used by the rest client.
   *
   * @param {ProxySettings|string} arg1 The proxy setting or url to be used. If {@code null} then no proxy is set.
   * @param {string} [username]
   * @param {string} [password]
   */
  setProxy(arg1, username, password) {
    if (!arg1) {
      this._proxySettings = undefined;
      delete this._httpOptions.proxy;
      return;
    }

    if (arg1 instanceof ProxySettings) {
      this._proxySettings = arg1;
    } else {
      this._proxySettings = new ProxySettings(arg1, username, password);
    }

    this._httpOptions.proxy = this._proxySettings.toProxyObject();

    // TODO: remove hot-fix when axios release official fix
    if (this._httpOptions.proxy.protocol === 'http:') {
      this._httpOptions.transport = require('http'); // eslint-disable-line
    }
  }

  /**
   * @return {ProxySettings} The current proxy settings, or {@code null} if no proxy is set.
   */
  getProxy() {
    return this._proxySettings;
  }

  /**
   * Whether sessions are removed immediately after they are finished.
   *
   * @param shouldRemove {boolean}
   */
  setRemoveSession(shouldRemove) {
    this._httpOptions.params.removeSession = shouldRemove;
  }

  /**
   * @return {boolean} Whether sessions are removed immediately after they are finished.
   */
  getRemoveSession() {
    return !!this._httpOptions.params.removeSession;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * Sets the connect and read timeouts for web requests.
   *
   * @param {number} timeout Connect/Read timeout in milliseconds. 0 equals infinity.
   */
  setTimeout(timeout) {
    ArgumentGuard.greaterThanOrEqualToZero(timeout, 'timeout');
    this._httpOptions.timeout = timeout;
  }

  /**
   *
   * @return {number} The timeout for web requests (in seconds).
   */
  getTimeout() {
    return this._httpOptions.timeout;
  }

  /**
   * Starts a new running session in the agent. Based on the given parameters, this running session will either be
   * linked to an existing session, or to a completely new session.
   *
   * @param {SessionStartInfo} sessionStartInfo The start parameters for the session.
   * @return {Promise<RunningSession>} RunningSession object which represents the current running session
   */
  startSession(sessionStartInfo) {
    ArgumentGuard.notNull(sessionStartInfo, 'sessionStartInfo');
    this._logger.verbose(`ServerConnector.startSession called with: ${sessionStartInfo}`);

    const that = this;
    const options = GeneralUtils.mergeDeep(that._httpOptions, {
      method: 'POST',
      url: GeneralUtils.urlConcat(this._serverUrl, EYES_API_PATH, '/running'),
      params: {
        apiKey: that.getApiKey(),
      },
      data: {
        startInfo: sessionStartInfo,
      },
    });

    return sendRequest(that, 'startSession', options).then(response => {
      const validStatusCodes = [HTTP_STATUS_CODES.OK, HTTP_STATUS_CODES.CREATED];
      if (validStatusCodes.includes(response.status)) {
        const runningSession = RunningSession.fromObject(response.data);
        runningSession.setNewSession(response.status === HTTP_STATUS_CODES.CREATED);
        that._logger.verbose('ServerConnector.startSession - post succeeded', runningSession);
        return runningSession;
      }

      throw new Error(`ServerConnector.startSession - unexpected status (${response.statusText})`);
    });
  }

  /**
   * Stops the running session.
   *
   * @param {RunningSession} runningSession The running session to be stopped.
   * @param {boolean} isAborted
   * @param {boolean} save
   * @return {Promise<TestResults>} TestResults object for the stopped running session
   */
  stopSession(runningSession, isAborted, save) {
    ArgumentGuard.notNull(runningSession, 'runningSession');
    // eslint-disable-next-line max-len
    this._logger.verbose(`ServerConnector.stopSession called with ${JSON.stringify({ isAborted, updateBaseline: save })} for session: ${runningSession}`);

    const that = this;
    const options = GeneralUtils.mergeDeep(that._httpOptions, {
      method: 'DELETE',
      url: GeneralUtils.urlConcat(this._serverUrl, EYES_API_PATH, '/running', runningSession.getId()),
      params: {
        apiKey: that.getApiKey(),
        aborted: isAborted,
        updateBaseline: save,
      },
    });

    return sendLongRequest(that, 'stopSession', options).then(response => {
      const validStatusCodes = [HTTP_STATUS_CODES.OK];
      if (validStatusCodes.includes(response.status)) {
        const testResults = TestResults.fromObject(response.data);
        that._logger.verbose('ServerConnector.stopSession - post succeeded', testResults);
        return testResults;
      }

      throw new Error(`ServerConnector.stopSession - unexpected status (${response.statusText})`);
    });
  }

  /**
   * Matches the current window (held by the WebDriver) to the expected window.
   *
   * @param {RunningSession} runningSession The current agent's running session.
   * @param {MatchWindowData} matchWindowData Encapsulation of a capture taken from the application.
   * @return {Promise<MatchResult>} The results of the window matching.
   */
  matchWindow(runningSession, matchWindowData) {
    ArgumentGuard.notNull(runningSession, 'runningSession');
    ArgumentGuard.notNull(matchWindowData, 'matchWindowData');
    this._logger.verbose(`ServerConnector.matchWindow called with ${matchWindowData} for session: ${runningSession}`);

    const that = this;
    const options = GeneralUtils.mergeDeep(that._httpOptions, {
      method: 'POST',
      url: GeneralUtils.urlConcat(this._serverUrl, EYES_API_PATH, '/running', runningSession.getId()),
      params: {
        apiKey: that.getApiKey(),
      },
      data: matchWindowData,
    });

    if (matchWindowData.getAppOutput().getScreenshot64()) {
      // if there is screenshot64, then we will send application/octet-stream body instead of application/json
      const screenshot64 = matchWindowData.getAppOutput().getScreenshot64();
      matchWindowData.getAppOutput().setScreenshot64(null); // remove screenshot64 from json
      options.headers['Content-Type'] = 'application/octet-stream';
      // noinspection JSValidateTypes
      options.data = Buffer.concat([createDataBytes(matchWindowData), screenshot64]);
      matchWindowData.getAppOutput().setScreenshot64(screenshot64);
    }

    return sendLongRequest(that, 'matchWindow', options).then(response => {
      const validStatusCodes = [HTTP_STATUS_CODES.OK];
      if (validStatusCodes.includes(response.status)) {
        const matchResult = MatchResult.fromObject(response.data);
        that._logger.verbose('ServerConnector.matchWindow - post succeeded', matchResult);
        return matchResult;
      }

      throw new Error(`ServerConnector.matchWindow - unexpected status (${response.statusText})`);
    });
  }

  /**
   * Matches the current window in single request.
   *
   * @param {MatchSingleWindowData} matchSingleWindowData Encapsulation of a capture taken from the application.
   * @return {Promise<TestResults>} The results of the window matching.
   */
  matchSingleWindow(matchSingleWindowData) {
    ArgumentGuard.notNull(matchSingleWindowData, 'matchSingleWindowData');
    this._logger.verbose(`ServerConnector.matchSingleWindow called with ${matchSingleWindowData}`);

    const that = this;
    const options = GeneralUtils.mergeDeep(that._httpOptions, {
      method: 'POST',
      url: GeneralUtils.urlConcat(this._serverUrl, EYES_API_PATH),
      params: {
        apiKey: that.getApiKey(),
      },
      data: matchSingleWindowData,
    });

    if (matchSingleWindowData.getAppOutput().getScreenshot64()) {
      // if there is screenshot64, then we will send application/octet-stream body instead of application/json
      const screenshot64 = matchSingleWindowData.getAppOutput().getScreenshot64();
      matchSingleWindowData.getAppOutput().setScreenshot64(null); // remove screenshot64 from json
      options.headers['Content-Type'] = 'application/octet-stream';
      // noinspection JSValidateTypes
      options.data = Buffer.concat([createDataBytes(matchSingleWindowData), screenshot64]);
      matchSingleWindowData.getAppOutput().setScreenshot64(screenshot64);
    }

    return sendLongRequest(that, 'matchSingleWindow', options).then(response => {
      const validStatusCodes = [HTTP_STATUS_CODES.OK];
      if (validStatusCodes.includes(response.status)) {
        const testResults = TestResults.fromObject(response.data);
        that._logger.verbose('ServerConnector.matchSingleWindow - post succeeded', testResults);
        return testResults;
      }

      throw new Error(`ServerConnector.matchSingleWindow - unexpected status (${response.statusText})`);
    });
  }

  // noinspection JSValidateJSDoc
  /**
   * Replaces an actual image in the current running session.
   *
   * @param {RunningSession} runningSession The current agent's running session.
   * @param {number} stepIndex The zero based index of the step in which to replace the actual image.
   * @param {MatchWindowData} matchWindowData Encapsulation of a capture taken from the application.
   * @return {Promise<MatchResult>} The results of the window matching.
   */
  replaceWindow(runningSession, stepIndex, matchWindowData) {
    ArgumentGuard.notNull(runningSession, 'runningSession');
    ArgumentGuard.notNull(matchWindowData, 'matchWindowData');
    this._logger.verbose(`ServerConnector.replaceWindow called with ${matchWindowData} for session: ${runningSession}`);

    const that = this;
    const options = GeneralUtils.mergeDeep(that._httpOptions, {
      method: 'PUT',
      url: GeneralUtils.urlConcat(this._serverUrl, EYES_API_PATH, '/running', runningSession.getId(), stepIndex),
      params: {
        apiKey: that.getApiKey(),
      },
      headers: {
        'Content-Type': 'application/octet-stream',
      },
      data: Buffer.concat([createDataBytes(matchWindowData), matchWindowData.getAppOutput().getScreenshot64()]),
    });

    return sendLongRequest(that, 'replaceWindow', options).then(response => {
      const validStatusCodes = [HTTP_STATUS_CODES.OK];
      if (validStatusCodes.includes(response.status)) {
        const matchResult = MatchResult.fromObject(response.data);
        that._logger.verbose('ServerConnector.replaceWindow - post succeeded', matchResult);
        return matchResult;
      }

      throw new Error(`ServerConnector.replaceWindow - unexpected status (${response.statusText})`);
    });
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * Initiate a rendering using RenderingGrid API
   *
   * @return {Promise<RenderingInfo>} The results of the render request
   */
  renderInfo() {
    this._logger.verbose('ServerConnector.renderInfo called.');

    const that = this;
    const options = GeneralUtils.mergeDeep(that._httpOptions, {
      method: 'GET',
      url: GeneralUtils.urlConcat(this._serverUrl, EYES_API_PATH, '/renderinfo'),
      params: {
        apiKey: that.getApiKey(),
      },
    });

    return sendRequest(that, 'renderInfo', options).then(response => {
      const validStatusCodes = [HTTP_STATUS_CODES.OK];
      if (validStatusCodes.includes(response.status)) {
        const renderingInfo = RenderingInfo.fromObject(response.data);
        that._logger.verbose('ServerConnector.renderInfo - post succeeded', renderingInfo);
        return renderingInfo;
      }

      throw new Error(`ServerConnector.renderInfo - unexpected status (${response.statusText})`);
    });
  }

  /**
   * Initiate a rendering using RenderingGrid API
   *
   * @param {RenderRequest[]|RenderRequest} renderRequest The current agent's running session.
   * @return {Promise<RunningRender[]|RunningRender>} The results of the render request
   */
  render(renderRequest) {
    ArgumentGuard.notNull(renderRequest, 'renderRequest');
    this._logger.verbose(`ServerConnector.render called with ${renderRequest}`);

    const that = this;
    const isBatch = Array.isArray(renderRequest);
    const options = GeneralUtils.mergeDeep(that._httpOptions, {
      method: 'POST',
      url: GeneralUtils.urlConcat(this._renderingServerUrl, '/render'),
      headers: {
        'X-Auth-Token': that._renderingAuthToken,
      },
      data: isBatch ? renderRequest : [renderRequest],
    });

    return sendRequest(that, 'render', options).then(response => {
      const validStatusCodes = [HTTP_STATUS_CODES.OK];
      if (validStatusCodes.includes(response.status)) {
        let runningRender = Array.from(response.data).map(resultsData => RunningRender.fromObject(resultsData));
        if (!isBatch) {
          runningRender = runningRender[0]; // eslint-disable-line prefer-destructuring
        }

        that._logger.verbose('ServerConnector.render - post succeeded', runningRender);
        return runningRender;
      }

      throw new Error(`ServerConnector.render - unexpected status (${response.statusText})`);
    });
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * Check if resource exists on the server
   *
   * @param {RunningRender} runningRender The running render (for second request only)
   * @param {RGridResource} resource The resource to use
   * @return {Promise<boolean>} Whether resource exists on the server or not
   */
  renderCheckResource(runningRender, resource) {
    ArgumentGuard.notNull(runningRender, 'runningRender');
    ArgumentGuard.notNull(resource, 'resource');
    // eslint-disable-next-line max-len
    this._logger.verbose(`ServerConnector.checkResourceExists called with resource#${resource.getSha256Hash()} for render: ${runningRender}`);

    const that = this;
    const options = GeneralUtils.mergeDeep(that._httpOptions, {
      method: 'HEAD',
      url: GeneralUtils.urlConcat(this._renderingServerUrl, '/resources/sha256/', resource.getSha256Hash()),
      headers: {
        'X-Auth-Token': that._renderingAuthToken,
      },
      params: {
        'render-id': runningRender.getRenderId(),
      },
    });

    return sendRequest(that, 'renderCheckResource', options).then(response => {
      const validStatusCodes = [HTTP_STATUS_CODES.OK, HTTP_STATUS_CODES.NOT_FOUND];
      if (validStatusCodes.includes(response.status)) {
        that._logger.verbose('ServerConnector.checkResourceExists - request succeeded');
        return response.status === HTTP_STATUS_CODES.OK;
      }

      throw new Error(`ServerConnector.checkResourceExists - unexpected status (${response.statusText})`);
    });
  }

  /**
   * Upload resource to the server
   *
   * @param {RunningRender} runningRender The running render (for second request only)
   * @param {RGridResource} resource The resource to upload
   * @return {Promise<boolean>} True if resource was uploaded
   */
  renderPutResource(runningRender, resource) {
    ArgumentGuard.notNull(runningRender, 'runningRender');
    ArgumentGuard.notNull(resource, 'resource');
    ArgumentGuard.notNull(resource.getContent(), 'resource.getContent()');
    // eslint-disable-next-line max-len
    this._logger.verbose(`ServerConnector.putResource called with resource#${resource.getSha256Hash()} for render: ${runningRender}`);

    const that = this;
    const options = GeneralUtils.mergeDeep(that._httpOptions, {
      method: 'PUT',
      url: GeneralUtils.urlConcat(this._renderingServerUrl, '/resources/sha256/', resource.getSha256Hash()),
      headers: {
        'X-Auth-Token': that._renderingAuthToken,
        'Content-Type': resource.getContentType(),
      },
      params: {
        'render-id': runningRender.getRenderId(),
      },
      data: resource.getContent(),
    });

    return sendRequest(that, 'renderPutResource', options).then(response => {
      const validStatusCodes = [HTTP_STATUS_CODES.OK];
      if (validStatusCodes.includes(response.status)) {
        that._logger.verbose('ServerConnector.putResource - request succeeded');
        return true;
      }

      throw new Error(`ServerConnector.putResource - unexpected status (${response.statusText})`);
    });
  }

  /**
   * Get the rendering status for current render
   *
   * @param {RunningRender} runningRender The running render
   * @param {boolean} [delayBeforeRequest=false] If {@code true}, then the request will be delayed
   * @return {Promise.<RenderStatusResults>} The render's status
   */
  renderStatus(runningRender, delayBeforeRequest = false) {
    return this.renderStatusById(runningRender.getRenderId(), delayBeforeRequest);
  }

  /**
   * Get the rendering status for current render
   *
   * @param {string[]|string} renderId The running renderId
   * @param {boolean} [delayBeforeRequest=false] If {@code true}, then the request will be delayed
   * @return {Promise<RenderStatusResults[]|RenderStatusResults>} The render's status
   */
  renderStatusById(renderId, delayBeforeRequest = false) {
    ArgumentGuard.notNull(renderId, 'renderId');
    this._logger.verbose(`ServerConnector.renderStatus called for render: ${renderId}`);

    const that = this;
    const isBatch = Array.isArray(renderId);
    const options = GeneralUtils.mergeDeep(that._httpOptions, {
      method: 'POST',
      url: GeneralUtils.urlConcat(this._renderingServerUrl, '/render-status'),
      headers: {
        'X-Auth-Token': that._renderingAuthToken,
      },
      data: isBatch ? renderId : [renderId],
    });

    let promise = that._promiseFactory.resolve();
    if (delayBeforeRequest) {
      promise = promise.then(() => {
        that._logger.verbose(`ServerConnector.renderStatus request delayed for ${RETRY_REQUEST_INTERVAL} ms.`);
        return GeneralUtils.sleep(RETRY_REQUEST_INTERVAL, that._promiseFactory);
      });
    }

    return promise.then(() => sendRequest(that, 'renderStatus', options, 3, true).then(response => {
      const validStatusCodes = [HTTP_STATUS_CODES.OK];
      if (validStatusCodes.includes(response.status)) {
        let renderStatus = Array.from(response.data).map(resultsData => RenderStatusResults.fromObject(resultsData));
        if (!isBatch) {
          renderStatus = renderStatus[0]; // eslint-disable-line prefer-destructuring
        }

        that._logger.verbose(`ServerConnector.renderStatus - get succeeded for ${renderId} -`, renderStatus);
        return renderStatus;
      }

      throw new Error(`ServerConnector.renderStatus - unexpected status (${response.statusText})`);
    }));
  }

  /**
   * @param {string} domJson
   * @return {Promise<string>}
   */
  postDomSnapshot(domJson) {
    ArgumentGuard.notNull(domJson, 'domJson');
    this._logger.verbose('ServerConnector.postDomSnapshot called');

    const that = this;
    const options = GeneralUtils.mergeDeep(that._httpOptions, {
      method: 'POST',
      url: GeneralUtils.urlConcat(this._serverUrl, EYES_API_PATH, '/running/data'),
      params: {
        apiKey: that.getApiKey(),
      },
      headers: {
        'Content-Type': 'application/octet-stream',
      },
    });

    options.data = zlib.gzipSync(Buffer.from(domJson));
    return sendRequest(that, 'postDomSnapshot', options).then(response => {
      const validStatusCodes = [HTTP_STATUS_CODES.OK, HTTP_STATUS_CODES.CREATED];
      if (validStatusCodes.includes(response.status)) {
        that._logger.verbose('ServerConnector.postDomSnapshot - post succeeded');
        return response.headers.location;
      }

      throw new Error(`ServerConnector.postDomSnapshot - unexpected status (${response.statusText})`);
    });
  }
}

exports.ServerConnector = ServerConnector;
