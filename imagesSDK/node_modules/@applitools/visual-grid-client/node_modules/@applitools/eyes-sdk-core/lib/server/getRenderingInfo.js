'use strict'

function makeGetRenderingInfo(doGetRenderingInfo) {
  let renderingInfoPromise
  return function getRenderingInfo() {
    if (!renderingInfoPromise) {
      renderingInfoPromise = doGetRenderingInfo()
    }
    return renderingInfoPromise
  }
}

module.exports = makeGetRenderingInfo
