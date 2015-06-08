'use strict';

var factor = require('./factor');

/**
 * Returns the prime factors for a given number.
 * @param {Number} n Number for which to find the prime factors.
 * @return {Array} The prime factors of n.
 */
module.exports = function primeFactors(n) {
  return factor(n).map(function (f) { return f.prime });
};
