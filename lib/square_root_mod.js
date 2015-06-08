'use strict';

var _ = require('underscore');

var factor = require('./factor');
var squareRootModPrime = require('./square_root_mod_prime');
var jacobiSymbol = require('./jacobi_symbol');
var inverseMod = require('./inverse_mod');
var multiplyMod = require('./multiply_mod');

/**
 * Find all square roots of a given number n modulo m.
 * @param {Number} n A quadratic residue
 * @param {Number} modulus A modulus
 * @return {Array} Representatives of all square roots of n modulo m.
 */
module.exports = function squareRootMod(n, modulus) {
  var m = 1;
  var results = [0];

  factor(modulus).forEach(function (f) {
    var p = f.prime;
  	var exponent = f.power;
  	var s = squareRootModPrime( n, p );

  	// Chinese remainder theorem
  	var combined = [];
  	if (jacobiSymbol(n, p) != 1) { return []; }

    results.forEach(function (r) {
      // find a lift of r mod m and s mod p
      combined.unshift( r * p * inverseMod(p, m) + s * m * inverseMod(m, p) );
      combined.unshift( r * p * inverseMod(p, m) - s * m * inverseMod(m, p) );
    });

  	combined.sort();
  	results = _.unique(combined);

  	m = m * p;
  	var soFar = 1;
  	exponent--;

  	while (exponent > 0) {
      var q = Math.pow( p, Math.min( soFar, exponent ) );
      exponent -= Math.min( soFar, exponent );

      // Hensel's lemma
      // see: http://en.wikipedia.org/wiki/Hensel%27s_lemma
      results = results.map(function (r) {
        var A = -((r*r - n) / m);
        var B = inverseMod(2 * r, q);
        return r + m * multiplyMod(A, B, q);
      });

      m = m * q;
  	}
  });

  return results.map(function (r) {
    return ((r % modulus) + modulus) % modulus;
  });
};
