'use strict';

var factor = require('./factor');

/**
 * Compute the Mobius function
 * @param {Number} n argument to compute
 * @return The value of the mobius function for n
 * @module number-theory
 * @author Ricky Reusser
 */
module.exports = function mobius (n) {
  // Handle zero (perhaps undefined in some sense, but this value
  // matches Wolfram Alpha):
  if (n === 0) {
    return 0;
  }

  // Factor the absolute value so that negative numbers are
  // permissible:
  var factors = factor(Math.abs(n));

  // Return zero if any factor has power > 1:
  for (var i = 0; i < factors.length; i++) {
    if (factors[i].power > 1) {
      return 0;
    }
  }

  // Otherwise return 2 if even:
  if (factors.length % 2 === 0) {
    return 1;
  } else {
    return -1;
  }
}
