'use strict';
const makeWaitForTestEnd = require('./makeWaitForTestEnd');
const {presult} = require('@applitools/functional-commons');

function makeClose({
  getCheckWindowPromises,
  wrappers,
  openEyesPromises,
  resolveTests,
  testController,
  logger,
}) {
  const waitAndResolveTests = makeWaitForTestEnd({
    getCheckWindowPromises,
    openEyesPromises,
  });

  return async (throwEx = true) => {
    const settleError = (throwEx ? Promise.reject : Promise.resolve).bind(Promise);

    if (testController.getIsAbortedByUser()) {
      logger.log('closeEyes() aborted by user');
      return settleError([]);
    }

    let error, didError;
    return waitAndResolveTests(async testIndex => {
      resolveTests[testIndex]();

      if ((error = testController.getFatalError())) {
        logger.log('closeEyes() fatal error found');
        await wrappers[testIndex].ensureAborted();
        return (didError = true), error;
      }
      if ((error = testController.getError(testIndex))) {
        logger.log('closeEyes() found test error');
        return (didError = true), error;
      }

      const [closeError, closeResult] = await presult(wrappers[testIndex].close(throwEx));
      return closeError ? ((didError = true), closeError) : closeResult;
    }).then(results => (didError ? settleError(results) : results));
  };
}

module.exports = makeClose;
