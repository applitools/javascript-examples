'use strict';
const flat = require('./flat');
const toUnAnchoredUri = require('./toUnAnchoredUri');
const sanitizeAuthUrl = require('./sanitizeAuthUrl');

function makeFindStyleSheetByUrl({styleSheetCache}) {
  return function findStyleSheetByUrl(url, documents) {
    const allStylesheets = flat(documents.map(d => Array.from(d.styleSheets)));
    return (
      styleSheetCache[url] ||
      allStylesheets.find(styleSheet => {
        const styleUrl = styleSheet.href && toUnAnchoredUri(styleSheet.href);
        return styleUrl && sanitizeAuthUrl(styleUrl) === url;
      })
    );
  };
}

module.exports = makeFindStyleSheetByUrl;
