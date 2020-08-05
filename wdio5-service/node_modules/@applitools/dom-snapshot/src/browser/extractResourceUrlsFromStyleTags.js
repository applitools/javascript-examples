'use strict';
const uniq = require('./uniq');

function makeExtractResourceUrlsFromStyleTags(extractResourcesFromStyleSheet) {
  return function extractResourceUrlsFromStyleTags(doc, onlyDocStylesheet = true) {
    return uniq(
      Array.from(doc.querySelectorAll('style')).reduce((resourceUrls, styleEl) => {
        const styleSheet = onlyDocStylesheet
          ? Array.from(doc.styleSheets).find(styleSheet => styleSheet.ownerNode === styleEl)
          : styleEl.sheet;
        return styleSheet
          ? resourceUrls.concat(extractResourcesFromStyleSheet(styleSheet))
          : resourceUrls;
      }, []),
    );
  };
}

module.exports = makeExtractResourceUrlsFromStyleTags;
