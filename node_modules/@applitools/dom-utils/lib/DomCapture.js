'use strict';

const axios = require('axios');
const { URL } = require('url');

const { ArgumentGuard, Location, GeneralUtils, PerformanceUtils } = require('@applitools/eyes-common');
const { getCaptureDomScript } = require('@applitools/dom-capture');

class DomCapture {

  /**
   * @param {Logger} logger
   * @param {EyesWebDriver|WebDriver} driver
   */
  constructor(logger, driver) {
    this._logger = logger;
    this._driver = driver;
  }

  /**
   * @param {Logger} logger A Logger instance.
   * @param {EyesWebDriver|WebDriver} driver
   * @param {PositionProvider} [positionProvider]
   * @param {string} [returnType]
   * @return {Promise<string|object>}
   */
  static async getFullWindowDom(logger, driver, positionProvider, returnType = 'string') {
    ArgumentGuard.notNull(logger, 'logger');
    ArgumentGuard.notNull(driver, 'driver');

    let originalPosition;
    if (positionProvider) {
      originalPosition = await positionProvider.getState();
      await positionProvider.setPosition(Location.ZERO);
    }

    const domCapture = new DomCapture(logger, driver);
    const dom = await domCapture.getWindowDom();

    if (positionProvider) {
      await positionProvider.restoreState(originalPosition);
    }

    return returnType === 'object' ? dom : JSON.stringify(dom);
  }

  /**
   * @return {Promise<object>}
   */
  async getWindowDom() {
    const captureDomScript = await getCaptureDomScript();

    let asyncCaptureDomScript =
      `var callback = arguments[arguments.length - 1];
      (${captureDomScript})().then(res => {
        return callback(res)
      })`;
    const url = await this.driver.getCurrentUrl();

    let domSnapshot = await this.getFrameDom(asyncCaptureDomScript, url);

    return JSON.parse(domSnapshot);
  }

  async getFrameDom(script, url) {
    let domSnapshot = await this.driver.executeAsyncScript(script);

    const cssIndex = domSnapshot.indexOf('#####');
    const iframeIndex = domSnapshot.indexOf('@@@@@');
    const separatorIndex = domSnapshot.indexOf('-----');

    let cssArr = [];
    if (cssIndex !== -1 && cssIndex < separatorIndex) {
      const cssSeparatorIndex = iframeIndex !== -1 && separatorIndex !== -1 ? Math.min(iframeIndex, separatorIndex) : Math.max(iframeIndex, separatorIndex);
      const cssText = domSnapshot.substring(cssIndex + 6, cssSeparatorIndex);
      cssArr = cssText.split('\n');
    }

    const cssPromises = [];
    for (const cssHref of cssArr) {
      if (!cssHref) {
        continue;
      }
      cssPromises.push(this._downloadCss(url, cssHref));
    }

    const cssResArr = await Promise.all(cssPromises);
    
    for (const cssRes of cssResArr) {
      domSnapshot = domSnapshot.replace(`#####${cssRes.href}#####`, cssRes.css);
    }

    let iframeArr = [];
    if (iframeIndex !== -1 && iframeIndex < separatorIndex) {
      const iframesText = domSnapshot.substring(iframeIndex + 6, separatorIndex);
      iframeArr = iframesText.split('\n');
    }

    if (cssIndex < separatorIndex && iframeIndex < separatorIndex && (cssIndex !== -1 || iframeIndex !== -1) && separatorIndex !== -1) {
      domSnapshot = domSnapshot.substring(separatorIndex + 6);
    }

    for (const iframeXpath of iframeArr) {
      if (!iframeXpath) {
        continue;
      }
      await this._switchToFrame(iframeXpath);
      let domIFrame;
      try {
        domIFrame = await this.getFrameDom(script, url);
      } catch (ignored) {
        domIFrame = {};
      }
      await this._driver.switchTo().parentFrame();
      domSnapshot = domSnapshot.replace(`"@@@@@${iframeXpath}@@@@@"`, domIFrame);
    }

    return domSnapshot;
  }

  /**
   * @param {string|string[]} xpaths
   * @return {Promise<void>}
   * @private
   */
  async _switchToFrame(xpaths) {
    if (!Array.isArray(xpaths)) {
      xpaths = xpaths.split(',');
    }

    const iframeEl = await this.driver.findElementByXPath(`/${xpaths[0]}`);
    await this._driver.switchTo().frame(iframeEl);

    if (xpaths.length > 1) {
      await this._switchToFrame(xpaths.shift());
    }
  }

  /**
   * @param {string} baseUri
   * @param {string} href
   * @param {number} [retriesCount=1]
   * @return {Promise<{href: string, css: string}>}
   * @private
   */
  async _downloadCss(baseUri, href, retriesCount = 1) {
    try {
      this._logger.verbose(`Given URL to download: ${href}`);
      if (!GeneralUtils.isAbsoluteUrl(href)) {
        href = new URL(href.toString(), baseUri).href;
      }

      const timeStart = PerformanceUtils.start();
      const response = await axios(href);
      const css = response.data;
      this._logger.verbose(`downloading CSS in length of ${css.length} chars took ${timeStart.end().summary}`);
      return {'href': href, 'css': css};
    } catch (ex) {
      this._logger.verbose(ex.toString());
      retriesCount -= 1;
      if (retriesCount > 0) {
        return this._downloadCss(baseUri, href, retriesCount);
      }
      return {'href': href, 'css': ''};
    }
  }

  get driver() {
    return this._driver;
  }
}

exports.DomCapture = DomCapture;
