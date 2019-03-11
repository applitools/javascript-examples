'use strict';

const { LogHandler } = require('./LogHandler');

/**
 * Ignores all log messages.
 */
class NullLogHandler extends LogHandler {
  open() {}

  close() {}

  onMessage(verbose, logString) {} // eslint-disable-line no-unused-vars
}

exports.NullLogHandler = NullLogHandler;
