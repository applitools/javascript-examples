'use strict';

const arrayBufferToBase64 = require('./arrayBufferToBase64');
const processPage = require('./processPage');

function processPageAndSerialize(doc) {
  return processPage(doc).then(serializeFrame);
}

function serializeFrame(frame) {
  frame.blobs = frame.blobs.map(({url, type, value}) => ({
    url,
    type,
    value: arrayBufferToBase64(value),
  }));
  frame.frames.forEach(serializeFrame);
  return frame;
}

module.exports = processPageAndSerialize;
