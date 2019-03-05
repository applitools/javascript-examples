'use strict';

const { ArgumentGuard } = require('../utils/ArgumentGuard');

/**
 * @typedef {{x: number, y: number}} LocationObject
 */

/**
 * A location in a two-dimensional plane.
 */
class Location {
  /**
   * Creates a Location instance.
   *
   * @signature `new Location(location)`
   * @signature `new Location(x, y)`
   * @signature `new Location({x: number, y: number})`
   *
   * @param {Location|{x: number, y: number}|number} varArg Location object or the X coordinate of this location.
   * @param {number} [optY] The Y coordinate of this location.
   */
  constructor(varArg, optY) {
    if (arguments.length === 2) {
      return new Location({ x: varArg, y: optY });
    }

    if (varArg instanceof Location) {
      return new Location({ x: varArg.getX(), y: varArg.getY() });
    }

    const { x, y } = varArg;
    ArgumentGuard.isNumber(x, 'x');
    ArgumentGuard.isNumber(y, 'y');

    // TODO: remove call to Math.ceil
    this._x = Math.ceil(x);
    this._y = Math.ceil(y);
  }

  /**
   * @return {number} The X coordinate of this location.
   */
  getX() {
    return this._x;
  }

  /**
   * @return {number} The Y coordinate of this location.
   */
  getY() {
    return this._y;
  }

  /**
   * Indicates whether some other Location is "equal to" this one.
   *
   * @param {object|Location} obj The reference object with which to compare.
   * @return {boolean} {@code true} if this object is the same as the obj argument; {@code false} otherwise.
   */
  equals(obj) {
    if (typeof obj !== typeof this || !(obj instanceof Location)) {
      return false;
    }

    return this.getX() === obj.getX() && this.getY() === obj.getY();
  }

  /**
   * Get a location translated by the specified amount.
   *
   * @param {number} dx The amount to offset the x-coordinate.
   * @param {number} dy The amount to offset the y-coordinate.
   * @return {Location} A location translated by the specified amount.
   */
  offset(dx, dy) {
    return new Location({ x: this._x + dx, y: this._y + dy });
  }

  /**
   *
   * @param {Location} other
   * @return {Location}
   */
  offsetNegative(other) {
    return new Location({ x: this._x - other.getX(), y: this._y - other.getY() });
  }

  /**
   * Get a location translated by the specified amount.
   *
   * @param {Location} amount The amount to offset.
   * @return {Location} A location translated by the specified amount.
   */
  offsetByLocation(amount) {
    return this.offset(amount.getX(), amount.getY());
  }

  /**
   * Get a scaled location.
   *
   * @param {number} scaleRatio The ratio by which to scale the results.
   * @return {Location} A scaled copy of the current location.
   */
  scale(scaleRatio) {
    return new Location({ x: Math.ceil(this._x * scaleRatio), y: Math.ceil(this._y * scaleRatio) });
  }

  /**
   * @override
   */
  toJSON() {
    return { x: this._x, y: this._y };
  }

  /**
   * @override
   */
  toString() {
    return `(${this._x}, ${this._y})`;
  }

  toStringForFilename() {
    return `${this._x}_${this._y}`;
  }
}

Location.ZERO = new Location({ x: 0, y: 0 });

exports.Location = Location;
