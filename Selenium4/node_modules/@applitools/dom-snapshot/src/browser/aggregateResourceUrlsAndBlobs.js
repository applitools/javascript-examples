'use strict';
const uniq = require('./uniq');

function aggregateResourceUrlsAndBlobs(resourceUrlsAndBlobsArr) {
  return resourceUrlsAndBlobsArr.reduce(
    ({resourceUrls: allResourceUrls, blobsObj: allBlobsObj}, {resourceUrls, blobsObj}) => ({
      resourceUrls: uniq(allResourceUrls.concat(resourceUrls)),
      blobsObj: Object.assign(allBlobsObj, blobsObj),
    }),
    {resourceUrls: [], blobsObj: {}},
  );
}

module.exports = aggregateResourceUrlsAndBlobs;
