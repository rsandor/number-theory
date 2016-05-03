'use strict';

var gcd = require('./gcd');

/**
 * Finds the least common multiple between two integers.
 * @param {Number} a First integer.
 * @param {Number} b Second integer.
 * @return The lcm of a and b.
 * @module number-theory
 * @author Ricky Reusser
 */
module.exports = function lcm(a, b) {
  return a * b / gcd(a, b);
};
