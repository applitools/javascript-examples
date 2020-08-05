'use strict'

const makeRenderer = require('./renderer')
const createRenderRequests = require('./createRenderRequests')
const {RenderingInfo, deserializeDomSnapshotResult} = require('@applitools/eyes-sdk-core')

require('@applitools/isomorphic-fetch') // TODO can just use node-fetch

async function takeScreenshot({
  showLogs,
  apiKey,
  serverUrl,
  proxy,
  renderInfo,
  cdt,
  url,
  resourceUrls,
  blobs,
  frames,
  browsers = [{width: 1024, height: 768}],
  sizeMode = 'full-page',
  // selector,
  // region,
  // scriptHooks,
}) {
  const {resourceContents, frames: framesWithResources} = deserializeDomSnapshotResult({
    blobs,
    frames,
  })

  const renderingInfo = new RenderingInfo({
    serviceUrl: renderInfo.serviceUrl,
    accessToken: renderInfo.accessToken,
    resultsUrl: renderInfo.resultsUrl,
  })

  const {createRGridDOMAndGetResourceMapping, renderBatch, waitForRenderedStatus} = makeRenderer({
    apiKey,
    showLogs,
    serverUrl,
    proxy,
    renderingInfo,
  })

  const {rGridDom: dom, allResources: resources} = await createRGridDOMAndGetResourceMapping({
    resourceUrls,
    resourceContents,
    cdt,
    frames: framesWithResources,
  })

  const renderRequests = createRenderRequests({
    url,
    dom,
    resources: Object.values(resources),
    browsers,
    renderInfo: renderingInfo,
    sizeMode,
    // selector,
    // region,
    // scriptHooks,
    sendDom: true,
  })

  const renderIds = await renderBatch(renderRequests)

  const renderStatusResults = await Promise.all(
    renderIds.map(renderId =>
      waitForRenderedStatus(renderId, () => false).then(({imageLocation}) => ({
        imageLocation,
        renderId,
      })),
    ),
  )

  return renderStatusResults
}

module.exports = takeScreenshot
