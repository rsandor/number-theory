'use strict';

var powerMod = require('./power_mod');
var multiplyMod = require('./multiply_mod');

// Cache for the discrete log tables
var babyStepGiantStepTables = {};

/**
 * Solve the discrete log problem.
 * @param {Number} x An integer
 * @param {Number} generator A generator g of the group of units in Z mod
 *   modulus
 * @param {Number} modulus A modulus m
 * @return {Number} An integer k so that g^k equiv x mod m.
 */
module.exports = function logMod(x, generator, modulus) {
  // normalize x to be positive
  x = ((x % modulus) + modulus) % modulus;

  var m = Math.ceil( Math.sqrt(modulus) );
  var hash = {};

  if (babyStepGiantStepTables[modulus] === undefined) {
    babyStepGiantStepTables[modulus] = {};
  }

  if (babyStepGiantStepTables[modulus][generator] === undefined) {
    babyStepGiantStepTables[modulus][generator] = {};
    hash = babyStepGiantStepTables[modulus][generator];
    for (var j = 0; j < m; j++) {
      // Compute generator^j and store the pair (j, generator^j) in the hash
      // table.
	    hash[powerMod( generator, j, modulus )] = j;
    }
  }
  else {
    hash = babyStepGiantStepTables[modulus][generator];
  }

  var generatorInverseM = powerMod( generator, -m, modulus );
  var location = x;

  for (var i = 0; i < m; i++) {
    // Check to see if location is the second component (generator^j) of any
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
