'use strict';

var jacobiSymbol = require('./jacobi_symbol');
var powerMod = require('./power_mod');
var quadraticNonresidue = require('./quadratic_nonresidue');

/**
 * Find a single square root in Z mod p using the Tonelli–Shanks algorithm.
 *
 * See: http://en.wikipedia.org/wiki/Tonelli%E2%80%93Shanks_algorithm
 *
 * @param {Number} m A quadratic residue
 * @param {Number} p A prime number
 * @return {Number} A number b so b^2 = n mod p.
 * @module number-theory
 * @author Jim Fowler
 */
module.exports = function squareRootModPrime(n, p) {
  if (jacobiSymbol(n,p) != 1) { return NaN; }

  var Q = p - 1;
  var S = 0;
  while( (Q % 2) === 0 ) {
    Q /= 2;
    S++;
  }

  // Now p - 1 = Q 2^S and Q is odd.
  if ((p % 4) == 3) {
  	return powerMod( n, (p+1)/4, p );
  }

  // So S != 1 (since in that case, p equiv 3 mod 4
  var z = quadraticNonresidue(p);
  var c = powerMod(z, Q, p);
  var R = powerMod(n, (Q+1)/2, p);
  var t = powerMod(n, Q, p);
  var M = S;

  while(true) {
    if ((t % p) == 1) return R;

    // Find the smallest i (0 < i < M) such that t^{2^i} = 1
    var u = t;
    for(var i = 1; i < M; i++) {
	    u = (u * u) % p;
	    if (u == 1) break;
    }

    var minimum_i = i;
    i++;

    // Set b = c^{2^{M-i-1}}
    var b = c;
    while( i < M ) {
	    b = (b * b) % p;
	    i++;
    }

  	M = minimum_i;
  	R = (R * b) % p;
  	t = (t * ((b * b) % p)) % p;
  	c = (b * b) % p;
  }

  return NaN;
};
