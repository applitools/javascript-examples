'use strict'

const ONE_VERSION_REGEX = /^(chrome|firefox|safari)\-one\-version\-back$/
const TWO_VERSIONS_REGEX = /^(chrome|firefox|safari)\-two\-versions\-back$/

function translateBrowserNameVersion(browserName) {
  if (ONE_VERSION_REGEX.test(browserName)) {
    return browserName.replace('one-version-back', '1')
  }

  if (TWO_VERSIONS_REGEX.test(browserName)) {
    return browserName.replace('two-versions-back', '2')
  }

  return browserName
}

module.exports = translateBrowserNameVersion
