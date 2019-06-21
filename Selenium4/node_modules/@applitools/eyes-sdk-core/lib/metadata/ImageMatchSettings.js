'use strict';

const { GeneralUtils, Region, FloatingMatchSettings } = require('@applitools/eyes-common');

class ImageMatchSettings {
  // noinspection FunctionWithMoreThanThreeNegationsJS
  /**
   * @param {MatchLevel|string} matchLevel
   * @param {number} ignoreCaret
   * @param {Region[]|object[]} ignore
   * @param {Region[]|object[]} strict
   * @param {Region[]|object[]} content
   * @param {Region[]|object[]} layout
   * @param {FloatingMatchSettings[]|object[]} floating
   *
   * @param {number} splitTopHeight
   * @param {number} splitBottomHeight
   * @param {number} scale
   * @param {number} remainder
   */
  constructor({ matchLevel, ignore, strict, content, layout, floating, splitTopHeight, splitBottomHeight, ignoreCaret,
    scale, remainder } = {}) {
    if (ignore && ignore.length > 0 && !(ignore[0] instanceof Region)) {
      ignore = ignore.map(region => new Region(region));
    }

    if (strict && strict.length > 0 && !(strict[0] instanceof Region)) {
      strict = strict.map(region => new Region(region));
    }

    if (content && content.length > 0 && !(content[0] instanceof Region)) {
      content = content.map(region => new Region(region));
    }

    if (layout && layout.length > 0 && !(layout[0] instanceof Region)) {
      layout = layout.map(region => new Region(region));
    }

    if (floating && floating.length > 0 && !(floating[0] instanceof FloatingMatchSettings)) {
      floating = floating.map(region => new FloatingMatchSettings(region));
    }

    this._matchLevel = matchLevel;
    this._ignore = ignore;
    this._strict = strict;
    this._content = content;
    this._layout = layout;
    this._floating = floating;
    this._splitTopHeight = splitTopHeight;
    this._splitBottomHeight = splitBottomHeight;
    this._ignoreCaret = ignoreCaret;
    this._scale = scale;
    this._remainder = remainder;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {MatchLevel}
   */
  getMatchLevel() {
    return this._matchLevel;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {MatchLevel} value
   */
  setMatchLevel(value) {
    this._matchLevel = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {Region[]}
   */
  getIgnore() {
    return this._ignore;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {Region[]} value
   */
  setIgnore(value) {
    this._ignore = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {Region[]}
   */
  getStrict() {
    return this._strict;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {Region[]} value
   */
  setStrict(value) {
    this._strict = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {Region[]}
   */
  getContent() {
    return this._content;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {Region[]} value
   */
  setContent(value) {
    this._content = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {Region[]}
   */
  getLayout() {
    return this._layout;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {Region[]} value
   */
  setLayout(value) {
    this._layout = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {FloatingMatchSettings[]}
   */
  getFloating() {
    return this._floating;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {FloatingMatchSettings[]} value
   */
  setFloating(value) {
    this._floating = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {number}
   */
  getSplitTopHeight() {
    return this._splitTopHeight;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {number} value
   */
  setSplitTopHeight(value) {
    this._splitTopHeight = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {number}
   */
  getSplitBottomHeight() {
    return this._splitBottomHeight;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {number} value
   */
  setSplitBottomHeight(value) {
    this._splitBottomHeight = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {boolean}
   */
  getIgnoreCaret() {
    return this._ignoreCaret;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {boolean} value
   */
  setIgnoreCaret(value) {
    this._ignoreCaret = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {number}
   */
  getScale() {
    return this._scale;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {number} value
   */
  setScale(value) {
    this._scale = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @return {number}
   */
  getRemainder() {
    return this._remainder;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * @param {number} value
   */
  setRemainder(value) {
    this._remainder = value;
  }

  /**
   * @override
   */
  toJSON() {
    return GeneralUtils.toPlain(this);
  }

  /**
   * @override
   */
  toString() {
    return `ImageMatchSettings { ${JSON.stringify(this)} }`;
  }
}

exports.ImageMatchSettings = ImageMatchSettings;
