'use strict'

const assert = require('assert')
const {Eyes, ConsoleLogHandler, TestResultsStatus, GeneralUtils, BatchInfo} = require('@applitools/eyes-images')
const {ClassicRunner} = require('@applitools/eyes-selenium')
var runner = null;

const batchInfo = new BatchInfo({
  notifyOnCompletion: true,
});

let /** @type {Eyes} */ eyes
describe('EyesImages.TestImageDiffs', function() {
  this.timeout(5 * 60 * 1000)

  before(async function() {
    runner = new ClassicRunner()
    eyes = new Eyes()
    eyes.setLogHandler(new ConsoleLogHandler(true))
    eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
    eyes.setServerUrl("https://eyesapi.applitools.com")
    eyes.setBatch(batchInfo);
    // eyes.setProxy('http://localhost:8888');
  })

  after(async function () {
    await runner.getAllTestResults()
    await eyes.abort()
  });

  it('ShouldDetectDiffs', async function() {
    const testName = `${this.test.title}_${GeneralUtils.randomAlphanumeric()}`
    const image1 = `${__dirname}/image1.png`
    const image2 = `${__dirname}/image2.png`
 
    await eyes.open(this.test.parent.title, testName)
    await eyes.checkImage(image1)
    await eyes.close(false)

    await eyes.open(this.test.parent.title, testName)
    await eyes.checkImage(image2)
    //const results = await eyes.close(false)
    await eyes.close();

    //await runner.getAllTestResults(false);


    //assert.strictEqual(results.getStatus(), TestResultsStatus.Unresolved)
  })
})