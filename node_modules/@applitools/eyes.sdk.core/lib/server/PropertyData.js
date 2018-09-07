'use strict';

class PropertyData {
  /**
   * @param {string} name
   * @param {string} value
   */
  constructor(name, value) {
    this._name = name;
    this._value = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {string} */
  getName() {
    return this._name;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setName(value) {
    this._name = value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @return {string} */
  getValue() {
    return this._value;
  }

  // noinspection JSUnusedGlobalSymbols
  /** @param {string} value */
  setValue(value) {
    this._value = value;
  }

  /** @override */
  toJSON() {
    return {
      name: this._name,
      value: this._value,
    };
  }

  /** @override */
  toString() {
    return `PropertyData { ${JSON.stringify(this)} }`;
  }
}

exports.PropertyData = PropertyData;
