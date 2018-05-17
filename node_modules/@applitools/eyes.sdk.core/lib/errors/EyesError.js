'use strict';

/**
 * The base Applitools Eyes error type.
 */
class EyesError extends Error {
  /**
   * @param {string} [message] The error description string
   * @param {Error} [error] Another error to inherit from
   */
  constructor(message, error) {
    super(message);

    /** @override */
    this.name = this.constructor.name;

    if (error instanceof Error) {
      this.message = `${message}: ${error.message}`;
      this.stack = error.stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

exports.EyesError = EyesError;
