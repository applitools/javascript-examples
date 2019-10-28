'use strict';

function makeWaitForTestEnd({getCheckWindowPromises, openEyesPromises}) {
  return async function waitForTestEnd(onTestEnd) {
    return Promise.all(
      getCheckWindowPromises().map((checkWindowPromise, i) =>
        checkWindowPromise
          .then(() => openEyesPromises[i]) // the close job must start after openEyes has finished, otherwise resolving the whole test will fail. This situation could happen when a render fails and the checkWindow promise is rejected before waiting on openEyesPromise.
          .then(() => onTestEnd(i)),
      ),
    );
  };
}

module.exports = makeWaitForTestEnd;
