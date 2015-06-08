'use strict';

var primitiveRoot = require('./primitive_root');
var eulerPhi = require('./euler_phi');
var gcd = require('./gcd');
var powerMod = require('./power_mod');

/**
 * Find a random primitive root for Z mod n, meaning a multiplicative generator
 * for the group of units of Z mod n. Unlike primitiveRoot, this function
 * returns a random primitive root.
 * @param {Number} modulus Integer for which to find the random primitive root.
 * @return {Number} An integer g so that every integer coprime to n is congruent
 *   to a power of g, modulo n.
 */
module.exports = function randomPrimitiveRoot(modulus) {
  var g = primitiveRoot(modulus);
  var eulerPhiModulus = eulerPhi(modulus);
  for (var trials = 0; trials < 100; trials++) {
    var i = Math.floor( Math.random() * eulerPhiModulus );
    if (gcd(i, eulerPhiModulus) == 1) {
      return powerMod( g, i, modulus );
    }
  }
  return g;
};
