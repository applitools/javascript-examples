'use strict';

function makeGetResourceUrlsAndBlobs({processResource, aggregateResourceUrlsAndBlobs}) {
  return function getResourceUrlsAndBlobs(documents, baseUrl, urls) {
    return Promise.all(
      urls.map(url => processResource(url, documents, baseUrl, getResourceUrlsAndBlobs)),
    ).then(resourceUrlsAndBlobsArr => aggregateResourceUrlsAndBlobs(resourceUrlsAndBlobsArr));
  };
}

module.exports = makeGetResourceUrlsAndBlobs;
