const EyesTargetLocator = require('../../../../src/wrappers/EyesTargetLocator');
const FrameChain = require('../../../../src/frames/FrameChain');
const assert = require('assert')

describe('EyesTargetLocator', () => {
  const fakeLogger = { verbose: () => {}};
  const fakeDriver = {
    webDriver: () => {},
    switchTo: () => {
      return {
        defaultContent: () => {},
        frame: () => {}
      }
    }
  };
  const fakeTargetLocator = {};
  const eyesTargetLocator = new EyesTargetLocator(fakeLogger, fakeDriver, fakeTargetLocator);
  const frameChain = new FrameChain(fakeLogger);
  describe('frames', () => {
    it('should return undefined with a valid frame chain', async () => {
      frameChain.push({ getReference: () => { true } });
      assert.strictEqual(await eyesTargetLocator.frames(frameChain), undefined);
    });
    it('should return undefined with an invalid frame tree', async () => {
      frameChain.push({ getReference: () => { throw new Error } });
      assert.strictEqual(await eyesTargetLocator.frames(frameChain), undefined);
    });
  });
});
