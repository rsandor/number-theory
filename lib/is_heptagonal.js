'use strict';

/**
  * Determines whether an integer is 'heptagonal'.
  * Algorithm works by finding the 'heptagonal root' of an int,
  * then checking whether that root is a whole number.
  * See: https://en.wikipedia.org/wiki/Heptagonal_number
  *
  * @param {Number} an integer x to test
  * @return {Boolean} Whether or not the x is heptagonal.
  * @module number-theory
  * @author Kelly Innes
  */

module.exports = function isHeptagonal(n) {
  return (((Math.sqrt((40 * n) + 9)) + 3) / 10) % 1 === 0;
};
