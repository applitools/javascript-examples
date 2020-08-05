const {Builder, By, until} = require('selenium-webdriver');
const {Eyes, ConsoleLogHandler, Target, MatchLevel, StitchMode} = require('@applitools/eyes-selenium');

describe('Eyes.Selenium.JavaScript - Protractor', function() {
  beforeAll(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
    //browser.ignoreSynchronization = true;
    eyes = new Eyes()
    eyes.setApiKey(process.env.APPLITOOLS_API_KEY)
    eyes.setLogHandler(new ConsoleLogHandler(true))
    eyes.setStitchMode(StitchMode.CSS)
    eyes.setForceFullPageScreenshot(true)
  })

  beforeEach(function(done) {
    eyes
      .open(browser, "Protractor", "Protractor Test", {width: 1000, height: 296})
      .then(function() {
        done()
      })
  })

  it('check interface', async function(done) {
   await browser.get('https://astappiev.github.io/test-html-pages/')

    // Entire window, equivalent to eyes.checkWindow()
    
    await browser.sleep(5000);

    await eyes.check(
      'Entire window',
      Target.window().ignore(by.id('overflowing-div')).ignore({left: 400, top: 100, width: 50, height: 50},{left: 400, top: 200, width: 50, height: 100})
        .floatingRegion({
          left: 500,
          top: 100,
          width: 75,
          height: 100,
          maxLeftOffset: 25,
          maxRightOffset: 10,
          maxUpOffset: 30,
          maxDownOffset: 15,
        })
      // .floating({element: element(by.tagName("h1")), maxLeftOffset: 10, maxRightOffset: 10, maxUpOffset: 10, maxDownOffset: 10})
    )

    // Region by rect, equivalent to eyes.checkFrame()
    await eyes.check(
      'Region by rect',
      Target.region({left: 50, top: 50, width: 200, height: 200}),
      // .floating({left: 50, top: 50, width: 60, height: 50, maxLeftOffset: 10, maxRightOffset: 10, maxUpOffset: 10, maxDownOffset: 10})
      // .floating({left: 150, top: 75, width: 60, height: 50, maxLeftOffset: 10, maxRightOffset: 10, maxUpOffset: 10, maxDownOffset: 10})
    )

    // Region by element, equivalent to eyes.checkRegionByElement()
    await eyes.check('Region by element', Target.region($('body > h1')))

    // Region by locator, equivalent to eyes.checkRegionBy()
    await eyes.check('Region by locator', Target.region($('#overflowing-div-image')))

    // Entire element by element, equivalent to eyes.checkElement()
    await eyes.check(
      'Entire element by element',
      Target.region(element(by.id('overflowing-div-image'))).fully(),
    )

    // Entire element by locator, equivalent to eyes.checkElementBy()
    await eyes.check(
      'Entire element by locator',
      Target.region(by.id('overflowing-div'))
        .fully()
        .matchLevel(MatchLevel.Exact),
    )

    // Entire frame by locator, equivalent to eyes.checkFrame()
    await eyes.check('Entire frame by locator', Target.frame(by.name('frame1')))

    // Entire region in frame by frame name and region locator, equivalent to eyes.checkRegionInFrame()
    await eyes.check(
      'Entire region in frame by frame name and region locator',
      Target.region(by.id('inner-frame-div'), 'frame1').fully(),
    )

    await eyes.close().then(function() {
      done()
    })
  })

  afterEach(function(done) {
    eyes.abort().then(function() {
      done()
    })
  })
})