'use strict'

/**
 * @readonly
 * @enum {string}
 */
const BrowserType = {
  CHROME: 'chrome',
  FIREFOX: 'firefox',
  IE_11: 'ie',
  IE_10: 'ie10',
  EDGE: 'edge',
  SAFARI: 'safari',
  CHROME_ONE_VERSION_BACK: 'chrome-1',
  CHROME_TWO_VERSIONS_BACK: 'chrome-2',
  FIREFOX_ONE_VERSION_BACK: 'firefox-1',
  FIREFOX_TWO_VERSIONS_BACK: 'firefox-2',
  SAFARI_ONE_VERSION_BACK: 'safari-1',
  SAFARI_TWO_VERSIONS_BACK: 'safari-2',
}

Object.freeze(BrowserType)
exports.BrowserType = BrowserType
