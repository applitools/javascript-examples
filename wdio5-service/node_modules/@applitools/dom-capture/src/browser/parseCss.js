'use strict';

function parseCss(styleContent) {
  var doc = document.implementation.createHTMLDocument(''),
    styleElement = doc.createElement('style');
  styleElement.textContent = styleContent;
  // the style will only be parsed once it is added to a document
  doc.body.appendChild(styleElement);

  return styleElement.sheet;
}

module.exports = parseCss;
