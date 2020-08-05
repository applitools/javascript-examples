'use strict'

const chalk = require('chalk')
const _eyes = require('./eyes')
const _vg = require('./vg')
const {userConfig, presult, ptimeoutWithError} = require('./utils')
const TIMEOUT = 15000

function makeCheckNetwork({stream = process.stdout, eyes = _eyes, vg = _vg}) {
  async function doTest(func, name) {
    const delimiterLength = 30 - name.length
    const delimiter = new Array(delimiterLength).join(' ')
    printSuccess(name, delimiter, '[ ?  ]')

    const start = new Date()
    const funcWithTimeout = ptimeoutWithError(func(), TIMEOUT, new Error('request timeout out!'))
    const [err] = await presult(funcWithTimeout)
    const end = parseInt((Date.now() - start) / 1000)

    clearLine()
    if (err) {
      printErr(
        name,
        delimiter,
        `[ X  ]  +${end}`,
        err.message,
        err.message[err.message.length - 1] !== '\n' ? '\n' : '',
      )
    } else {
      printSuccess(name, delimiter, `[ OK ]  +${end}`, '\n')
    }
    return !!err
  }

  function print(...msg) {
    stream.write(chalk.cyan(...msg))
  }

  function printErr(...msg) {
    stream.write(chalk.red(...msg))
  }

  function printSuccess(...msg) {
    stream.write(chalk.green(...msg))
  }

  function clearLine() {
    stream.clearLine()
    stream.cursorTo(0)
  }

  return async function checkNetwork() {
    if (!userConfig.apiKey) {
      printErr(
        'missing "apiKey" add APPLITOOLS_API_KEY as an env variable or add "apiKey" in applitools.config.js\n',
      )
      return
    }
    const proxyEnvMsg = `HTTP_PROXY="${process.env.HTTP_PROXY || ''}" HTTPS_PROXY="${process.env
      .HTTPS_PROXY || ''}".`
    print('Eyes check netwrok running with', JSON.stringify(userConfig), proxyEnvMsg, '\n\n')

    let hasErr = false
    let curlRenderErr = true
    let curlVgErr = true

    print('[1] Checking eyes servers api', eyes.url, '\n')
    curlRenderErr = await doTest(eyes.testCurl, '[eyes] cURL')
    hasErr = curlRenderErr
    hasErr = (await doTest(eyes.testHttps, '[eyes] https')) || hasErr
    hasErr = (await doTest(eyes.testAxios, '[eyes] axios')) || hasErr
    hasErr = (await doTest(eyes.testFetch, '[eyes] node-fetch')) || hasErr
    hasErr = await doTest(eyes.testServer, '[eyes] server connector')

    print('[2] Checking visual grid servers api', vg.url, '\n')
    curlVgErr = await doTest(vg.testCurl, '[VG] cURL')
    hasErr = curlVgErr || hasErr
    hasErr = (await doTest(vg.testHttps, '[VG] https')) || hasErr
    hasErr = (await doTest(vg.testAxios, '[VG] axios')) || hasErr
    hasErr = (await doTest(vg.testFetch, '[VG] node-fetch')) || hasErr
    hasErr = (await doTest(vg.testServer, '[VG] server connector')) || hasErr

    if (hasErr) {
      printErr('\nFAILED!\n')
    } else {
      printSuccess('\nSUCCESS!\n')
    }

    const proxyMsg =
      '\nYOUR PROXY SEEMS TO BE BLOCKING APPLITOOLS REQUESTS, PLEASE MAKE SURE THE FOLLOWING COMMAND SUCCEED'
    if (curlRenderErr) {
      printErr(`${proxyMsg}:\ncurl ${eyes.url}\n`)
    }
    if (curlVgErr) {
      printErr(`${proxyMsg}:\n${await vg.getCurlCmd()}\n`)
    }
  }
}

exports.makeCheckNetwork = makeCheckNetwork
