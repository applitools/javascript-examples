'use strict'

const {AssertionError, deepEqual} = require('assert')
const {remote} = require('webdriverio')
const chromedriver = require('chromedriver')
const geckodriver = require('geckodriver')
const {Configuration, Eyes, NetHelper, StitchMode} = require('../index')
// noinspection JSUnusedLocalSymbols
const {
  BatchInfo,
  ConsoleLogHandler,
  FloatingMatchSettings,
  metadata,
  RectangleSize,
  Region,
  TypeUtils,
  AccessibilityRegionByRectangle,
  AccessibilityLevel
} = require('@applitools/eyes-sdk-core')
const {ActualAppOutput, ImageMatchSettings, SessionResults} = metadata
const url = require('url')

const batchName = TypeUtils.getOrDefault(process.env.APPLITOOLS_BATCH_NAME, 'WebDriverIO Tests')
let batchInfo = new BatchInfo(batchName)

class Common {

  static get CHROME() {
    return {
      capabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
          args: [
            '--disable-infobars',
            'headless'
          ]
        }
      }
    }
  }

  static get FIREFOX() {
    return {
      capabilities: {
        browserName: 'firefox',
        "moz:firefoxOptions": {
          // flag to activate Firefox headless mode (see https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities for more details about moz:firefoxOptions)
          args: ['-headless']
        }
      }
    }
  }

  static get SAFARI() {
    return {
      capabilities: {
        browserName: 'safari',
        version: '11.1'
      }
    }
  }

  static get MOBILE_IOS_SAFARI() {
    return {
      remoteHost: "http://127.0.0.1:4723/wd/hub",
      hostname: "127.0.0.1",
      port: 4723,
      capabilities: {
        browserName: 'Safari',
        deviceOrientation: 'portrait',
        deviceName: 'iPhone 11',
        platformName: 'iOS',
        platformVersion: '13.2',
      }
    }
  }

  static get MOBILE_IOS_NATIVE_APP() {
    return {
      remoteHost: "http://127.0.0.1:4723/wd/hub",
      hostname: "127.0.0.1",
      port: 4723,
      capabilities: {
        app: 'https://store.applitools.com/download/iOS.TestApp.app.zip',
        browserName: '',
        deviceOrientation: 'portrait',
        deviceName: 'iPhone 11',
        platformName: 'iOS',
        platformVersion: '13.2',
      }
    }
  }

  /**
   *
   * @param {Object} options
   */
  constructor({testedPageUrl, browserName, mobileBrowser = false}) {
    this._eyes = null
    this._browser = null
    this._browserName = browserName
    this._testedPageUrl = testedPageUrl
    this._forceFullPageScreenshot = false
    this._seleniumStandAloneMode = Common.getSeleniumStandAloneMode()
    this._mobileBrowser = mobileBrowser
    this._chromeDriverPort
  }

  async beforeTest({batchName: batchName, fps = false, stitchMode = StitchMode.CSS}) {
    this._eyes = new Eyes()
    const configuration = new Configuration()
    configuration.setApiKey(process.env.APPLITOOLS_API_KEY)
    this._eyes.setConfiguration(configuration)

    if (process.env.APPLITOOLS_SHOW_LOGS) {
      this._eyes.setLogHandler(new ConsoleLogHandler(false))
    }

    this._eyes.setForceFullPageScreenshot(fps)
    this._eyes._configuration.setStitchMode(stitchMode)
    this._eyes.setHideScrollbars(true)

    const proxy = TypeUtils.getOrDefault(process.env.APPLITOOLS_PROXY, null)
    if (proxy) {
      this._eyes.setProxy(proxy)
    }

    if (batchName) {
      batchInfo = new BatchInfo(batchName)
    }
    const batchId = process.env.APPLITOOLS_BATCH_ID
    if (batchId != null) {
      batchInfo.setId(batchId)
    }
    this._eyes.setBatch(batchInfo)

    if (!this._seleniumStandAloneMode && !(process.env.SELENIUM_SERVER_URL === 'http://ondemand.saucelabs.com/wd/hub'
      && process.env.SAUCE_USERNAME && process.env.SAUCE_ACCESS_KEY)) {
      if (this._browserName === 'chrome') {
        this._chromeDriverPort = 9515
        const options = [`--port=${this._chromeDriverPort}`, '--url-base=/']
        const returnPromise = true
        await chromedriver.start(options, returnPromise)
        this._eyes._logger.verbose('Chromedriver is started')
      } else if (this._browserName === 'firefox') {
        geckodriver.start()
        await new Promise(res => (setTimeout(res, 2000)))
        this._eyes._logger.verbose('Geckodriver is started')
      }
    }
  }

  async beforeEachTest({
                         appName,
                         testName,
                         browserOptions: browserOptions,
                         rectangleSize = {
                           width: 800,
                           height: 600
                         },
                         testedPageUrl = this._testedPageUrl,
                         platform = Common.getPlatform(browserOptions)
                       }) {

    if (process.env.SELENIUM_SERVER_URL === 'http://ondemand.saucelabs.com/wd/hub'
      && process.env.SAUCE_USERNAME && process.env.SAUCE_ACCESS_KEY) {
      this._eyes._logger.verbose('Sauce is used')

      const seleniumServerUrl = url.parse(process.env.SELENIUM_SERVER_URL)
      browserOptions.host = seleniumServerUrl.hostname
      browserOptions.hostname = seleniumServerUrl.hostname

      browserOptions.port = 80
      browserOptions.path = '/wd/hub'

      browserOptions.capabilities.baseUrl = `http://${process.env.SAUCE_USERNAME}:${process.env.SAUCE_ACCESS_KEY}@ondemand.saucelabs.com:80/wd/hub`
      browserOptions.capabilities.username = process.env.SAUCE_USERNAME
      browserOptions.capabilities.accesskey = process.env.SAUCE_ACCESS_KEY
      browserOptions.capabilities.platform = platform
    } else if (!this._seleniumStandAloneMode) {
      if (browserOptions.capabilities.browserName === 'chrome') {
        browserOptions.port = this._chromeDriverPort
        browserOptions.path = '/'
      } else if (browserOptions.capabilities.browserName === 'firefox') {
        browserOptions.path = '/'
      }
    }

    browserOptions.logLevel = 'error'

    const that = this
    this._browser = await remote(browserOptions)
    const viewportSize = rectangleSize ? new RectangleSize(rectangleSize) : null

    if (that._eyes.getForceFullPageScreenshot()) {
      testName += '_FPS'
    }

    if (that._mobileBrowser) {
      testName += '_Mobile'
    }

    this._browser = await this._eyes.open(this._browser, appName, testName, viewportSize)
    await this._browser.url(testedPageUrl)
    that._expectedFloatingsRegions = null
    that._expectedIgnoreRegions = null
  }

  async afterEachTest() {
    let error
    try {
      const results = await this._eyes.close(true)
      const query = `?format=json&AccessToken=${results.getSecretToken()}&apiKey=${this.eyes.getApiKey()}`
      const apiSessionUrl = results.getApiUrls().getSession() + query

      const apiSessionUri = url.parse(apiSessionUrl)
      // apiSessionUri.searchParams.append('format', 'json')
      // apiSessionUri.searchParams.append('AccessToken', results.getSecretToken())
      // apiSessionUri.searchParams.append('apiKey', this.eyes.getApiKey())

      const res = await NetHelper.get(apiSessionUri)
      const resultObject = JSON.parse(res)
      /** @type {SessionResults} */
      const sessionResults = new SessionResults(resultObject)
      /** @type {ActualAppOutput} */
      const actualAppOutput = new ActualAppOutput(sessionResults.getActualAppOutput()[0])
      /** @type {ImageMatchSettings} */
      const imageMatchSettings = new ImageMatchSettings(actualAppOutput.getImageMatchSettings())

      if (this._expectedFloatingsRegions) {
        const f = imageMatchSettings.getFloating()[0]
        const floating = new FloatingMatchSettings(f.left, f.top, f.width, f.height, f.maxUpOffset, f.maxDownOffset, f.maxLeftOffset, f.maxRightOffset)

        deepEqual(this._expectedFloatingsRegions, floating, 'Floating regions lists differ')
      }

      //if (this._expectedIgnoreRegions) {
      //  // here
      //  const ignoreRegions = new Region(imageMatchSettings.getIgnore())

      //  deepEqual(this._expectedIgnoreRegions, ignoreRegions, 'Ignore regions lists differ')
      //}
    } finally {
      await this._browser.deleteSession()
      await this._eyes.abortIfNotClosed()
    }
  }

  afterTest() {
    if (!this._seleniumStandAloneMode && !(process.env.SELENIUM_SERVER_URL === 'http://ondemand.saucelabs.com/wd/hub'
      && process.env.SAUCE_USERNAME && process.env.SAUCE_ACCESS_KEY)) {
      if (this._browserName === 'chrome') {
        chromedriver.stop()
      } else if (this._browserName === 'firefox') {
        geckodriver.stop()
      }
    }
  }

  get eyes() {
    return this._eyes
  }

  get browser() {
    return this._browser
  }

  /**
   * @param {Region} expectedIgnoreRegions
   */
  setExpectedIgnoreRegions(...expectedIgnoreRegions) {
    this._expectedIgnoreRegions = expectedIgnoreRegions
  }

  /**
   * @param {FloatingMatchSettings} expectedFloatingsRegions
   */
  setExpectedFloatingsRegions(expectedFloatingsRegions) {
    /** @type {FloatingMatchSettings} */
    this._expectedFloatingsRegions = expectedFloatingsRegions
  }


  static getPlatform(browserOptions) {
    let platform
    if (browserOptions && browserOptions.capabilities
      && (browserOptions.capabilities.platform || browserOptions.capabilities.platformName)) {
      if (browserOptions.capabilities.platform) {
        platform = browserOptions.capabilities.platform
      } else {
        platform = browserOptions.capabilities.platformName
      }
    } else {
      platform = process.platform

      switch (process.platform) {
        case 'win32':
          platform = 'Windows'
          break
        case 'linux':
          platform = 'Linux'
          break
        case 'darwin':
          platform = 'macOS'
          break
        default:
      }
    }

    return platform
  }

  static getSeleniumStandAloneMode() {
    return process.env.SELENIUM_STANDALONE_MODE ? eval(process.env.SELENIUM_STANDALONE_MODE) : false
  }
}

module.exports = Common
