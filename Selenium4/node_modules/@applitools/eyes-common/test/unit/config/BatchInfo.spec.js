'use strict';

const assert = require('assert');

const { BatchInfo } = require('../../../index');

describe('BatchInfo', () => {
  it('create empty batch', () => {
    const batch = new BatchInfo();
    assert.strictEqual(typeof batch.getId(), 'string');
    assert.strictEqual(typeof batch.getName(), 'undefined');
    assert.strictEqual(typeof batch.getStartedAt(), 'object');
  });

  it('create batch by name', () => {
    const batch = new BatchInfo('hello');
    assert.strictEqual(typeof batch.getId(), 'string');
    assert.strictEqual(typeof batch.getName(), 'string');
    assert.strictEqual(typeof batch.getStartedAt(), 'object');
    assert.strictEqual(batch.getName(), 'hello');
  });

  it('create batch by name, startedAt, id', () => {
    const started = new Date();
    const batch = new BatchInfo('hello', started, 'id');
    assert.strictEqual(typeof batch.getId(), 'string');
    assert.strictEqual(typeof batch.getName(), 'string');
    assert.strictEqual(typeof batch.getStartedAt(), 'object');
    assert.strictEqual(batch.getId(), 'id');
    assert.strictEqual(batch.getName(), 'hello');
    assert.strictEqual(batch.getStartedAt(), started);
  });

  it('create batch from object', () => {
    const started = new Date();
    const batch = new BatchInfo({ id: 'id', name: 'hello', startedAt: started });
    assert.strictEqual(typeof batch.getId(), 'string');
    assert.strictEqual(typeof batch.getName(), 'string');
    assert.strictEqual(typeof batch.getStartedAt(), 'object');
    assert.strictEqual(batch.getId(), 'id');
    assert.strictEqual(batch.getName(), 'hello');
    assert.strictEqual(batch.getStartedAt(), started);
  });

  it('create batch from another batch', () => {
    const batch = new BatchInfo('hello', new Date(), 'id');
    const batch2 = new BatchInfo(batch);
    assert.strictEqual(batch.getId(), batch2.getId());
    assert.strictEqual(batch.getName(), batch2.getName());
    assert.strictEqual(batch.getStartedAt(), batch2.getStartedAt());
  });
});
