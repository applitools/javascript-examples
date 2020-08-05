/* global fetch */
'use strict'

const makeGetAllResources = require('./getAllResources')
const extractCssResources = require('./extractCssResources')
const makeFetchResource = require('./fetchResource')
const createResourceCache = require('./createResourceCache')
const makeWaitForRenderedStatus = require('./waitForRenderedStatus')
const makeGetRenderStatus = require('./getRenderStatus')
const makePutResources = require('./putResources')
const makeRenderBatch = require('./renderBatch')
const makeCreateRGridDOMAndGetResourceMapping = require('./createRGridDOMAndGetResourceMapping')
const getRenderMethods = require('./getRenderMethods')
const {createRenderWrapper} = require('./wrapperUtils')
const {ptimeoutWithError} = require('@applitools/functional-commons')
const {Logger} = require('@applitools/eyes-sdk-core')

const fetchResourceTimeout = 120000

function makeRenderer({apiKey, showLogs, serverUrl, proxy, renderingInfo}) {
  const logger = new Logger(showLogs)

  const renderWrapper = createRenderWrapper({
    apiKey,
    logHandler: logger.getLogHandler(),
    serverUrl,
    proxy,
  })

  const {doRenderBatch, doPutResource, doGetRenderStatus} = getRenderMethods(renderWrapper)
  renderWrapper.setRenderingInfo(renderingInfo)

  const resourceCache = createResourceCache()
  const fetchCache = createResourceCache()
  const fetchWithTimeout = url =>
    ptimeoutWithError(fetch(url), fetchResourceTimeout, 'fetch timed out')
  const fetchResource = makeFetchResource({logger, fetchCache, fetch: fetchWithTimeout})
  const putResources = makePutResources({doPutResource})
  const renderBatch = makeRenderBatch({
    putResources,
    resourceCache,
    fetchCache,
    logger,
    doRenderBatch,
  })
  const getRenderStatus = makeGetRenderStatus({logger, doGetRenderStatus})
  const waitForRenderedStatus = makeWaitForRenderedStatus({logger, getRenderStatus})
  const getAllResources = makeGetAllResources({
    resourceCache,
    extractCssResources,
    fetchResource,
    logger,
  })
  const createRGridDOMAndGetResourceMapping = makeCreateRGridDOMAndGetResourceMapping({
    getAllResources,
  })

  return {createRGridDOMAndGetResourceMapping, renderBatch, waitForRenderedStatus}
}

module.exports = makeRenderer
