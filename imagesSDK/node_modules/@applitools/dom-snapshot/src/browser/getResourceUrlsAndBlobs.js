'use strict';

function makeGetResourceUrlsAndBlobs({processResource, aggregateResourceUrlsAndBlobs}) {
  return function getResourceUrlsAndBlobs({documents, urls, forceCreateStyle = false}) {
    return Promise.all(
      urls.map(url => processResource({url, documents, getResourceUrlsAndBlobs, forceCreateStyle})),
    ).then(resourceUrlsAndBlobsArr => aggregateResourceUrlsAndBlobs(resourceUrlsAndBlobsArr));
  };
}

module.exports = makeGetResourceUrlsAndBlobs;
