'use strict';

function makeLog(referenceTime) {
  return function log() {
    const args = ['[dom-snapshot]', `[+${Date.now() - referenceTime}ms]`].concat(
      Array.from(arguments),
    );
    console.log.apply(console, args);
  };
}

module.exports = makeLog;
