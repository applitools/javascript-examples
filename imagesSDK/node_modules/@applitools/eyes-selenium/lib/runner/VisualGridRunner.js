'use strict'

const {EyesRunner} = require('./EyesRunner')
const {TestResultsSummary} = require('./TestResultsSummary')
const {makeVisualGridClient} = require('@applitools/visual-grid-client')

class VisualGridRunner extends EyesRunner {
  /**
   * @param {number} [concurrentSessions]
   */
  constructor(concurrentSessions) {
    super()

    this._concurrentSessions = concurrentSessions
  }

  initializeVgClient({
    logger,
    agentId,
    apiKey,
    showLogs,
    saveDebugData,
    proxy,
    serverUrl,
    concurrency,
  }) {
    if (this.vgClient) {
      logger.verbose('skipping initialization of visual grid client')
    } else {
      this.vgClient = makeVisualGridClient({
        logger,
        agentId,
        apiKey,
        showLogs,
        saveDebugData,
        proxy,
        serverUrl,
        concurrency,
      })
    }
  }

  /**
   * @return {number}
   */
  getConcurrentSessions() {
    return this._concurrentSessions
  }

  /**
   * @param {boolean} [shouldThrowException=true]
   * @return {Promise<TestResultsSummary>}
   */
  async getAllTestResults(shouldThrowException = true) {
    if (this._eyesInstances.length > 0) {
      const resultsPromise = []
      const allResults = []

      for (const eyesInstance of this._eyesInstances) {
        resultsPromise.push(eyesInstance.closeAndReturnResults(false))
      }

      const results = await Promise.all(resultsPromise)
      for (const result of results) {
        allResults.push(...result.getAllResults())
      }

      if (shouldThrowException === true) {
        for (const result of allResults) {
          if (result.getException()) {
            throw result.getException()
          }
        }
      }

      await this._closeAllBatches()
      return new TestResultsSummary(allResults)
    }

    return null
  }
}

exports.VisualGridRunner = VisualGridRunner
