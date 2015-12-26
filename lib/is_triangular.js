'use strict';

/**
  * Determines whether an integer is 'triangular'.
  * @param {Number} an integer x to test
  * @return {Boolean} Whether or not the x is triangular.
  * @module number-theory
  * @author Kelly Innes
  */

module.exports = function isTriangular(n) {
  return (Math.sqrt((8 * n) + 1)) % 1 === 0;
};
