'use strict';

/**
 * The base Applitools Eyes error type.
 */
class EyesError extends Error {

    /**
     * @param {string} [message] The error description string
     * @param [params...] Other params for Error constructor
     */
    constructor(message, ...params) {
        super(message, ...params);

        /** @override */
        this.name = this.constructor.name;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = EyesError;
