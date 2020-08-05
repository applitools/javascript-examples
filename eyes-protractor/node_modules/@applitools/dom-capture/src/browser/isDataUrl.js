'use strict';

function isDataUrl(url) {
  return url && url.startsWith('data:');
}

module.exports = isDataUrl;
