'use strict';

var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = require('code').expect;

var modpow = require('../index').modpow;

describe('modpow', function () {
  var pairs = [
    { base: 2, exp: 50, mod: 13, result: 4 },
    { base: 10, exp: 10, mod: 11, result: 1 },
    { base: 142, exp: 210, mod: 198, result: 100 },
    { base: 7600, exp: 283, mod: 13, result: 5 }
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
