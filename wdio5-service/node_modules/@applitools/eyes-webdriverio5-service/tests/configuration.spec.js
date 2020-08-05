'use strict';

const {deepEqual} = require('assert');

describe('EyesServiceTest', () => {

  beforeEach(() => {
    browser.url('http://applitools.github.io/demo/TestPages/FramesTestPage/');
  });

  it('checkWindow', () => {
    const viewportSize = {width: 500, height: 400};
    browser.eyesGetConfiguration().setViewportSize(viewportSize);

    browser.eyesCheck('window');

    const actualViewportSize = browser.eyesGetConfiguration().getViewportSize();

    deepEqual(viewportSize, actualViewportSize.toJSON());
  });

});
