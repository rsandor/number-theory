'use strict';

var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = require('code').expect;

var modpow = require('../index').modpow;

describe('modpow', function () {
  it("2**(-123456789) * 12373 mod 104743 = 1", function(done) {
      expect((modpow(2, -123456789, 104743) * 12373) % 104743).to.equal(1);
      done();
  });    
    
  var pairs = [
      { base: 2, exp: 50, mod: 13, result: 4 },
      { base: 10, exp: 10, mod: 11, result: 1 },
      { base: 142, exp: 210, mod: 198, result: 100 },
      { base: 7600, exp: 283, mod: 13, result: 5 },
      { base: 2, exp: 123456789, mod: 104743, result: 12373 },
      { base: 2, exp: 13395, mod: 179424779, result: 59783755 },
      { base: 2, exp: 926865135, mod: 2038074803, result: 513 },                  
  ];
  it('should calculate modpow', function(done) {
    pairs.forEach(function (pair) {
      expect(modpow(
        pair.base,
        pair.exp,
        pair.mod
      )).to.equal(pair.result);
    });
    done();
  });
});
