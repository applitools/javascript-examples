'use strict';

/**
 * Encapsulates page/element positioning.
 *
 * @interface
 */
class PositionProvider {
  /**
   * @return {Promise<Location>} The current position, or {@code null} if position is not available.
   */
  getCurrentPosition() {}

  /**
   * Go to the specified location.
   *
   * @param {Location} location The position to set.
   * @return {Promise<void>}
   */
  setPosition(location) {}

  /**
   * @return {Promise<RectangleSize>} The entire size of the container which the position is relative to.
   */
  getEntireSize() {}

  /**
   * @return {Promise<PositionMemento>}
   */
  getState() {}

  /**
   * @param {PositionMemento} state The initial state of position
   * @return {Promise<void>}
   */
  restoreState(state) {}
}

exports.PositionProvider = PositionProvider;
