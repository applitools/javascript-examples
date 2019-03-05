'use strict';

const { UnscaledFixedCutProvider } = require('./UnscaledFixedCutProvider');

class NullCutProvider extends UnscaledFixedCutProvider {
  constructor() {
    super(0, 0, 0, 0);
  }

  /**
   * @inheritDoc
   */
  scale(scaleRatio) { // eslint-disable-line no-unused-vars
    return this;
  }
}

exports.NullCutProvider = NullCutProvider;
