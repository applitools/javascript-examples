'use strict';

function assumeEnvironment(browser) {
  const viewportSize = browser.width &&
    browser.height && {width: browser.width, height: browser.height};
  const hostOSInfo = browser.name && browser.name.match(/ie|edge/) ? 'Windows' : 'Linux';
  const hostAppInfo = browser.name || 'chrome';
  const deviceInfo = browser.deviceName ? `${browser.deviceName} (Chrome emulation)` : 'Desktop';
  return {
    viewportSize,
    deviceInfo,
    hostAppInfo,
    hostOSInfo,
  };
}

module.exports = assumeEnvironment;
