'use strict';

const assert = require('assert');

const { ArgumentGuard } = require('../../../index');

describe('ArgumentGuard', () => {
  describe('isBoolean()', () => {
    it('should be ok, boolean given', () => {
      assert.doesNotThrow(() => {
        ArgumentGuard.isBoolean(true, 'testparam');
      });
    });

    it('should throw error, string given', () => {
      assert.throws(() => {
        ArgumentGuard.isBoolean('NOT A BOOLEAN', 'testparam');
      });
    });

    it('should be ok too, no value given in non-strict mode', () => {
      assert.doesNotThrow(() => {
        ArgumentGuard.isBoolean(undefined, 'testparam', false);
      });
    });

    it('should throw error, no value given in strict mode (default behaviour)', () => {
      assert.throws(() => {
        ArgumentGuard.isBoolean(undefined, 'testparam');
      });
    });
  });
});
