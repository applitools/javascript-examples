exports.config = {
  user: process.env.BROWSERSTACK_USERNAME || 'yourBSUser',
  key: process.env.BROWSERSTACK_ACCESS_KEY || 'YourAPIKey',

  updateJob: false,
  specs: [
    './tests/specs/single_test.js'
  ],
  exclude: [],

  capabilities: [{
    browserName: 'chrome',
    // os_version : '7.0',
    // device : 'Samsung Galaxy S8',
    // real_mobile : 'true'
  }],

  logLevel: 'verbose',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  baseUrl: '',
  waitforTimeout: 60000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  //host: 'hub.browserstack.com',
  //host: 'localhost',
  //port: 4444,
  debug: true,
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 120000
  }
}
