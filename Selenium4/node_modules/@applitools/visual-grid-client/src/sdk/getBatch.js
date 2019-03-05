'use strict';
const {BatchInfo} = require('@applitools/eyes-sdk-core');

function getBatch({batchName, batchId}) {
  const batchInfo = new BatchInfo({name: batchName, id: batchId});

  return {
    batchName: batchInfo.getName(),
    batchId: batchInfo.getId(),
  };
}

module.exports = getBatch;
