'use strict';

var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = require('code').expect;

var NumberTheory = require('../index');

describe('primitive roots', function () {
    var primes = [
	3, 5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,
	101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,
	193,197,199,211,223,227,229,233,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,
    ];
    
    it('should find primitive roots', function(done) {
	primes.forEach(function (prime) {
	    var root = NumberTheory.primitiveRoot(prime);
	    
	    for( var i=1; i < prime - 1; i++ )
		expect(NumberTheory.powerMod(root, i, prime)).to.not.equal(1);
	    
	    expect(NumberTheory.powerMod(root, prime - 1, prime)).to.equal(1);
	});
	
	done();
    });

    it('should find random primitive roots', function(done) {
	primes.forEach(function (prime) {
	    var root = NumberTheory.randomPrimitiveRoot(prime);
	    
	    for( var i=1; i < prime - 1; i++ )
		expect(NumberTheory.powerMod(root, i, prime)).to.not.equal(1);
	    
	    expect(NumberTheory.powerMod(root, prime - 1, prime)).to.equal(1);
	});
	
	done();
    });

});
