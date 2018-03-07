var util = require('util');
var jRequire = require('jasmine-core/lib/jasmine-core/jasmine');
var j$ = jRequire.core(jRequire);

function ExpectationFailed(message, result) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
  this.result = result;
}

util.inherits(ExpectationFailed, Error);

module.exports.customEqualityTesters = [];

module.exports.addCustomEqualityTester = function(tester) {
  module.exports.customEqualityTesters.push(tester);
};

module.exports.customMatchers = {};

module.exports.addMatchers = function(matchersToAdd) {
  for (var matcherName in matchersToAdd) {
    module.exports.customMatchers[matcherName] = matchersToAdd[matcherName];
  }
};

j$.Expectation.addCoreMatchers(j$.matchers);

var buildExpectationResult = j$.buildExpectationResult;
var exceptionFormatter = new j$.ExceptionFormatter();
var expectationResultFactory = function (attrs) {
  attrs.messageFormatter = exceptionFormatter.message;
  attrs.stackFormatter = exceptionFormatter.stack;

  return buildExpectationResult(attrs);
}

function addExpectationResult(passed, result, isError) {
  if (!passed) {
    if (isError) {
      throw new Error(result);
    } else {
      throw new ExpectationFailed(result.message);
    }
  }
}

module.exports.expect = function(actual) {
  return j$.Expectation.Factory({
    util: j$.matchersUtil,
    customEqualityTesters: module.exports.customEqualityTesters,
    customMatchers: module.exports.customMatchers,
    actual: actual,
    addExpectationResult: addExpectationResult
  });
};
