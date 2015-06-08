'use strict';

var sieve = require('./sieve');
var primes = sieve(100000);

/**
 * Factors a given integer.
 * @param {Number} n Number to factor.
 * @return {Array} A list of prime factors and the powers of those factors.
 * @module number-theory
 * @author Ryan Sandor Richards, Jim Fowler
 */
module.exports = function factor(n) {
  if ((!primes) || (primes[primes.length - 1] < n)) {
    primes = sieve(n);
  }

  var factors = [];
  for (var k = 0; k < primes.length && n > 1; k++) {
    var p = primes[k];
  	if (n % p === 0) {
	    var factor = { prime: p, power: 0 };
	    while (n % p === 0) {
        factor.power++;
        n /= p;
      }
      factors.push(factor);
    }
  }

  if (n > 1) {
    // Whatever remains, if it is not 1, must be prime
    factors.push( { prime: n, power: 1 } );
  }
  return factors;
};
