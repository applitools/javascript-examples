'use strict';

const captureFrame = require('./captureFrame');
const EYES_NAME_SPACE = '__EYES__APPLITOOLS__';

function captureFrameAndPoll(...args) {
  if (!window[EYES_NAME_SPACE]) {
    window[EYES_NAME_SPACE] = {};
  }
  if (!window[EYES_NAME_SPACE].captureDomResult) {
    window[EYES_NAME_SPACE].captureDomResult = {
      status: 'WIP',
      value: null,
      error: null,
    };
    captureFrame(...args)
      .then(r => ((resultObject.status = 'SUCCESS'), (resultObject.value = r)))
      .catch(e => ((resultObject.status = 'ERROR'), (resultObject.error = e.message)));
  }

  const resultObject = window[EYES_NAME_SPACE].captureDomResult;
  if (resultObject.status === 'SUCCESS') {
    window[EYES_NAME_SPACE].captureDomResult = null;
  }

  return JSON.stringify(resultObject);
}

module.exports = captureFrameAndPoll;
