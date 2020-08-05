'use strict';
const base64ToArrayBuffer = require('./base64ToArrayBuffer');

function buildCanvasBlobs(canvasElements) {
  return canvasElements.map(({url, element}) => {
    const data = element.toDataURL('image/png');
    const value = base64ToArrayBuffer(data.split(',')[1]);
    return {url, type: 'image/png', value};
  });
}

module.exports = buildCanvasBlobs;
