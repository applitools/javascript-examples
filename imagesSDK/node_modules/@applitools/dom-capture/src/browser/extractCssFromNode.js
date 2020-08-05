'use strict';

const getHrefAttr = require('./getHrefAttr');
const isLinkToStyleSheet = require('./isLinkToStyleSheet');
const isDataUrl = require('./isDataUrl');

function makeExtractCssFromNode({getCssFromCache, absolutizeUrl}) {
  return function extractCssFromNode(node, baseUrl) {
    let cssText, styleBaseUrl, isUnfetched;
    if (isStyleElement(node)) {
      cssText = Array.from(node.childNodes)
        .map(node => node.nodeValue)
        .join('');
      styleBaseUrl = baseUrl;
    } else if (isLinkToStyleSheet(node)) {
      const href = getHrefAttr(node);
      if (!isDataUrl(href)) {
        styleBaseUrl = absolutizeUrl(href, baseUrl);
        cssText = getCssFromCache(styleBaseUrl);
      } else {
        styleBaseUrl = baseUrl;
        cssText = href.match(/,(.+)/)[1];
      }
      isUnfetched = cssText === undefined;
    }
    return {cssText, styleBaseUrl, isUnfetched};
  };
}

function isStyleElement(node) {
  return node.nodeName && node.nodeName.toUpperCase() === 'STYLE';
}

module.exports = makeExtractCssFromNode;
