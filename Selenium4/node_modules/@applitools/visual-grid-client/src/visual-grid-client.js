'use strict';

const {
  DiffsFoundError,
  TestResults,
  TestFailedError,
  TestResultsStatus,
} = require('@applitools/eyes-sdk-core');

const makeVisualGridClient = require('./sdk/renderingGridClient');
const configParams = require('./sdk/configParams');

module.exports = {
  configParams,
  makeVisualGridClient,
  DiffsFoundError,
  TestResults,
  TestFailedError,
  TestResultsStatus,
};
