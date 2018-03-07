describe('expect', function () {
  var expect = require('../index').expect;

  it('toBe', function () {
    var foo = {};
    expect(foo).toBe(foo);
  })

  it('toBeCloseTo', function () {
    expect(2.01).toBeCloseTo(2, 1);
  })

  it('toBeDefined', function () {
    expect({}).toBeDefined();
  })

  it('toBeFalsy', function () {
    expect(false).toBeFalsy();
    expect('').toBeFalsy();
    expect(0).toBeFalsy();
  })

  it('toBeGreaterThan', function () {
    expect(2).toBeGreaterThan(1);
  })

  it('toBeLessThan', function () {
    expect(1).toBeLessThan(2);
  })

  it('toBeNaN', function () {
    expect(NaN).toBeNaN();
  })

  it('toBeTruthy', function () {
    expect(true).toBeTruthy();
    expect('1').toBeTruthy();
    expect(1).toBeTruthy();
  })

  it('toBeUndefined', function () {
    expect(undefined).toBeUndefined();
  })

  it('toContain', function () {
    expect([1]).toContain(1);
  })

  it('toEqual', function () {
    expect({foo: 'bar'}).toEqual({foo: 'bar'});
  })

  xit('toHaveBeenCalled', function () {

  })

  xit('toHaveBeenCalledWith', function () {

  })

  it('toMatch', function () {
    expect('foobar').toMatch(/foo/);
  })

  it('toThrow', function () {
    expect(function () { throw new Error(); }).toThrow();
  })

  it('toThrowError', function () {
    expect(function () { throw new Error('my error'); }).toThrowError('my error');
  })

  describe('not', function () {
    it('toBe', function () {
      var foo = {};
      expect(foo).toBe(foo);
    })

    it('toBeCloseTo', function () {
      expect(2.01).toBeCloseTo(2, 1);
    })

    it('toBeDefined', function () {
      expect(undefined).not.toBeDefined();
    })

    it('toBeFalsy', function () {
      expect(true).not.toBeFalsy();
    })

    it('toBeGreaterThan', function () {
      expect(1).not.toBeGreaterThan(2);
    })

    it('toBeLessThan', function () {
      expect(2).not.toBeLessThan(1);
    })

    it('toBeNaN', function () {
      expect(null).not.toBeNaN();
    })

    it('toBeTruthy', function () {
      expect(false).not.toBeTruthy();
    })

    it('toBeUndefined', function () {
      expect(null).not.toBeUndefined();
    })

    it('toContain', function () {
      expect([1]).not.toContain(2);
    })

    it('toEqual', function () {
      expect({foo: 'bar'}).toEqual({foo: 'bar'});
    })

    xit('toHaveBeenCalled', function () {

    })

    xit('toHaveBeenCalledWith', function () {

    })

    it('toMatch', function () {
      expect('foobar').not.toMatch(/hello/);
    })

    it('toThrow', function () {
      expect(function () {}).not.toThrow();
    })

    it('toThrowError', function () {
      expect(function () {}).not.toThrowError('my error');
    })
  })
})

describe('addMatchers', function () {
  var expect = require('../index').expect;
  var addMatchers = require('../index').addMatchers;

  it('adds matcher', function () {
    addMatchers({
      toBeTrue: function (util, customEqualityTesters) {
        return {
          compare: function (actual) {
            var result = {};
            result.pass = util.equals(actual, true, customEqualityTesters);
            if (result.pass) {
              result.message = 'Expected "' + actual + '" not to be true';
            } else {
              result.message = 'Expected "' + actual + '" to be true';
            }

            return result;
          }
        }
      }
    });

    expect(true).toBeTrue();
    expect(false).not.toBeTrue();
  })
})
