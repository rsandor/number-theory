'use strict';

/**
  * Determines whether an integer is 'square'.
  * Algorithm works by finding the 'square root' of an int,
  * then checking whether the result is a whole number.
  * See: https://en.wikipedia.org/wiki/Square_number
  *
  * @param {Number} an integer x to test
  * @return {Boolean} Whether or not the x is square.
  * @module number-theory
  * @author Kelly Innes
  */

module.exports = function isSquare(n) {
  return (Math.sqrt(n)) % 1 === 0;
};
