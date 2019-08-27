'use strict';

const {
  DiffsFoundError,
  TestResults,
  TestFailedError,
  TestResultsStatus,
} = require('@applitools/eyes-sdk-core');

const makeVisualGridClient = require('./sdk/renderingGridClient');
const configParams = require('./sdk/configParams');
const takeScreenshot = require('./sdk/takeScreenshot');
const capturePageDom = require('./troubleshoot/capturePageDom');

module.exports = {
  configParams,
  makeVisualGridClient,
  takeScreenshot,
  capturePageDom,
  DiffsFoundError,
  TestResults,
  TestFailedError,
  TestResultsStatus,
};
