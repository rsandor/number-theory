'use strict';

var multiplyMod = require('./multiply_mod');
var powerMod = require('./power_mod');

/**
 * Deterministic miller-rabin primality test.
 * @param {Number} n Integer < 341,550,071,728,321 for which to test primality.
 * @return `true` if the number is prime, `false` otherwise.
 */
module.exports = function miller(n) {
  if (n < 2) return false;
  if (n == 2 || n == 3) return true;
  if (!(n & 1) || n % 3 == 0) return false;

  // Find n-1 = 2^s * d such that d is odd
  var d = n - 1;
  var s = 0;
  while( (d % 2) === 0 ) {
    d = d / 2;
    s = s + 1;
  }

  var witnesses;

  if (n < 1373653) {
    witnesses = [2, 3];
  } else if (n < 9080191) {
    witnesses = [31, 73];
  } else if (n < 4759123141) {
    witnesses = [2, 7, 61];
  } else if (n < 1122004669633) {
    witnesses = [2, 13, 23, 1662803];
  } else if (n < 2152302898747) {
    witnesses = [2, 3, 5, 7, 11];
  } else if (n < 3474749660383) {
    witnesses = [2, 3, 5, 7, 11, 13];
  } else {
    witnesses = [2, 3, 5, 7, 11, 13, 17];
  }

  for (var i = 0; i < witnesses.length; i++) {
    var a = witnesses[i];
    var x = powerMod(a, d, n);
    var y = 0;
    var q = s;
    while (q > 0) {
      y = multiplyMod( x, x, n );
      if (y === 1 && x !== 1 && x !== n - 1) { return false; }
      x = y;
			--q;
    }
    if (y !== 1) { return false; }
  }

  return true;
};
