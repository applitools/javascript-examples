'use strict';
const flat = require('./flat');
const toUnAnchoredUri = require('./toUnAnchoredUri');

function makeFindStyleSheetByUrl({styleSheetCache}) {
  return function findStyleSheetByUrl(url, documents) {
    const allStylesheets = flat(documents.map(d => Array.from(d.styleSheets)));
    return (
      styleSheetCache[url] ||
      allStylesheets.find(styleSheet => styleSheet.href && toUnAnchoredUri(styleSheet.href) === url)
    );
  };
}

module.exports = makeFindStyleSheetByUrl;
