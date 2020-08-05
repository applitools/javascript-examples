'use strict';

function filterInlineUrl(absoluteUrl) {
  return /^(blob|https?):/.test(absoluteUrl);
}

module.exports = filterInlineUrl;
