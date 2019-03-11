'use strict';

const assert = require('assert');

const { Configuration } = require('../../..');

describe('Configuration', () => {
  it('clone constructor', () => {
    const configuration = new Configuration();
    configuration.setAppName('test');
    configuration.setApiKey('apiKey');

    const configurationCopy = new Configuration(configuration);

    assert.strictEqual(configuration.getAppName(), configurationCopy.getAppName());
    assert.strictEqual(configuration.getApiKey(), configurationCopy.getApiKey());
  });

  it('saveNewTests', () => {
    const configuration = new Configuration();
    assert.strictEqual(configuration.getSaveNewTests(), true);

    configuration.setSaveNewTests(false);
    assert.strictEqual(configuration.getSaveNewTests(), false);

    configuration.setSaveNewTests(true);
    assert.strictEqual(configuration.getSaveNewTests(), true);
  });

  it('mergeConfig', () => {
    const configuration = new Configuration();
    configuration.setAppName('test');
    configuration.setApiKey('apiKey');

    const configuration2 = new Configuration();
    configuration2.setAppName('new test name');
    configuration.setApiKey('apiKey2');
    configuration.mergeConfig(configuration2);

    assert.strictEqual(configuration.getAppName(), configuration2.getAppName());
    assert.notStrictEqual(configuration.getApiKey(), configuration2.getApiKey());
  });

  it('cloneConfig', () => {
    const configuration = new Configuration();
    configuration.setAppName('test');
    configuration.setApiKey('apiKey');

    const configuration2 = configuration.cloneConfig();
    configuration.setAppName('new test name');

    assert.notStrictEqual(configuration.getAppName(), configuration2.getAppName());
  });
});
