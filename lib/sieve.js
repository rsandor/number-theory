'use strict';

/**
 * Sieves primes from 1 to the given number.
 * @param {Number} n Upper bound for the sieve.
 * @return {Array} A list of primes between 1 and n.
 * @module number-theory
 * @author Ryan Sandor Richards
 */
module.exports = function sieve(n) {
  var numbers = new Array(n);

  for (var i = 0; i < n; i++) {
    numbers[i] = true;
  }

  for (var i = 2; i < Math.sqrt(n); i++) {
    for (var j = i*i; j < n; j += i) {
      numbers[j] = false;
    }
  }

  var primes = [];
  for (var i = 2; i < n; i++) {
    if (numbers[i]) {
      primes.push(i);
    }
  }

  return primes;
};
