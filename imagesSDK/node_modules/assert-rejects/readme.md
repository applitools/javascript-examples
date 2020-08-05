# Assert Rejects

Assert that a promise eventually rejects

## Installation

```sh
npm install --save assert-rejects
```

## Usage

```js
const assertRejects = require('assert-rejects')

describe('Something', () => {
  it('rejects', () => {
    const promise = doSomethingThatShouldReject()

    return assertRejects(promise)
  })

  it('rejects with specific code', () => {
    const promise = readFileThatDoesntExists()

    return assertRejects(promise, err => err.code === 'ENOENT')
  })
})
```

## API

### `assertRejects(promise[, error][, message])`

Expects the `promise` to reject. Returns a new promise that will resolve once the provided promise is resolved.

If specified, `error` can be a constructor, [RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions), or validation function.

If specified, `message` will be the message provided by the `AssertionError` if the promise fails to reject.

Validate instanceof using constructor:

```js
assertRejects(
  Promise.reject(new Error('Wrong value')),
  Error
)
```

Validate error message using [RegExp](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions):

```js
assertRejects(
  Promise.reject(new Error('Wrong value')),
  /value/
)
```

Custom error validation:

```js
assertRejects(
  Promise.reject(new Error('Wrong value')),
  (err) => ((err instanceof Error) && /value/.test(err)),
  'unexpected rejection'
)
```

Note that `error` can not be a string. If a string is provided as the second argument, then `error` is assumed to be omitted and the string will be used for `message` instead. This can lead to easy-to-miss mistakes:

```js
// THIS IS A MISTAKE! DO NOT DO THIS!
assertRejects(myPromise, 'missing foo', 'did not reject with expected message')

// Do this instead.
assertRejects(myPromise, /missing foo/, 'did not reject with expected message')
```
