'use strict';
const EYES_NAME_SPACE = '__EYES__APPLITOOLS__';

function pullify(script, win = window) {
  return function() {
    const scriptName = script.name;
    if (!win[EYES_NAME_SPACE]) {
      win[EYES_NAME_SPACE] = {};
    }
    if (!win[EYES_NAME_SPACE][scriptName]) {
      win[EYES_NAME_SPACE][scriptName] = {
        status: 'WIP',
        value: null,
        error: null,
      };
      script
        .apply(null, arguments)
        .then(r => ((resultObject.status = 'SUCCESS'), (resultObject.value = r)))
        .catch(e => ((resultObject.status = 'ERROR'), (resultObject.error = e.message)));
    }

    const resultObject = win[EYES_NAME_SPACE][scriptName];
    if (resultObject.status === 'SUCCESS') {
      win[EYES_NAME_SPACE][scriptName] = null;
    }

    return JSON.stringify(resultObject);
  };
}

module.exports = pullify;
