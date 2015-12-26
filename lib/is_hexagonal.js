'use strict';

/**
  * Determines whether an integer is 'hexagonal'.
  * @param {Number} an integer x to test
  * @return {Boolean} Whether or not the x is hexagonal.
  * @module number-theory
  * @author Kelly Innes
  */

module.exports = function isHexagonal(n) {
  return ((Math.sqrt((8 * n) + 1) + 1) / 4) % 1 === 0;
};
