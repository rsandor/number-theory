'use strict';

var multiplyMod = require('./multiply_mod');
var inverseMod = require('./inverse_mod');

/**
 * Performs a power modulo some integer.
 * @param {Number} base Base for the power.
 * @param {Number} exponent Exponent of the power.
 * @param {Number} mod Modulus.
 * @return The base raised to the exponent power modulo the mod.
 * @module number-theory
 * @author Ryan Richards, Jim Fowler
 */
module.exports = function powerMod(base, exponent, mod) {
  if (exponent < 0) {
    return inverseMod(powerMod(base,-exponent,mod),mod);
  }

  var result = 1;
  base = base % mod;

  while (exponent > 0) {
    if (exponent % 2 == 1) {
      // Use modulus multiplication to avoid overflow
      result = multiplyMod(result, base, mod);
      exponent -= 1;
    }

    // using /2 instead of >>1 to work with numbers up to 2^52
    exponent /= 2;

    // Use modulus multiplication to avoid overflow
    base = multiplyMod(base, base, mod);
  }
  return result;
};
