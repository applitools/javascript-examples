const {Eyes, ClassicRunner, Target} = require('@applitools/eyes-protractor')
const pry = require('pryjs')

describe('My first visual test', function() {
  it('should check the angularjs website', async function() {
    browser.get('https://angularjs.org');
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
    const runner = new ClassicRunner()
    const eyes = new Eyes(runner);
    eyes.setServerUrl("https://eyesapi.applitools.com")
    
    await eyes.open(browser, "Wellfargo.com", "My first Protractor test!", {width: 1201, height: 800})
    
    
    await eyes.check('home page', Target.window().fully())
    const testResults = await eyes.close(false)
    //await eval(pry.it)
    expect(testResults._status).toEqual('Passed');
  });
  
  
  it('should check the angularjs website', async function() {
    browser.get('https://angularjs.org');
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
    const runner = new ClassicRunner()
    const eyes = new Eyes(runner);
    eyes.setServerUrl("https://eyesapi.applitools.com")
    
    await eyes.open(browser, "Wellfargo.com", "My first Protractor test!", {width: 1200, height: 800})
    
    
    await eyes.check('home page', Target.window().fully())
    const testResults = await eyes.close(false)
    //await eval(pry.it)
    expect(testResults._status).toEqual('Passed');
  });
});

// eyes.close(false).then(function (results) {
//    expect(results.status).toEqual('Passed');
//    done();
// });