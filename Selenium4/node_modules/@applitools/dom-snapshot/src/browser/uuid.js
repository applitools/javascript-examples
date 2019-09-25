'use strict';

function uuid() {
  return window.crypto.getRandomValues(new Uint32Array(1))[0];
}

module.exports = uuid;
