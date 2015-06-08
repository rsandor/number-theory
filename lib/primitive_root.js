'use strict';

var _ = require('underscore');

var eulerPhi = require('./euler_phi');
var primeFactors = require('./prime_factors');
var powerMod = require('./power_mod');

/**
 * Find the smallest primitive root for Z mod n, meaning a multiplicative
 * generator for the group of units of Z mod n.
 *
 * See: http://en.wikipedia.org/wiki/Primitive_root_modulo_n
 *
 * @param {Number} modulus An integer > 2
 * @return an integer g so that every integer coprime to n is congruent to a
 *   power of g, modulo n.
 */
module.exports = function primitiveRoot(modulus) {
  var phi_m = eulerPhi(modulus);
  var factors = primeFactors(phi_m);
  for (var x = 2; x < modulus; x++) {
    var check = _.every(factors, function(p) {
      return powerMod( x, phi_m / p, modulus ) != 1;
    })
    if (check) { return x; }
  }
  return NaN;
};
