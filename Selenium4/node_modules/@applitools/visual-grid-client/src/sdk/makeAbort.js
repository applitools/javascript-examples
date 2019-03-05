'use strict';
const makeWaitForTestEnd = require('./makeWaitForTestEnd');
const {presult} = require('@applitools/functional-commons');

function makeAbort({
  getCheckWindowPromises,
  wrappers,
  openEyesPromises,
  resolveTests,
  setIsAborted,
}) {
  const waitAndResolveTests = makeWaitForTestEnd({
    getCheckWindowPromises,
    openEyesPromises,
  });

  return async () => {
    setIsAborted();
    return waitAndResolveTests(async testIndex => {
      const [closeErr, closeResult] = await presult(wrappers[testIndex].abortIfNotClosed());
      resolveTests[testIndex]();
      if (closeErr) {
        throw closeErr;
      }
      return closeResult;
    });
  };
}

module.exports = makeAbort;
