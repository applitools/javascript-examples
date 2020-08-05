exports.config = {
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,

  updateJob: false,
  specs: [
    './tests/specs/single_test.js'
  ],
  exclude: [],

  capabilities: [{
    "os_version" : "12",
    "device" : "iPhone 8",
    "real_mobile" : "true",
    "browserstack.local" : "false",
    "browserstack.user" : "applitools",
    "browserstack.key" : "zBo67o7BsoKhdkf8Va4u",
    "browserName" : "iPhone"
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
    timeout: 120000000
  }
}
