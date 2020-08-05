'use strict'

function getRenderMethods(renderWrapper) {
  const doGetRenderInfo = renderWrapper.getRenderInfo.bind(renderWrapper)
  const doRenderBatch = renderWrapper.renderBatch.bind(renderWrapper)
  const doPutResource = renderWrapper.putResource.bind(renderWrapper)
  const doGetRenderStatus = renderWrapper.getRenderStatus.bind(renderWrapper)
  const setRenderingInfo = renderWrapper.setRenderingInfo.bind(renderWrapper)
  const doGetUserAgents = renderWrapper.getUserAgents.bind(renderWrapper)
  return {
    doGetRenderInfo,
    doRenderBatch,
    doPutResource,
    doGetRenderStatus,
    setRenderingInfo,
    doGetUserAgents,
  }
}

module.exports = getRenderMethods
