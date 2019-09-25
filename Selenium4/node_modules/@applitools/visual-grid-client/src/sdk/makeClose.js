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
      if (!closeError) {
        const renderIds = testController.getRenderIds(testIndex);
        const steps = closeResult.getStepsInfo();
        for (const [i, renderId] of renderIds.entries()) {
          steps[i].setRenderId(renderId);
        }
        return closeResult;
      } else {
        didError = true;
        return closeError;
      }
    }).then(async results => {
      const cloesBatches = Promise.all(wrappers.map(w => w.closeBatch()));
      const [err] = await presult(cloesBatches);
      err && logger.log('failed to close batches', err);
      return didError ? settleError(results) : results;
    });
  };
}

module.exports = makeClose;
