'use strict';

var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = require('code').expect;

var NumberTheory = require('../index');
var _ = require('underscore');

describe('square roots', function () {

    _.each( [467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601], function(a) {
	_.each( [1229, 1231, 1237, 1249, 1259, 1277, 1279, 1283, 1289, 1291, 1297, 1301, 1303, 1307, 1319, 1321, 1327, 1361, 1367, 1373], function( p ) {
	    if (NumberTheory.jacobiSymbol(a,p) == 1) {
		_.each( [1229, 1231, 1237, 1249, 1259, 1277, 1279, 1283, 1289, 1291, 1297, 1301, 1303, 1307, 1319, 1321, 1327, 1361, 1367, 1373], function( q ) {
		    if (NumberTheory.jacobiSymbol(a,q) == 1) {
			it("NumberTheory.squareRootMod(" + a.toString() + "," + (p*q).toString() + ") are all square roots", function(done) {
			    _.each( NumberTheory.squareRootMod(a,p*q), function(r) {
				expect((r * r) % (p * q)).to.equal(a % (p * q));
			    });
			    
			    done();
			});
		    }
		});
	    }
	});
    });

    _.each( [3,5,7,11,13,17,19,23,29], function(a) {
	_.each( [5,7,11,13,17], function(p) {
	    if (NumberTheory.jacobiSymbol(a,p) == 1) {
		_.each( [5,7,11,13,17], function(q) {
		    if (NumberTheory.jacobiSymbol(a,q) == 1) {
			_.each( [5,7,11,13,17], function(r) {
			    if (NumberTheory.jacobiSymbol(a,r) == 1) {
				_.each( [5,7,11,13,17], function(s) {
				    if (NumberTheory.jacobiSymbol(a,s) == 1) {	    		    			    			
					
					it("NumberTheory.squareRootMod(" + a.toString() + "," + (p*q*r*s).toString() + ") are all square roots", function(done) {
					    _.each( NumberTheory.squareRootMod(a,p*q*r*s), function(n) {
						expect((n * n) % (p * q * r * s)).to.equal(a % (p * q * r * s));
					    });
					    
					    done();
					});
				    }
				});
			    }
			});
		    }
		});
	    }
	});
    });
    
});
