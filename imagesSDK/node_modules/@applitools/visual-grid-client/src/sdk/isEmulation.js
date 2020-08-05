'use strict'

function isEmulation(browserConfig) {
  const {deviceName, deviceScaleFactor, mobile} = browserConfig
  return deviceName || deviceScaleFactor || mobile
}

module.exports = isEmulation
