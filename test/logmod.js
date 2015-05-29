'use strict';

var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = require('code').expect;

var NumberTheory = require('../index');
var _ = require('underscore');

describe('discrete log', function () {
    var primesGeneratedBy = {
	17: [50111, 51241, 51481, 52009, 52081, 52201, 52321, 53759, 56809, 58439, 59809],
	2: [5179, 5189, 5227, 5261, 5309, 5333, 5387, 5443, 5477, 5483, 5501, 179424779],
	31: [53089, 53881],
	29: [46489, 47041, 47881]
    };
    
    _.each( _.keys( primesGeneratedBy ), function( base ) {
	_.each( primesGeneratedBy[base], function(modulus) {
	    _.each( [100, 200, 300, 400, 234, 1, 10, 17, 137, -1, -2, -3, -4], function(goal) {
		it(base.toString() + "**(log_" + base.toString() + " " + goal.toString() + " mod " + modulus.toString() + ") equiv " + goal.toString() + " mod " + modulus.toString(), function (done) {
		    expect(NumberTheory.powerMod(base, NumberTheory.logMod(goal, base, modulus), modulus)).to.equal((goal + modulus) % modulus);
		    done();
		});
	    });
	});
    });

});
