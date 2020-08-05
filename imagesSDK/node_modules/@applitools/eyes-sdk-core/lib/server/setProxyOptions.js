'use strict'

const tunnel = require('tunnel')

function setProxyOptions({options, proxy, logger}) {
  if (!proxy.getIsHttpOnly()) {
    options.proxy = proxy.toProxyObject()
    logger.log('using proxy', options.proxy.host, options.proxy.port)
    return
  }

  if (tunnel.httpsOverHttp === undefined) {
    throw new Error('http only proxy is not supported in the browser')
  }

  const proxyObject = proxy.toProxyObject()
  const proxyAuth =
    proxyObject.auth && proxyObject.auth.username
      ? `${proxyObject.auth.username}:${proxyObject.auth.password}`
      : undefined
  const agent = tunnel.httpsOverHttp({
    proxy: {
      host: proxyObject.host,
      port: proxyObject.port || 8080,
      proxyAuth,
    },
  })
  options.httpsAgent = agent
  options.proxy = false // don't use the proxy, we use tunnel.

  logger.log('proxy is set as http only, using tunnel', proxyObject.host, proxyObject.port)
}

exports.setProxyOptions = setProxyOptions
