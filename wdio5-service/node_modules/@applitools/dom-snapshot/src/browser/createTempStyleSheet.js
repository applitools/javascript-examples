'use strict';

function createTempStylsheet(cssArrayBuffer) {
  const cssText = new TextDecoder('utf-8').decode(cssArrayBuffer);
  const head = document.head || document.querySelectorAll('head')[0];
  const style = document.createElement('style');
  style.type = 'text/css';
  style.setAttribute('data-desc', 'Applitools tmp variable created by DOM SNAPSHOT');
  head.appendChild(style);

  // This is required for IE8 and below.
  if (style.styleSheet) {
    style.styleSheet.cssText = cssText;
  } else {
    style.appendChild(document.createTextNode(cssText));
  }
  return style.sheet;
}

module.exports = createTempStylsheet;
