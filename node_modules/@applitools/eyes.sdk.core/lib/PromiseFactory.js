'use strict';

/**
 * After initialization, provides factory methods for creating promises.
 */
class PromiseFactory {
  /**
   * @param {function} promiseFactoryFunc A function which receives as a parameter the same function you would pass to
   *   a Promise constructor.
   */
  constructor(promiseFactoryFunc) {
    this._promiseFactoryFunc = promiseFactoryFunc;
  }

  /**
   * Sets the factory method which will be used to create promises.
   *
   * @param {function} promiseFactoryFunc A function which receives as a parameter the same function you would pass to
   *   a Promise constructor.
   */
  setFactoryMethod(promiseFactoryFunc) {
    this._promiseFactoryFunc = promiseFactoryFunc;
  }

  /**
   * @return {function} A function which receives as a parameter the same function you would pass to a Promise
   *   constructor.
   */
  getFactoryMethod() {
    return this._promiseFactoryFunc;
  }

  /**
   * The Promise object represents the eventual completion (or failure) of an asynchronous operation, and its resulting
   * value.
   *
   * @param {function} executor A function that is passed with the arguments resolve and reject.
   * @return {*}
   */
  makePromise(executor) {
    if (this._promiseFactoryFunc) {
      return this._promiseFactoryFunc(executor);
    }

    throw new Error('Promise factory was not initialized with proper callback');
  }

  /**
   * The method returns a Promise object that is resolved with the given value.
   *
   * @template T
   * @param {T} [value] argument to be resolved by this Promise. Can also be a Promise or a thenable to resolve.
   * @return {Promise<T>}
   */
  resolve(value) {
    return this.makePromise(resolve => {
      resolve(value);
    });
  }

  /**
   * The method returns a Promise object that is rejected with the given reason.
   *
   * @template T
   * @param {T} [value] reason why this Promise rejected.
   * @return {Promise<T>}
   */
  reject(value) {
    return this.makePromise((resolve, reject) => {
      reject(value);
    });
  }

  /**
   * The method returns a promise that resolves or rejects as soon as one of the promises in the iterable resolves or
   * rejects, with the value or reason from that promise.
   *
   * @param {Iterable<Promise<*>>} iterable
   * @return {Promise<*>}
   */
  race(iterable) {
    return this.makePromise((resolve, reject) => {
      // noinspection JSUnresolvedVariable
      for (let i = 0, len = iterable.length; i < len; i += 1) {
        iterable[i].then(resolve, reject);
      }
    });
  }

  /**
   * The method returns a single Promise that resolves when all of the promises in the iterable argument have resolved
   * or when the iterable argument contains no promises. It rejects with the reason of the first promise that rejects.
   *
   * @param {Iterable<Promise<*>>} iterable
   * @return {Promise<*[]>}
   */
  all(iterable) {
    const args = Array.prototype.slice.call(iterable);
    return this.makePromise((resolve, reject) => {
      if (args.length === 0) {
        return resolve([]);
      }
      let remaining = args.length;

      const resolveFn = (curr, i) => {
        try {
          if (curr && (typeof curr === 'object' || typeof curr === 'function') && typeof curr.then === 'function') {
            // noinspection JSUnresolvedFunction
            curr.then.call(curr, val => resolveFn(val, i), reject);
            return;
          }
          args[i] = curr;
          remaining -= 1;
          if (remaining === 0) {
            resolve(args);
          }
        } catch (ex) {
          reject(ex);
        }
      };

      for (let i = 0; i < args.length; i += 1) {
        resolveFn(args[i], i);
      }
    });
  }
}

exports.PromiseFactory = PromiseFactory;
