/* eslint-disable no-console */

'use strict'

const {exec} = require('child_process')
const {promisify: p} = require('util')
const {ServerConnector} = require('../../index')
const {ConfigUtils, Configuration} = require('../../index')

const configuration = new Configuration(this.userConfig)

const Utils = {
  userConfig: ConfigUtils.getConfig({configParams: ['apiKey', 'serverUrl', 'proxy']}),
  pexec: p(exec),
  presult: promise =>
    promise.then(
      v => [undefined, v],
      err => [err],
    ),
  configuration,
  apiKey: configuration.getApiKey(),
  curlGet: async url => {
    const {stdout} = await Utils.pexec(`curl -s ${url}`, {maxBuffer: 10000000})
    return stdout
  },
  getServer: (() => {
    let server
    return () => {
      if (!server) {
        server = new ServerConnector({verbose: () => {}, log: () => {}}, configuration)
      }
      return server
    }
  })(),
  ptimeoutWithError: async (promiseOrPromiseFunc, timeout, err) => {
    let promiseResolved = false
    const hasAborted = () => promiseResolved

    const promise = promiseOrPromiseFunc.then
      ? promiseOrPromiseFunc
      : promiseOrPromiseFunc(hasAborted)

    let cancel
    const v = await Promise.race([
      promise.then(
        v => ((promiseResolved = true), cancel && clearTimeout(cancel), v),
        err => ((promiseResolved = true), cancel && clearTimeout(cancel), Promise.reject(err)),
      ),
      new Promise(
        res =>
          (cancel = setTimeout(() => {
            if (promiseResolved) res(undefined)
            else {
              cancel = undefined
              promiseResolved = true
              res(Promise.reject(err))
            }
          }, timeout)),
      ),
    ])
    return v
  },
}

module.exports = Utils
