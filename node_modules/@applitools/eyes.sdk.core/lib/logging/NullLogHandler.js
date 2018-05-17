'use strict';

const { LogHandler } = require('./LogHandler');

/**
 * Ignores all log messages.
 */
class NullLogHandler extends LogHandler {
  open() {}

  close() {}

  onMessage(verbose, logString) {}
}

exports.NullLogHandler = NullLogHandler;
