'use strict';

const { MatchLevel } = require('./MatchLevel');
const { GeneralUtils } = require('../utils/GeneralUtils');

/**
 * Encapsulates match settings for the a session.
 */
class ImageMatchSettings {
  /**
   * @param {MatchLevel} matchLevel The "strictness" level to use.
   * @param {ExactMatchSettings} [exact] Additional threshold parameters when the {@code Exact} match level is used.
   * @param {boolean} [ignoreCaret]
   */
  constructor(matchLevel = MatchLevel.Strict, exact, ignoreCaret) {
    this._matchLevel = matchLevel;
    this._exact = exact;
    this._ignoreCaret = ignoreCaret;
    /** @type {Region[]} */
    this._ignore = [];
    /** @type {FloatingMatchSettings[]} */
    this._floating = [];
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {MatchLevel} The match level to use.
   */
  getMatchLevel() {
    return this._matchLevel;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {MatchLevel} value The match level to use.
   */
  setMatchLevel(value) {
    this._matchLevel = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {ExactMatchSettings} The additional threshold params when the {@code Exact} match level is used, if any.
   */
  getExact() {
    return this._exact;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {ExactMatchSettings} value The additional threshold parameters when the {@code Exact} match level is used.
   */
  setExact(value) {
    this._exact = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {boolean} The parameters for the "IgnoreCaret" match settings.
   */
  getIgnoreCaret() {
    return this._ignoreCaret;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {boolean} value The parameters for the "ignoreCaret" match settings.
   */
  setIgnoreCaret(value) {
    this._ignoreCaret = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * Returns the array of regions to ignore.
   * @return {Region[]} the array of regions to ignore.
   */
  getIgnoreRegions() {
    return this._ignore;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * Sets an array of regions to ignore.
   * @param {Region[]} value The array of regions to ignore.
   */
  setIgnoreRegions(value) {
    this._ignore = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * Returns an array of floating regions.
   * @return {FloatingMatchSettings[]} an array of floating regions.
   */
  getFloatingRegions() {
    return this._floating;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * Sets an array of floating regions.
   * @param {FloatingMatchSettings[]} value The array of floating regions.
   */
  setFloatingRegions(value) {
    this._floating = value;
  }

  /** @override */
  toJSON() {
    return GeneralUtils.toPlain(this);
  }

  /** @override */
  toString() {
    return `ImageMatchSettings { ${JSON.stringify(this)} }`;
  }
}

exports.ImageMatchSettings = ImageMatchSettings;
