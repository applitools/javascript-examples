const assert = require('assert')
const isRegexp = require('is-regexp')

function expectedException (actual, expected) {
  if (!actual) return false
  if (!expected) return true
  if (isRegexp(expected)) return expected.test(actual)

  try {
    if (actual instanceof expected) return true
  } catch (_) {
    // Ignore. The instanceof check doesn't work for arrow functions.
  }

  if (Error.isPrototypeOf(expected)) return false

  return expected.call({}, actual) === true
}

module.exports = function assertRejects (promise, error, message) {
  if (typeof promise.then !== 'function') {
    throw new TypeError('"promise" argument must be a promise')
  }

  if (typeof error === 'string') {
    message = error
    error = null
  }

  message = (error && error.name ? ' (' + error.name + ')' : '') + (message ? ': ' + message : '.')

  function onFullfilled () {
    throw new assert.AssertionError({
      expected: error,
      message: 'Missing expected rejection' + message,
      operator: 'rejects',
      stackStartFn: assertRejects,
      stackStartFunction: assertRejects
    })
  }

  function onRejected (err) {
    if (!expectedException(err, error)) throw err
  }

  return promise.then(onFullfilled, onRejected)
}
