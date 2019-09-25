exports.config = {
  user: process.env.BROWSERSTACK_USERNAME || 'justinison7',
  key: process.env.BROWSERSTACK_ACCESS_KEY || 'dxRTAPpqjNMKzrn7eA81',

  updateJob: false,
  specs: [
    './tests/specs/single_test.js'
  ],
  exclude: [],

  capabilities: [{
    browser: 'chrome',
    os_version : '7.0',
    device : 'Samsung Galaxy S8',
    real_mobile : 'true'
  }],

  logLevel: 'verbose',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  baseUrl: '',
  waitforTimeout: 60000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  host: 'hub.browserstack.com',
  
  framework: 'mocha',
  mochaOpts: {
      ui: 'bdd',
     timeout: 120000
  }
}
