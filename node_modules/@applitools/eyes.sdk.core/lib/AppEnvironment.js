'use strict';

const { GeneralUtils } = require('./utils/GeneralUtils');

/**
 * The environment in which the application under test is executing.
 */
class AppEnvironment {
  /**
   * Creates a new AppEnvironment instance.
   *
   * @param {string} [os]
   * @param {string} [hostingApp]
   * @param {RectangleSize} [displaySize]
   */
  constructor(os, hostingApp, displaySize) {
    this._inferred = undefined;
    this._os = os;
    this._hostingApp = hostingApp;
    this._displaySize = displaySize;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * Creates a new AppEnvironment instance.
   *
   * @param {string} inferred
   * @return {AppEnvironment}
   */
  static fromInferred(inferred) {
    const env = new AppEnvironment();
    env.setInferred(inferred);
    return env;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * Gets the information inferred from the execution environment or {@code null} if no information could be inferred.
   *
   * @return {string}
   */
  geInferred() {
    return this._inferred;
  }

  /**
   * Sets the inferred environment information.
   *
   * @param {string} value
   */
  setInferred(value) {
    this._inferred = value;
  }

  /**
   * Gets the OS hosting the application under test or {@code null} if unknown.
   *
   * @return {string}
   */
  getOs() {
    return this._os;
  }

  /**
   * Sets the OS hosting the application under test or {@code null} if unknown.
   *
   * @param {string} value
   */
  setOs(value) {
    this._os = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * Gets the application hosting the application under test or {@code null} if unknown.
   *
   * @return {string}
   */
  getHostingApp() {
    return this._hostingApp;
  }

  /**
   * Sets the application hosting the application under test or {@code null} if unknown.
   *
   * @param {string} value
   */
  setHostingApp(value) {
    this._hostingApp = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * Gets the display size of the application or {@code null} if unknown.
   *
   * @return {RectangleSize}
   */
  getDisplaySize() {
    return this._displaySize;
  }

  /**
   * Sets the display size of the application or {@code null} if unknown.
   *
   * @param {RectangleSize} value
   */
  setDisplaySize(value) {
    this._displaySize = value;
  }

  /** @override */
  toJSON() {
    return GeneralUtils.toPlain(this);
  }

  /** @override */
  toString() {
    return `AppEnvironment { ${JSON.stringify(this)} }`;
  }
}

exports.AppEnvironment = AppEnvironment;
