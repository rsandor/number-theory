'use strict';

var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = require('code').expect;

var NumberTheory = require('../index');

describe('euler phi', function () {
    var primes = [
	3, 5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,
	101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,
	193,197,199,211,223,227,229,233,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,
    ];
    
    it('fermats little theorem should hold', function(done) {
	primes.forEach(function (p) {
	    expect(NumberTheory.powerMod( 2, NumberTheory.eulerPhi(p), p )).to.equal(1);
	});
	done();
    });

    it("phi(351135) == 176256", function(done) {
        expect(NumberTheory.eulerPhi(351135)).to.equal(176256);
	done();
    });
    
});
