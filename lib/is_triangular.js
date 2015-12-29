'use strict';

/**
  * Determines whether an integer is 'triangular'.
  * Algorithm works by finding the 'triangular root' of an int,
  * then checking whether the result is a whole number.
  * See: https://en.wikipedia.org/wiki/Triangular_number
  *
  * @param {Number} an integer x to test
  * @return {Boolean} Whether or not the x is triangular.
  * @module number-theory
  * @author Kelly Innes
  */

module.exports = function isTriangular(n) {
  return (Math.sqrt((8 * n) + 1)) % 1 === 0;
};
