'use strict';

var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = require('code').expect;

var gcd = require('../index').gcd;

describe('gcd', function () {
  var pairs = [
    { a: 10, b: 20, g: 10 },
    { a: 17, b: 8, g: 1 },
    { a: 15, b: 100, g: 5 }
  ];
  it('should find the gcd', function(done) {
    pairs.forEach(function (pair) {
      expect(gcd(pair.a, pair.b)).to.equal(pair.g);
    });
    done();
  });
});
