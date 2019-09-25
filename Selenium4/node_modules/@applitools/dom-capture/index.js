'use strict';

const makeGetScript = require('./src/getScript');
const getCaptureDomScript = makeGetScript('captureDom');
const getCaptureDomAndPollScript = makeGetScript('captureDomAndPoll');
const getCaptureDomForIEScript = makeGetScript('captureDomForIE');
const getCaptureDomAndPollForIE = makeGetScript('captureDomAndPollForIE');

module.exports = {
  getCaptureDomScript,
  getCaptureDomAndPollScript,
  getCaptureDomForIEScript,
  getCaptureDomAndPollForIE,
};
