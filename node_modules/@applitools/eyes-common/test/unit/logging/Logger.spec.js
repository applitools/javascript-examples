'use strict';

const assert = require('assert');

const { Logger, NullLogHandler, ConsoleLogHandler } = require('../../../index');

describe('Logger', () => {
  describe('constructor', () => {
    it('by default should be used NullLogHandler', () => {
      const logger = new Logger();
      assert.ok(logger.getLogHandler() instanceof NullLogHandler);
    });

    it('if `false` passed should be used NullLogHandler', () => {
      const logger = new Logger(false);
      assert.ok(logger.getLogHandler() instanceof NullLogHandler);
    });

    it('if `false` (as string) passed should be used NullLogHandler', () => {
      const logger = new Logger('false');
      assert.ok(logger.getLogHandler() instanceof NullLogHandler);
    });

    it('if `true` passed should be used NullLogHandler', () => {
      const logger = new Logger(true);
      assert.ok(logger.getLogHandler() instanceof ConsoleLogHandler);
    });

    it('if `true` (as string) passed should be used NullLogHandler', () => {
      const logger = new Logger('true');
      assert.ok(logger.getLogHandler() instanceof ConsoleLogHandler);
    });

    it('if `random string` passed should be used NullLogHandler', () => {
      const logger = new Logger('random string');
      assert.ok(logger.getLogHandler() instanceof NullLogHandler);
    });
  });
});
