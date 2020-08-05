'use strict'

function makeGetUserAgents(doGetUserAgents) {
  let userAgentsPromise
  return function getUserAgents() {
    if (!userAgentsPromise) {
      userAgentsPromise = doGetUserAgents()
    }
    return userAgentsPromise
  }
}

module.exports = makeGetUserAgents
