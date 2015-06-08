'use strict';

var powerMod = require('./power_mod');
var multiplyMod = require('./multiply_mod');

// Cache for the discrete log tables
var babyStepGiantStepTables = {};

/**
 * Solves the discrete log problem.
 *
 * See:
 * http://en.wikipedia.org/wiki/Discrete_logarithm
 * http://en.wikipedia.org/wiki/Baby-step_giant-step
 * 
 * @param {Number} x An integer
 * @param {Number} g A generator of the group of units in Z mod modulus
 * @param {Number} modulus A modulus
 * @return {Number} An integer k so that g^k equiv x mod m.
 * @module number-theory
 */
module.exports = function logMod(x, g, modulus) {
  // normalize x to be positive
  x = ((x % modulus) + modulus) % modulus;

  var m = Math.ceil( Math.sqrt(modulus) );
  var hash = {};

  if (babyStepGiantStepTables[modulus] === undefined) {
    babyStepGiantStepTables[modulus] = {};
  }

  if (babyStepGiantStepTables[modulus][g] === undefined) {
    babyStepGiantStepTables[modulus][g] = {};
    hash = babyStepGiantStepTables[modulus][g];
    for (var j = 0; j < m; j++) {
      // Compute g^j and store the pair (j, g^j) in the hash
      // table.
	    hash[powerMod( g, j, modulus )] = j;
    }
  }
  else {
    hash = babyStepGiantStepTables[modulus][g];
  }

  var generatorInverseM = powerMod( g, -m, modulus );
  var location = x;

  for (var i = 0; i < m; i++) {
    // Check to see if location is the second component (g^j) of any
    // pair in the table.
    if (hash[location] !== undefined) {
      // If so, return i*m + j.
	    return ( multiplyMod(i, m, modulus) + hash[location] ) % modulus;
	  }
    else {
      // If not, update location.
	    location = multiplyMod( location, generatorInverseM, modulus );
    }
  }

  return NaN;
};
