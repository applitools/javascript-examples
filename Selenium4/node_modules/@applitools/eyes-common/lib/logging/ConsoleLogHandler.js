'use strict';

const { LogHandler } = require('./LogHandler');

/**
 * Write log massages to the browser/node console
 */
class ConsoleLogHandler extends LogHandler {
  /**
   * @param {boolean} isVerbose Whether to handle or ignore verbose log messages.
   */
  constructor(isVerbose) {
    super();

    this.setIsVerbose(isVerbose);
  }

  open() {}

  close() {}

  // noinspection JSUnusedGlobalSymbols
  /**
   * Handle a message to be logged.
   *
   * @param {boolean} verbose - is the message verbose
   * @param {string} logString
   */
  onMessage(verbose, logString) {
    if (!verbose || this._isVerbose) {
      console.log(this.formatMessage(logString)); // eslint-disable-line
    }
  }
}

exports.ConsoleLogHandler = ConsoleLogHandler;
