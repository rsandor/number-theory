'use strict';

/**
 * The Jacobi symbol generalizes the Legendre symbol (a on p); when a equiv
 * 0 mod p, (a on p) = 0, but otherwise (a on p) is +1 or -1 depending as to
 * whether there is or is not an integer r so that r^2 equiv a mod p.
 *
 * See: http://en.wikipedia.org/wiki/Jacobi_symbol
 * See also: http://en.wikipedia.org/wiki/Legendre_symbol
 *
 * @param {Number} a An integer.
 * @param {Number} b An integer b which factors into primes p_1 ... p_k
 * @return the product of the Legendre symbols (a on p_1) * ... * (a on p_k)
 */
module.exports = function jacobiSymbol(a,b) {
  if (b % 2 === 0) { return NaN };
  if (b < 0) { return NaN };

  // (a on b) is independent of equivalence class of a mod b
  if (a < 0) {
    a = ((a % b) + b);
  }

  // flips just tracks parity, so I xor terms with it and end up looking at the
  // low order bit
  var flips = 0;

  while(true) {
    a = a % b;

    // (0 on b) = 0
    if (a === 0) { return 0; }

    // Calculation of (2 on b)
  	while ((a % 2) === 0) {
      // b could be so large that b*b overflows
      flips ^= ((b % 8)*(b % 8) - 1)/8;
      a /= 2;
  	}

    // (1 on b) = 1
    if (a == 1) {
	    // look at the low order bit of flips to extract parity of total flips
	    return (flips & 1) ? (-1) : 1;
    }

  	// Now a and b are coprime and odd, so "QR" applies
  	// By reducing modulo 4, I avoid the possibility that (a-1)*(b-1) overflows
    flips ^= ((a % 4)-1) * ((b % 4)-1) / 4;

    var temp = a;
    a = b;
    b = temp;
  }

  // Cannot get here
  return NaN;
};
