'use strict'

const {takeDomSnapshot} = require('@applitools/visual-grid-client')
const {
  ArgumentGuard,
  TypeUtils,
  EyesError,
  UserAgent,
  BrowserType,
} = require('@applitools/eyes-common')
const {
  CorsIframeHandle,
  CorsIframeHandler,
  IgnoreRegionByRectangle,
} = require('@applitools/eyes-sdk-core')

const {TestResultsSummary} = require('./runner/TestResultsSummary')
const {VisualGridRunner} = require('./runner/VisualGridRunner')
const {Eyes} = require('./Eyes')

const VERSION = require('../package.json').version

/**
 * @ignore
 */
class EyesVisualGrid extends Eyes {
  /** @var {Logger} EyesVisualGrid#_logger */
  /** @var {Configuration} EyesVisualGrid#_configuration */

  /**
   * Creates a new (possibly disabled) Eyes instance that interacts with the Eyes Server at the specified url.
   *
   * @param {string} [serverUrl] - The Eyes server URL.
   * @param {boolean} [isDisabled=false] - Set {@code true} to disable Applitools Eyes and use the WebDriver directly.
   * @param {VisualGridRunner} [runner] - Set shared VisualGridRunner if you want to group results.
   */
  constructor(serverUrl, isDisabled, runner = new VisualGridRunner()) {
    super(serverUrl, isDisabled, runner)

    this._isVisualGrid = true
    /** @type {UserAgent} */
    this._userAgent = undefined

    /** @function */ this._checkWindowCommand = undefined
    /** @function */ this._closeCommand = undefined
    /** @function */ this._abortCommand = undefined
    /** @type {Promise} */ this._closePromise = undefined
  }

  // noinspection JSMethodCanBeStatic
  /**
   * @override
   * @protected
   * @return {string} - The base agent id of the SDK.
   */
  getBaseAgentId() {
    return `eyes.selenium.visualgrid.javascript/${VERSION}`
  }

  /**
   * @inheritDoc
   */
  async open(driver, appName, testName, viewportSize, sessionType) {
    ArgumentGuard.notNull(driver, 'driver')

    if (appName) this._configuration.setAppName(appName)
    if (testName) this._configuration.setTestName(testName)
    if (viewportSize) this._configuration.setViewportSize(viewportSize)
    if (sessionType) this._configuration.setSessionType(sessionType)

    if (this._runner.getConcurrentSessions()) {
      this._configuration.setConcurrentSessions(this._runner.getConcurrentSessions())
    }

    await this._initDriver(driver)

    const uaString = await this._driver.getUserAgent()
    if (uaString) {
      this._userAgent = UserAgent.parseUserAgentString(uaString, true)
    }

    this._runner.initializeVgClient(this._getVgClientParameters())

    if (this._configuration.getViewportSize()) {
      await this.setViewportSize(this._configuration.getViewportSize())

      const browserInfo = this._configuration.getBrowsersInfo()
      if (!browserInfo || (Array.isArray(browserInfo) && browserInfo.length === 0)) {
        this._configuration.addBrowser(
          this._configuration.getViewportSize().getWidth(),
          this._configuration.getViewportSize().getHeight(),
          BrowserType.CHROME,
        )
      }
    }

    const {checkWindow, close, abort} = await this._runner.vgClient.openEyes(
      this._configuration.toOpenEyesConfiguration(),
    )

    this._isOpen = true
    this._checkWindowCommand = checkWindow
    this._closeCommand = async () =>
      close(true).catch(err => {
        if (Array.isArray(err)) {
          return err
        }

        throw err
      })
    this._abortCommand = async () => abort(true)

    return this._driver
  }

  /**
   * @package
   * @param {boolean} [throwEx=true]
   * @return {Promise<TestResultsSummary>}
   */
  async closeAndReturnResults(throwEx = true) {
    try {
      const resultsPromise = this._closePromise || this._closeCommand()
      const res = await resultsPromise
      const testResultsSummary = new TestResultsSummary(res)

      if (throwEx === true) {
        for (const result of testResultsSummary.getAllResults()) {
          if (result.getException()) {
            throw result.getException()
          }
        }
      }

      return testResultsSummary
    } finally {
      this._isOpen = false
      this._closePromise = undefined
    }
  }

  /**
   * @return {Promise}
   */
  async closeAsync() {
    if (!this._closePromise) {
      this._closePromise = this._closeCommand()
    }
  }

