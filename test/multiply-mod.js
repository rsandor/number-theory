'use strict';

var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = require('code').expect;

var NumberTheory = require('../index');
var _ = require('underscore');

describe('multiply mod', function () {

    // for k in ps[52], 2^52 - k is prime
    var ps = {
	51: [129, 139, 165, 231, 237, 247, 355, 391, 397, 439],
	52: [47, 143, 173, 183, 197, 209, 269, 285, 335, 395],
	50: [27, 35, 51, 71, 113, 117, 131, 161, 195, 233]
    };

    _.each( _.keys( ps ), function( exponent ) {
	_.each( ps[exponent], function(k) {
	    var p = Math.pow(2,exponent) - k;

	    it("p = 2^" + exponent + "-" + k + " is probably prime", function(done) {		
		expect(NumberTheory.isProbablyPrime(p)).to.be.true();
		done();		
	    });

	    it("p = 2^" + exponent + "-" + k + "; (p-1)**(p-2) == 2 modulo p", function(done) {
		expect(NumberTheory.multiplyMod(p - 1, p - 2, p)).to.equal(2);
		done();		
	    });

	    it("p = 2^" + exponent + "-" + k + "; ((p-1)/2)**(128) == p - 64 modulo p", function(done) {
		expect(NumberTheory.multiplyMod((p - 1)/2, 128, p)).to.equal( p - 64 );
		done();		
	    });

	    it("p = 2^" + exponent + "-" + k + "; (p-3)**(p-5) == 15 modulo p", function(done) {
		expect(NumberTheory.multiplyMod(p - 3, p - 5, p)).to.equal(15);
		done();		
	    });

	    it("p = 2^" + exponent + "-" + k + "; 17 * (1/17) == 1 modulo p", function(done) {
		expect(NumberTheory.multiplyMod( 17, NumberTheory.inverseMod(17, p), p )).to.equal(1);
		done();
	    });

	    it("p = 2^" + exponent + "-" + k + "; (1/11) * (1/17) == (1/187) modulo p", function(done) {
		expect(NumberTheory.multiplyMod( NumberTheory.inverseMod(11, p), NumberTheory.inverseMod(17, p), p )).to.equal(NumberTheory.inverseMod(187, p));
		done();
	    });	    	    

	});
    });

});
