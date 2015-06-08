'use strict';

var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = require('code').expect;

var NumberTheory = require('../index');
var _ = require('underscore');

describe('jacobi symbol', function () {
    it("jacobiSymbol(2,112272535095293) == -1", function(done) {
	expect(NumberTheory.jacobiSymbol(2,112272535095293)).to.equal(-1);
	done();
    });
    
    _.each( [467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601], function(a) {
	_.each( [1229, 1231, 1237, 1249, 1259, 1277, 1279, 1283, 1289, 1291, 1297, 1301, 1303, 1307, 1319, 1321, 1327, 1361, 1367, 1373],
		function( p ) {
		    it(a.toString() + " * " + p.toString() + " is not prime", function(done) {
			expect(NumberTheory.isPrime(a*p)).to.be.false();
			done();
		    });

		    it("(" + a.toString() + " on " + p.toString() + ") = (-1)**((" + p.toString() + "-1)/2)", function(done) {
			expect((NumberTheory.jacobiSymbol(a,p) + p) % p).to.equal(NumberTheory.powerMod(a, (p-1)/2, p));
			done();
		    });

		    if (NumberTheory.jacobiSymbol(a,p) == 1) {
			it("NumberTheory.squareRootModPrime(" + a.toString() + "," + p.toString() + ") is a square root", function(done) {
			    var r = NumberTheory.squareRootModPrime(a,p);
			    expect((r * r) % p).to.equal(a % p);
			    done();
			});
		    }
		});
    });

    _.each( [1229, 1231, 1237, 1249, 1259, 1277, 1279, 1283, 1289, 1291, 1297, 1301, 1303, 1307, 1319, 1321, 1327, 1361, 1367, 1373],
	    function( p ) {
		it("quadraticNonresidue(" + p.toString() + ") is really a nonresidue", function (done) {
		    expect(NumberTheory.jacobiSymbol(NumberTheory.quadraticNonresidue(p),p)).to.equal(-1);
		    done();
		});

		it(p.toString() + " is prime", function (done) {
		    expect(NumberTheory.isPrime(p)).to.be.true();
		    done();
		});
	    });
    
});
