/* eslint-env mocha */

var assert = require('assert')
var assertRejects = require('./')
var AssertionError = require('assert').AssertionError

describe('assertRejects', () => {
  it('any rejection', () => {
    return assertRejects(Promise.reject(new Error('test')))
  })

  it('instanceof rejection', () => {
    return assertRejects(Promise.reject(new Error('test')), Error)
  })

  it('regex rejection', () => {
    return assertRejects(Promise.reject(new Error('test')), /test/)
  })

  it('function rejection', () => {
    return assertRejects(Promise.reject(new Error('test')), () => true)
  })

  it('no rejection', () => {
    return assertRejects(Promise.resolve('test')).then(
      () => {
        throw new Error('Expected rejection')
      },
      (err) => {
        assert.ok(err instanceof AssertionError)
        assert.strictEqual(err.message, 'Missing expected rejection.')
        assert.strictEqual(err.actual, undefined)
        assert.strictEqual(err.expected, undefined)
        assert.strictEqual(err.operator, 'rejects')
      }
    )
  })

  it('no instanceof rejection', () => {
    const expected = Error

    return assertRejects(Promise.resolve('test'), expected).then(
      () => {
        throw new Error('Expected rejection')
      },
      (err) => {
        assert.ok(err instanceof AssertionError)
        assert.strictEqual(err.message, 'Missing expected rejection (Error).')
        assert.strictEqual(err.actual, undefined)
        assert.strictEqual(err.expected, expected)
        assert.strictEqual(err.operator, 'rejects')
      }
    )
  })

  it('no regex rejection', () => {
    const expected = /test/

    return assertRejects(Promise.resolve('test'), expected).then(
      () => {
        throw new Error('Expected rejection')
      },
      (err) => {
        assert.ok(err instanceof AssertionError)
        assert.strictEqual(err.message, 'Missing expected rejection.')
        assert.strictEqual(err.actual, undefined)
        assert.strictEqual(err.expected, expected)
        assert.strictEqual(err.operator, 'rejects')
      }
    )
  })

  it('no function rejection', () => {
    const expected = function () { return true }

    return assertRejects(Promise.resolve('test'), expected).then(
      () => {
        throw new Error('Expected rejection')
      },
      (err) => {
        assert.ok(err instanceof AssertionError)
        assert.strictEqual(err.message, 'Missing expected rejection (expected).')
        assert.strictEqual(err.actual, undefined)
        assert.strictEqual(err.expected, expected)
        assert.strictEqual(err.operator, 'rejects')
      }
    )
  })

  it('no arrow function rejection', () => {
    const expected = () => true

    return assertRejects(Promise.resolve('test'), expected).then(
      () => {
        throw new Error('Expected rejection')
      },
      (err) => {
        assert.ok(err instanceof AssertionError)
        assert.strictEqual(err.message, 'Missing expected rejection (expected).')
        assert.strictEqual(err.actual, undefined)
        assert.strictEqual(err.expected, expected)
        assert.strictEqual(err.operator, 'rejects')
      }
    )
  })

  it('unmatched instanceof rejection', () => {
    const error = new Error('test')

    return assertRejects(Promise.reject(error), SyntaxError).then(
      () => { throw new Error('Expected rejection') },
      (err) => { assert.strictEqual(err, error) }
    )
  })

  it('unmatched regex rejection', () => {
    const error = new Error('test')

    return assertRejects(Promise.reject(error), /random/).then(
      () => { throw new Error('Expected rejection') },
      (err) => { assert.strictEqual(err, error) }
    )
  })

  it('unmatched function rejection', () => {
    const error = new Error('test')

    return assertRejects(Promise.reject(error), () => false).then(
      () => { throw new Error('Expected rejection') },
      (err) => { assert.strictEqual(err, error) }
    )
  })

  it('custom message', () => {
    return assertRejects(Promise.resolve('test'), null, 'Test message.').then(
      () => {
        throw new Error('Expected rejection')
      },
      (err) => {
        assert.ok(err instanceof AssertionError)
        assert.strictEqual(err.message, 'Missing expected rejection: Test message.')
        assert.strictEqual(err.actual, undefined)
        assert.strictEqual(err.expected, null)
        assert.strictEqual(err.operator, 'rejects')
      }
    )
  })
})
