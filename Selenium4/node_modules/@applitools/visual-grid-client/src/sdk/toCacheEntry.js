'use strict';
const isCss = require('./isCss');

function toCacheEntry(rGridResource) {
  const contentType = rGridResource.getContentType();
  return {
    url: rGridResource.getUrl(),
    type: contentType,
    hash: rGridResource.getSha256Hash(),
    content: isCss(contentType) ? rGridResource.getContent() : undefined,
  };
}

module.exports = toCacheEntry;
