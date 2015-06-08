'use strict';

var primeFactors = require('./prime_factors');

/**
 * Compute Euler's totient function phi. Computed via Euler's product formula,
 * see: http://en.wikipedia.org/wiki/Euler%27s_totient_function
 * @param {Number} n Integer for which to return the totient.
 * @return the number of positive integers less than or equal to n that are
 *   relatively prime to n.
 */
module.exports = function eulerPhi(n) {
  var product = function (list) {
    return list.reduce(function (memo, number) {
      return memo * number;
    }, 1);
  };
  var factors = primeFactors(n);

  // Product{p-1} for all prime factors p
  var N = product(factors.map(function (p) { return p - 1; }))

  // Product{p} for all prime factors p
  var D = product(factors);

  // Compose the product formula and return
  return n * N / D;
};
