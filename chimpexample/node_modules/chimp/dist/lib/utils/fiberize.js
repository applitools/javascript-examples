'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.fiberize = fiberize;
exports.fiberizeSync = fiberizeSync;

var _fibers = require('fibers');

var _fibers2 = _interopRequireDefault(_fibers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Wrap a function in a fiber.
// Correctly handles expected presence of done callback
function fiberize(fn) {
  return function (done) {
    var self = this;
    (0, _fibers2.default)(function () {
      if (fn.length === 1) {
        fn.call(self, done);
      } else {
        var res = fn.call(self);
        if ((typeof res === 'undefined' ? 'undefined' : (0, _typeof3.default)(res)) === 'object' && res !== null && typeof res.then === 'function') {
          res.then(function () {
            return done();
          }).catch(done);
        } else {
          done();
        }
      }
    }).run();
  };
}

function fiberizeSync(fn) {
  return function () {
    var self = this;
    (0, _fibers2.default)(function () {
      fn.call(self);
    }).run();
  };
}