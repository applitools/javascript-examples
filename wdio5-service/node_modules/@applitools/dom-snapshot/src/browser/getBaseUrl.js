'use strict';

const getBaesUrl = function(doc) {
  const baseUrl = doc.querySelectorAll('base')[0] && doc.querySelectorAll('base')[0].href;
  if (baseUrl && isUrl(baseUrl)) {
    return baseUrl;
  }
};

function isUrl(url) {
  return url && !/^(about:blank|javascript:void|blob:)/.test(url);
}

module.exports = getBaesUrl;
