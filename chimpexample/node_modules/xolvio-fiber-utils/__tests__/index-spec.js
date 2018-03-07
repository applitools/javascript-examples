describe('fiber-utils', function () {
  jest.autoMockOff()
  var Fiber = require('fibers');
  var fiberUtils = require('../index');
  var _ = require('underscore');
  jest.autoMockOn()

  describe('wrapAsync', function () {
    describe('wrapping a function with callback', function () {
      describe('when the wrapped function is executed in a fiber', function () {
        it('the fiber is yielded until the wrapped function has called its callback', function () {
          var hasAsyncFuncRun = false;
          // We need the someValue parameter
          // because the last parameter before the callback cannot be a function.
          // wrapAsync would think that we have passed the callback.
          var asyncFunc = function (shouldFinishCheck, someValue, callback) {
            var interval = setInterval(function () {
              if (shouldFinishCheck()) {
                hasAsyncFuncRun = true;
                clearInterval(interval);
                callback();
              }
            }, 0);
          };

          var hasAfterAsyncFuncRun = false;
          var afterAsyncFunc = function () {
            hasAfterAsyncFuncRun = true;
          }

          var wrappedAsyncFunc = fiberUtils.wrapAsync(asyncFunc);

          var shouldFinish = false;
          var shouldFinishFunc = function () {
            return shouldFinish;
          }

          Fiber(function () {
            wrappedAsyncFunc(shouldFinishFunc, 'foo');
            afterAsyncFunc();
          }).run();

          jest.runOnlyPendingTimers();
          expect(hasAfterAsyncFuncRun).toBe(false);
          shouldFinish = true;
          jest.runOnlyPendingTimers();
          expect(hasAsyncFuncRun).toBe(true);
          expect(hasAfterAsyncFuncRun).toBe(true);
        })
      })

      describe('when the wrapped function calls the callback with an undefined result', function () {
        it('the wrapped function is chainable', function () {
          var myObject = {
            asyncFunc: function (callback) {
              callback();
            }
          }

          var wrappedFunc = fiberUtils.wrapAsync(myObject.asyncFunc, myObject);

          expect(wrappedFunc()).toBe(myObject);
        })
      })
    })

    describe('wrapping a function that returns a promise', function () {
      describe('when the wrapped function is executed in a fiber', function () {
        it('the fiber is yielded until the wrapped function has resolved its returned promise', function () {
          var hasAsyncFuncRun = false;
          // We need the someValue parameter
          // because the last parameter before the callback cannot be a function.
          // wrapAsync would think that we have passed the callback.
          var asyncFunc = function (shouldFinishCheck, someValue) {
            return {
              then: function (resolve) {
                var interval = setInterval(function () {
                  if (shouldFinishCheck()) {
                    hasAsyncFuncRun = true;
                    clearInterval(interval);
                    resolve();
                  }
                }, 0);
              }
            };
          };

          var hasAfterAsyncFuncRun = false;
          var afterAsyncFunc = function () {
            hasAfterAsyncFuncRun = true;
          }

          var wrappedFunc = fiberUtils.wrapAsync(asyncFunc);

          var shouldFinish = false;
          var shouldFinishFunc = function () {
            return shouldFinish;
          }

          Fiber(function () {
            wrappedFunc(shouldFinishFunc, 'foo');
            afterAsyncFunc();
          }).run();

          jest.runOnlyPendingTimers();
          expect(hasAfterAsyncFuncRun).toBe(false);
          shouldFinish = true;
          jest.runOnlyPendingTimers();
          expect(hasAsyncFuncRun).toBe(true);
          expect(hasAfterAsyncFuncRun).toBe(true);
        })
      })

      describe('when the wrapped function rejects its returned promise', function () {
        it('the rejection error is thrown', function () {
          var error = new Error('Rejected promise');
          var asyncFunc = function () {
            return {
              then: function (resolve, reject) {
                reject(error);
              }
            };
          };

          var wrappedFunc = fiberUtils.wrapAsync(asyncFunc);
          var runWrappedFunc = function () {
            wrappedFunc();
          };

          expect(runWrappedFunc).toThrow(error);
        })
      })

      describe('when the wrapped function resolves its return promise', function () {
        it('the function wrapper returns the resolved value', function () {
          var returnValue = 'foo';
          var asyncFunc = function () {
            return {
              then: function (resolve) {
                resolve(returnValue);
              }
            };
          };

          var wrappedFunc = fiberUtils.wrapAsync(asyncFunc);

          expect(wrappedFunc()).toBe(returnValue);
        })
      })

      describe('when the wrapped function resolves its return promise with undefined', function () {
        it('the wrapped function is chainable', function () {
          var myObject = {
            asyncFunc: function () {
              return {
                then: function (resolve) {
                  resolve();
                }
              };
            }
          }

          var wrappedFunc = fiberUtils.wrapAsync(myObject.asyncFunc, myObject);

          expect(wrappedFunc()).toBe(myObject);
        })
      })
    })

    describe('options', function () {
      it('"supportCallback: false" does not add a callback to the args', function () {
        var args = null;
        var asyncFunc = function () {
          args = _.toArray(arguments);
          return {
            then: function (resolve) {
              resolve();
            }
          };
        };

        var wrappedFunc = fiberUtils.wrapAsync(
          asyncFunc, null, {supportCallback: false});
        wrappedFunc();

        expect(args).toEqual([]);
      })
    })
  })

  describe('wrapAsyncObject', function () {
    var myObject;
    var wrapAsync;

    beforeEach(function () {
      myObject = {
        myFunc: function () {
          return {
            then: function (resolve) {
              resolve();
            }
          };
        }
      };

      wrapAsync = function (fn) {
        return {
          fn: fn,
          isWrapped: true
        };
      };
    })


    it('creates a sync version', function () {
      var myObjectWrapper = fiberUtils.wrapAsyncObject(myObject, ['myFunc'], {
        wrapAsync: wrapAsync
      });

      expect(myObjectWrapper.myFunc).toBeDefined();
      expect(myObjectWrapper.myFunc.isWrapped).toBe(true);
      expect(myObjectWrapper.myFuncSync).toBeDefined();
      expect(myObjectWrapper.myFuncSync.isWrapped).toBe(true);
    })

    it('makes the async version available', function () {
      var myFunc = myObject.myFunc;
      myFunc.bind = function () {
        return myFunc;
      }

      var myObjectWrapper = fiberUtils.wrapAsyncObject(myObject, ['myFunc'], {
        wrapAsync: wrapAsync
      });

      expect(myObjectWrapper.myFuncAsync).toBeDefined();
      expect(myObjectWrapper.myFuncAsync).toBe(myFunc);
    })

    describe('when the object already has a function with the same name', function () {
      it('uses an unused name', function () {
        var myFunc = myObject.myFunc;
        myFunc.bind = function () {
          return myFunc;
        }
        var existingFunc = function () {};
        myObject.myFuncAsync = existingFunc;
        myObject.myFuncSync = existingFunc;

        var myObjectWrapper = fiberUtils.wrapAsyncObject(
          myObject,
          ['myFunc', 'myFuncAsync', 'myFuncSync'],
          {wrapAsync: wrapAsync}
        );

        expect(myObjectWrapper.myFuncAsync.fn).toBe(existingFunc);
        expect(myObjectWrapper.myFuncSync.fn).toBe(existingFunc);
        expect(myObjectWrapper.myFuncAsync2).toBe(myFunc);
        expect(myObjectWrapper.myFuncSync2).toBeDefined();
        expect(myObjectWrapper.myFuncSync2.isWrapped).toBe(true);
        expect(myObjectWrapper.myFuncSync2.fn).toBe(myFunc);
      });
    });

    describe('options', function () {
      it('"syncByDefault: false" makes the default function async', function () {
        var myFunc = myObject.myFunc;
        myFunc.bind = function () {
          return myFunc;
        }

        var myObjectWrapper = fiberUtils.wrapAsyncObject(myObject, ['myFunc'], {
          wrapAsync: wrapAsync,
          syncByDefault: false
        });

        expect(myObjectWrapper.myFunc).toBeDefined();
        expect(myObjectWrapper.myFunc).toBe(myFunc);
      })
    })
  })
})
