'use strict';

const makeGetScript = require('./src/getScript');
const makeExtractResourcesFromSvg = require('./src/browser/makeExtractResourcesFromSvg');
const toUriEncoding = require('./src/browser/toUriEncoding');
const toUnAnchoredUri = require('./src/browser/toUnAnchoredUri');
const getProcessPage = makeGetScript('processPage');
const getProcessPageAndSerialize = makeGetScript('processPageAndSerialize');
const getProcessPageAndSerializePoll = makeGetScript('processPageAndSerializePoll');
const getProcessPageAndSerializeForIE = makeGetScript('processPageAndSerializeForIE');
const getProcessPageAndSerializePollForIE = makeGetScript('processPageAndSerializePollForIE');

module.exports = {
  getProcessPage,
  getProcessPageAndSerialize,
  getProcessPageAndSerializeForIE,
  getProcessPageAndSerializePoll,
  getProcessPageAndSerializePollForIE,
  makeExtractResourcesFromSvg,
  toUriEncoding,
  toUnAnchoredUri,
};
