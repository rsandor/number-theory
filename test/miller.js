'use strict';

var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = require('code').expect;

var miller = require('../index').miller;

describe('miller', function () {
  it('should return false for 0 and 1', function(done) {
    expect(miller(0)).to.be.false();
    expect(miller(1)).to.be.false();
    done();
  });

  it('should find primes less than 1373653', function(done) {
    var primes = [
      2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,
      101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,
      193,197,199,211,223,227,229,233,58013,58027,58031,113023,113027,113039,
      271969,271981,272003,522391,522409,522413,957109,957119,957133,957139,
      957161,957169,957181
    ];
    primes.forEach(function (prime) {
      expect(miller(prime)).to.be.true();
    });
    done();
  });

  it('should find composites less than 1 373 653', function(done) {
    var composite = [
      4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 22, 24, 25, 26, 27, 28, 30,
      32, 33, 34, 35, 36, 38, 39, 40, 42, 44, 45, 46, 48, 49, 50, 51, 52, 54,
      55, 56, 57, 58, 60, 62, 63, 64, 65, 66, 68, 69, 70, 72, 74, 75, 76, 77,
      78, 80, 81, 82, 84, 85, 86, 87, 88, 90, 91, 92, 93, 94, 95, 96, 98, 99,
      100, 102, 104, 105, 106, 108, 110, 111, 112, 114, 115, 116, 117, 118, 119,
      120, 121, 122, 123, 124, 125, 126, 128, 129, 130, 132, 133, 134, 135, 136,
      138, 140, 141, 142, 143, 144, 145, 146, 147, 148, 150
    ];
    composite.forEach(function (c) {
      expect(miller(c)).to.be.false();
    });
    done();
  });

  it('should find primes less than 9 080 191', function(done) {
    var primes = [
      1454839, 2919757, 3217219, 4251491, 5584673, 6465131, 7492127,
      8275987, 9080189
    ];
    primes.forEach(function (p) {
      expect(miller(p)).to.be.true();
    });
    done();
  });
});
