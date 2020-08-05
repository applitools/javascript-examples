/* eslint-disable no-console */

'use strict'

const https = require('https')
const axios = require('axios')
const {ProxySettings, TypeUtils, GeneralUtils} = require('../../index')
const {presult, userConfig, curlGet, getServer, configuration, apiKey} = require('./utils')
const {setProxyOptions} = require('../server/setProxyOptions')
require('@applitools/isomorphic-fetch')

const RENDER_INFO_URL = GeneralUtils.urlConcat(
  configuration.getServerUrl(),
  '/api/sessions/renderinfo',
  `?apiKey=${apiKey}`,
)

const validateRednerInfoResult = res => {
  if (!res || !res.accessToken || !res.resultsUrl) {
    throw new Error(`bad render info result ${JSON.stringify(res)}`)
  }
}

const Eyes = {
  testFetch: () =>
    global
      .fetch(RENDER_INFO_URL)
      .then(r => r.json())
      .then(res => validateRednerInfoResult(res)),
  testCurl: async () => {
    const stdout = await curlGet(RENDER_INFO_URL)
    const result = JSON.parse(stdout)
    validateRednerInfoResult(result)
  },
  testAxios: async () => {
    const options = {
      method: 'GET',
      url: RENDER_INFO_URL,
      proxy: false,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-applitools-eyes-client-request-id': '1--111-222-333-444',
      },
      responseType: 'json',
    }

    const {proxy} = userConfig
    if (proxy) {
      let proxySettings
      if (TypeUtils.isString(proxy)) {
        proxySettings = new ProxySettings(proxy)
      } else {
        proxySettings = new ProxySettings(
          proxy.url,
          proxy.username,
          proxy.password,
          proxy.isHttpOnly,
        )
      }
      setProxyOptions({options, proxy: proxySettings, logger: console})
    }

    const [err, res] = await presult(axios(options))
    if (err) {
      throw err
    }
    validateRednerInfoResult(res.data)
  },
  testServer: async () => {
    const server = getServer()
    const res = await server.renderInfo()
    validateRednerInfoResult(res.toJSON())
  },
  testHttps: async () => {
    let res, rej
    const p = new Promise((_res, _rej) => ((res = _res), (rej = _rej)))
    https
      .get(RENDER_INFO_URL, resp => {
        let data = ''
        resp.on('data', chunk => {
          data += chunk
        })
        resp.on('end', () => {
          try {
            validateRednerInfoResult(JSON.parse(data))
            res()
          } catch (e) {
            rej(e)
          }
        })
      })
      .on('error', rej)
    return p
  },
  url: RENDER_INFO_URL,
}

module.exports = Eyes
