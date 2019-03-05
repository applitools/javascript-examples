'use strict';

const { PositionMemento } = require('@applitools/eyes-sdk-core');

/**
 * Encapsulates state for {@link CssTranslatePositionProvider} instances.
 */
class CssTranslatePositionMemento extends PositionMemento {
  /**
   * @param {Map<string, string>} transforms The current transforms. The keys are the style keys from which each of
   *   the transforms were taken.
   * @param {Location} position
   */
  constructor(transforms, position) {
    super();

    this._transforms = transforms;
    this._position = position;
  }

  /**
   * @return {Map<string, string>} The current transforms. The keys are the style keys from which each of the
   *   transforms were taken.
   */
  getTransform() {
    return this._transforms;
  }

  /**
   * @return {Location}
   */
  getPosition() {
    return this._position;
  }
}

exports.CssTranslatePositionMemento = CssTranslatePositionMemento;
