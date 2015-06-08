'use strict';

var jacobiSymbol = require('./jacobi_symbol');

/**
 * Find a quadratic nonresidue.
 * See: http://en.wikipedia.org/wiki/Quadratic_residue
 * @param {Number} p A prime number.
 * @return {Number} A number b so that there is no c with c^2 = b mod p
 */
module.exports = function quadraticNonresidue(p) {
  for(var x = 2; x < p; x++) {
    if (jacobiSymbol(x, p) == -1) { return x; }
  }
  return NaN;
};
