'use strict';

/**
  * Determines whether an integer is 'octagonal'.
  * @param {Number} an integer x to test
  * @return {Boolean} Whether or not the x is octagonal.
  * @module number-theory
  * @author Kelly Innes
  */

module.exports = function isOctagonal(n) {
  return (((Math.sqrt((3 * n) + 1)) + 1) / 3) % 1 == 0;
};