  /**
   * @param {boolean} [throwEx]
   * @return {Promise<TestResults>}
   */
  async close(throwEx = true) {
    const results = await this.closeAndReturnResults(throwEx)

    for (const result of results.getAllResults()) {
      if (result.getException()) {
        return result.getTestResults()
      }
    }

    return results.getAllResults()[0].getTestResults()
  }

  // noinspection JSMethodCanBeStatic
  /**
   * @return {Promise<?TestResults>}
   */
  async abort() {
    if (typeof this._abortCommand === 'function') {
      if (this._closePromise) {
        this._logger.verbose('Can not abort while closing async, abort added to close promise.')
        return this._closePromise.then(() => this._abortCommand(true))
      }

      return this._abortCommand()
    }
    return null
  }

  /**
   * @return {Promise}
   */
  async abortAsync() {
    this._closePromise = this.abort()
  }

  /**
   * @inheritDoc
   */
  async check(name, checkSettings) {
    ArgumentGuard.notNull(checkSettings, 'checkSettings')

    if (TypeUtils.isNotNull(name)) {
      checkSettings.withName(name)
    }

    // check if we need a region of screenshot, add custom tag if by selector (SHOULD BE BEFORE CAPTURING DOM)
    let targetSelector = await checkSettings.getTargetProvider()
    if (targetSelector) {
      targetSelector = await targetSelector.getSelector(this)
    }

    // prepare regions, add custom tag if by selector (SHOULD BE BEFORE CAPTURING DOM)
    const ignoreRegions = await this._prepareRegions(checkSettings.getIgnoreRegions())

    try {
      this._logger.verbose(`Dom extraction starting   (${checkSettings.toString()})   $$$$$$$$$$$$`)

      const pageDomResults = await takeDomSnapshot({
        executeScript: this._driver.executeScript.bind(this._driver),
        browser: this._userAgent.getBrowser(),
      })

      const {cdt, url: pageUrl, resourceContents, resourceUrls, frames} = pageDomResults

      if (this.getCorsIframeHandle() === CorsIframeHandle.BLANK) {
        CorsIframeHandler.blankCorsIframeSrcOfCdt(cdt, frames)
      }

      this._logger.verbose(`Dom extracted  (${checkSettings.toString()})   $$$$$$$$$$$$`)

      const source = await this._driver.getCurrentUrl()

      await this._checkWindowCommand({
        resourceUrls,
        resourceContents,
        frames,
        url: pageUrl,
        cdt,
        tag: checkSettings.getName(),
        sizeMode:
          checkSettings.getSizeMode() === 'viewport' && this.getForceFullPageScreenshot()
            ? 'full-page'
            : checkSettings.getSizeMode(),
        selector: targetSelector,
        region: checkSettings.getTargetRegion(),
        scriptHooks: checkSettings.getScriptHooks(),
        ignore: ignoreRegions,
        floating: checkSettings.getFloatingRegions(),
        sendDom: checkSettings.getSendDom() ? checkSettings.getSendDom() : this.getSendDom(),
        matchLevel: checkSettings.getMatchLevel()
          ? checkSettings.getMatchLevel()
          : this.getMatchLevel(),
        source,
      })
    } catch (e) {
      throw new EyesError(`Failed to extract DOM from the page: ${e.toString()}`, e)
    }
  }

  /**
   * @private
   * @param {GetRegion[]} regions
   * @return {{type: string, url: string, value: Buffer}[]}
   */
  async _prepareRegions(regions) {
    if (regions && regions.length > 0) {
      const newRegions = []

      for (const region of regions) {
        if (region instanceof IgnoreRegionByRectangle) {
          const plainRegions = await region.getRegion(this, undefined)
          plainRegions.forEach(plainRegion => {
            newRegions.push(plainRegion.toJSON())
          })
        } else {
          const selector = await region.getSelector(this)
          newRegions.push({selector})
        }
      }

      return newRegions
    }

    return regions
  }

  _getVgClientParameters() {
    return {
      logger: this._logger,
      agentId: this.getFullAgentId(),
      apiKey: this._configuration.getApiKey(),
      showLogs: this._configuration.getShowLogs(),
      saveDebugData: this._configuration.getSaveDebugData(),
      proxy: this._configuration.getProxy(),
      serverUrl: this._configuration.getServerUrl(),
      concurrency: this._configuration.getConcurrentSessions(),
    }
  }
}

exports.EyesVisualGrid = EyesVisualGrid
