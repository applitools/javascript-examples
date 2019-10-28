'use strict';

const bgImageRe = /url\((?!['"]?:)['"]?([^'")]*)['"]?\)/;

function getBackgroundImageUrl(cssText) {
  const match = cssText ? cssText.match(bgImageRe) : undefined;
  return match ? match[1] : match;
}

module.exports = getBackgroundImageUrl;
