var request = require('request-promise');

var BrowserstackService = function BrowserstackService () {};

BrowserstackService.prototype.before = function before () {
  this.sessionId = global.browser.sessionId;
  this.auth = global.browser.requestHandler.auth || {};
  this.failures = 0;

  return this._printSessionURL();
};

BrowserstackService.prototype.afterSuite = function afterSuite (suite) {
  if (suite.hasOwnProperty('err')) {
    this.failures++;
  }
};

BrowserstackService.prototype.afterTest = function afterTest (test) {
  if (!test.passed) {
    this.failures++;
  }
};

BrowserstackService.prototype.afterStep = function afterStep (feature) {
  if (feature.status === 'failed') {
    ++this.failures;
  }
};

BrowserstackService.prototype.after = function after () {
  return this._update(this.sessionId, this._getBody());
};

BrowserstackService.prototype.onReload = function onReload (oldSessionId, newSessionId) {
    var this$1 = this;

  this.sessionId = newSessionId;
  return this._update(oldSessionId, this._getBody())
    .then(this._printSessionURL())
    .then(function () {
      this$1.failures = 0;
    });
};

BrowserstackService.prototype._update = function _update (sessionId, body) {
  return request.put({
    uri: ("https://www.browserstack.com/automate/sessions/" + sessionId + ".json"),
    json: true,
    auth: this.auth,
    body: body
  });
};

BrowserstackService.prototype._getBody = function _getBody () {
  return {
    status: this.failures === 0 ? 'completed' : 'error'
  };
};

BrowserstackService.prototype._printSessionURL = function _printSessionURL () {
  var capabilities = global.browser.desiredCapabilities;
  return request.get(
    {
      uri: ("https://www.browserstack.com/automate/sessions/" + (this
        .sessionId) + ".json"),
      json: true,
      auth: this.auth
    },
    function(error, response, body) {
      if (!error && response.statusCode === 200) {
        // These keys describe the browser the test was run on
        var browserDesc = [
          'device',
          'os',
          'osVersion',
          'os_version',
          'browserName',
          'browser',
          'browserVersion',
          'browser_version'
        ];
        var browserString = browserDesc
          .map(function (k) { return capabilities[k]; })
            .filter(function (v) { return !!v; })
          .join(' ');
        console.log(
          ("[Browserstack] " + browserString + " session: " + (body.automation_session
            .browser_url))
        );
      }
    }
  );
};

module.exports = BrowserstackService;
