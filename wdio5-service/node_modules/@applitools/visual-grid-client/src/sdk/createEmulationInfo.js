'use strict';

function createEmulationInfo({
  deviceName,
  screenOrientation,
  deviceScaleFactor,
  mobile,
  width,
  height,
}) {
  const isEmulation = deviceName || deviceScaleFactor || mobile;
  return isEmulation
    ? {
        deviceName,
        screenOrientation,
        device: !deviceName ? {width, height, deviceScaleFactor, mobile} : undefined,
      }
    : undefined;
}

module.exports = createEmulationInfo;
