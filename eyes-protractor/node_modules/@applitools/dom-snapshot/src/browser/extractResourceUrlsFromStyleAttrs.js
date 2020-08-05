'use strict';
const getUrlFromCssText = require('./getUrlFromCssText');

function extractResourceUrlsFromStyleAttrs(cdt) {
  return cdt.reduce((acc, node) => {
    if (node.nodeType === 1) {
      const styleAttr =
        node.attributes && node.attributes.find(attr => attr.name.toUpperCase() === 'STYLE');

      if (styleAttr) acc = acc.concat(getUrlFromCssText(styleAttr.value));
    }
    return acc;
  }, []);
}

module.exports = extractResourceUrlsFromStyleAttrs;
