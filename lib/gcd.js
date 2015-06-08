'use strict';

/**
 * Finds the greatest common divisor between two integers.
 * @param {Number} a First integer.
 * @param {Number} b Second integer.
 * @return The gcd of a and b.
 * @module number-theory
 * @author Ryan Sandor Richards, Jim Fowler
 */
module.exports = function gcd(a, b) {
  if (a < 0) { a = -a; }
  if (b < 0) { b = -b; }
  while (true) {
    if (b === 0) { return a; }
    a %= b;
    if (a === 0) { return b; }
    b %= a;
  }
};
