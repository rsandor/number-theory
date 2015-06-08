'use strict';

/**
 * Multiply two numbers (up to 2^52) in Z mod m.  JavaScript numbers
 * are stored as floats, and Number.MAX_SAFE_INTEGER ==
 * 9007199254740991, so multiplication (a * b) % m works fine if the
 * modulus is less than sqrt(Number.MAX_SAFE_INTEGER) approx 94906265.
 * This routine gets around this barrier and permits the modulus to be
 * as large as 2^52 at the price of a loop.
 *
 * This is a modification of some code from Wikipedia, replacing
 * bitshifts with floating point arithmetic to avoid JavaScript's
 * coercing the floats back to 32-bit integers.
 *
 * @param {Number} an integer a (up to 2^52)
 * @param {Number} an integer b (up to 2^52)
 * @param {Number} a modulus m (up to 2^52)
 * @return {Number} the result of a * b mod m
 * @module number-theory
 * @author Jim Fowler
 */
module.exports = function multiplyMod(a, b, m) {
  // For small enough numbers, we can multiply without overflowing
  if ((a < 94906265) && (b < 94906265)) {
    return (a*b) % m;
  }

  var d = 0;

  // Bitshifts in javascript reduce everything to 32-bit ints, but with
  // division we can get 53-bit resolutions as a float
  var mp2 = m / 2;

  if (a >= m) a %= m;
  if (b >= m) b %= m;

  for (var i = 0; i < 53; i++) {
  	d = (d >= mp2) ? (2 * d - m) : (2 * d);

  	// Checking top bit (but I can't use bitwise operators without coercing down
  	// to 32 bits)
  	if (a >= 4503599627370496) {
      d += b;
      a = a - 4503599627370495;
  	}

  	if (d > m) {
      d -= m;
    }
  	a *= 2;
  }

  return d;
};
