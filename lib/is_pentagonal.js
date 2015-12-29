'use strict';

/**
  * Determines whether an integer is 'pentagonal'.
  * Algorithm works by finding the 'pentagonal root' of an int,
  * then checking whether the result's a whole number.
  * See: https://en.wikipedia.org/wiki/Pentagonal_number
  *
  * @param {Number} an integer x to test
  * @return {Boolean} Whether or not the x is pentagonal.
  * @module number-theory
  * @author Kelly Innes
  */

module.exports = function isPentagonal(n) {
  return ((Math.sqrt((24 * n) + 1) + 1) / 6) % 1 === 0;
};
