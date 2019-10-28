'use strict';
const {BatchInfo} = require('@applitools/eyes-sdk-core');

function getBatch({batchSequenceName, batchName, batchId}) {
  const batchInfo = new BatchInfo({name: batchName, id: batchId, sequenceName: batchSequenceName});

  return {
    batchSequenceName: batchInfo.getSequenceName(),
    batchName: batchInfo.getName(),
    batchId: batchInfo.getId(),
  };
}

module.exports = getBatch;
