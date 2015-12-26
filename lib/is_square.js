'use strict';

/**
  * Determines whether an integer is 'square'.
  * @param {Number} an integer x to test
  * @return {Boolean} Whether or not the x is square.
  * @module number-theory
  * @author Kelly Innes
  */

module.exports = function isSquare(n) {
  return (Math.sqrt(n)) % 1 === 0;
};
