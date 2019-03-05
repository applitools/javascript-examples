'use strict';
const makeWaitForTestEnd = require('./makeWaitForTestEnd');
const {presult} = require('@applitools/functional-commons');

function makeClose({
  getCheckWindowPromises,
  wrappers,
  openEyesPromises,
  resolveTests,
  getError,
  isAborted,
  logger,
}) {
  const waitAndResolveTests = makeWaitForTestEnd({
    getCheckWindowPromises,
    openEyesPromises,
  });

  return async (throwEx = true) => {
    const rejectOrResolve = (throwEx ? Promise.reject : Promise.resolve).bind(Promise);

    if (wrappers.every((_w, i) => getError(i)) || isAborted()) {
      logger.log('closeEyes() aborting when started');
      const result = isAborted() ? [] : wrappers.map((_w, i) => getError(i));
      return rejectOrResolve(result);
    }

    let error, didError;
    return waitAndResolveTests(async testIndex => {
      if ((error = getError(testIndex))) {
        logger.log('closeEyes() aborting after checkWindow');
        resolveTests[testIndex]();
        return (didError = true), error;
      }

      const [closeError, closeResult] = await presult(wrappers[testIndex].close(throwEx));
      resolveTests[testIndex]();
      return closeError ? ((didError = true), closeError) : closeResult;
    }).then(results => (didError ? rejectOrResolve(results) : results));
  };
}

module.exports = makeClose;
