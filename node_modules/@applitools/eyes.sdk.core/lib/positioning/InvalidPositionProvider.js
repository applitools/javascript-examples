'use strict';

const { PositionProvider } = require('./PositionProvider');

/**
 * An implementation of {@link PositionProvider} which throws an exception for every method. Can be used as a
 * placeholder until an actual implementation is set.
 *
 * @extends PositionProvider
 */
class InvalidPositionProvider extends PositionProvider {
  // noinspection JSMethodCanBeStatic
  /**
   * @return {Promise<Location>} The current position, or {@code null} if position is not available.
   */
  getCurrentPosition() {
    throw new TypeError('This class does not implement methods!');
  }

  // noinspection JSUnusedLocalSymbols, JSMethodCanBeStatic
  /**
   * Go to the specified location.
   *
   * @param {Location} location The position to set.
   */
  setPosition(location) {
    throw new TypeError('This class does not implement methods!');
  }

  // noinspection JSMethodCanBeStatic
  /**
   * @return {Promise<RectangleSize>} The entire size of the container which the position is relative to.
   */
  getEntireSize() {
    throw new TypeError('This class does not implement methods!');
  }

  // noinspection JSMethodCanBeStatic
  /**
   * @return {Promise<object>}
   */
  getState() {
    throw new TypeError('This class does not implement methods!');
  }

  // noinspection JSUnusedLocalSymbols, JSMethodCanBeStatic
  /**
   * @param {object} state The initial state of position
   * @return {Promise<void>}
   */
  restoreState(state) {
    throw new TypeError('This class does not implement methods!');
  }
}

exports.InvalidPositionProvider = InvalidPositionProvider;
