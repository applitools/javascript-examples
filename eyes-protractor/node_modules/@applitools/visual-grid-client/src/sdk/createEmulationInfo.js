'use strict'
const isEmulation = require('./isEmulation')

function createEmulationInfo(browserConfig) {
  const {deviceName, screenOrientation, deviceScaleFactor, mobile, width, height} = browserConfig
  return isEmulation(browserConfig)
    ? {
        deviceName,
        screenOrientation,
        device: !deviceName ? {width, height, deviceScaleFactor, mobile} : undefined,
      }
    : undefined
}

module.exports = createEmulationInfo
