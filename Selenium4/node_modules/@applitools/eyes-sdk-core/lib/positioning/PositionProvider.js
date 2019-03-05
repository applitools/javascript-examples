'use strict';

/* eslint-disable no-unused-vars */

/**
 * Encapsulates page/element positioning.
 *
 * @abstract
 */
class PositionProvider {
  // noinspection JSMethodCanBeStatic
  /**
   * @return {Promise<Location>} The current position, or {@code null} if position is not available.
   */
  async getCurrentPosition() {
    throw new TypeError('The method is not implemented!');
  }

  // noinspection JSMethodCanBeStatic
  /**
   * Go to the specified location.
   *
   * @param {Location} location The position to set.
   * @return {Promise<void>}
   */
  async setPosition(location) {
    throw new TypeError('The method is not implemented!');
  }

  // noinspection JSMethodCanBeStatic
  /**
   * @return {Promise<RectangleSize>} The entire size of the container which the position is relative to.
   */
  async getEntireSize() {
    throw new TypeError('The method is not implemented!');
  }

  // noinspection JSMethodCanBeStatic
  /**
   * @return {Promise<PositionMemento>}
   */
  async getState() {
    throw new TypeError('The method is not implemented!');
  }

  // noinspection JSMethodCanBeStatic
  /**
   * @param {PositionMemento} state The initial state of position
   * @return {Promise<void>}
   */
  async restoreState(state) {
    throw new TypeError('The method is not implemented!');
  }
}

exports.PositionProvider = PositionProvider;
