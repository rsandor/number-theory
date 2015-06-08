'use strict';

var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = require('code').expect;

var gcd = require('../index').gcd;
var _ = require('underscore');

describe('gcd', function () {
  var pairs = [
      { a: 10, b: 20, g: 10 },
      { a: 17, b: 8, g: 1 },
      { a: 15, b: 100, g: 5 },
      { a: 34, b: 51, g: 17 },
      { a: -34, b: 51, g: 17 },
      { a: -34, b: -51, g: 17 },
      { a: 34, b: -51, g: 17 },
  ];
  it('should find the gcd', function(done) {
    pairs.forEach(function (pair) {
      expect(gcd(pair.a, pair.b)).to.equal(pair.g);
    });
    done();
  });

    // for k in ps[52], 2^52 - k is prime
    var ps = {
	51: [129, 139, 165, 231, 237, 247, 355, 391, 397, 439],
	52: [47, 143, 173, 183, 197, 209, 269, 285, 335, 395],
	50: [27, 35, 51, 71, 113, 117, 131, 161, 195, 233]
    };

    _.each( _.keys( ps ), function(a) {
	_.each( ps[a], function(k) {
	    _.each( _.keys( ps ), function(b) {
		_.each( ps[b], function(j) {
		    
		    var p = Math.pow( 2, a ) - k;
		    var q = Math.pow( 2, b ) - j;

		    if (p !== q) {
			it("p = 2^" + a + "-" + k + "; q = 2^" + b + "-" + j + "; gcd(p,q) == 1", function(done) {
			    expect(gcd(p,q)).to.equal(1);
			    done();
			});
		    }
		});
	    });
	});
    });
    
});
