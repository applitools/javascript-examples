'use strict';

function isCss(contentType) {
  return /text\/css/.test(contentType);
}

module.exports = isCss;
