'use strict';

var factor = require('./factor');

/**
 * Determines whether an integer is prime. Note this is a very slow method that
 * uses direct factoring from a sieve. For a faster primality check use the
 * `miller` method.
 * @param {Number} an integer x to test
 * @return {Boolean} Whether or not the x is prime.
 */
module.exports = function isPrime(p) {
  var factors = factor(p);
  if (factors.length != 1) {
    return false;
  }
  return (factors[0].power === 1);
};
