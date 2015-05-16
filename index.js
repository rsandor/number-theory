'use strict';

/**
 * Number theoretic function library.
 * @author Ryan Sandor Richards
 * @module number-theory
 */
module.exports = {
  miller: miller,
  modpow: modpow,
  gcd: gcd
};

/**
 * Finds the greatest common divisor between two integers.
 * @param {Number} a First integer.
 * @param {Number} b Second integer.
 * @return The gcd of a and b.
 */
function gcd(a, b) {
	if (b == 0) return a;
	return gcd(b, a % b);
}

/**
 * Performs a power modulo some integer.
 * @param {Number} base Base for the power.
 * @param {Number} exponent Exponent of the power.
 * @param {Number} mod Modulus.
 * @return The base raised to the exponent power modulo the mod.
 */
function modpow(base, exponent, mod) {
	var result = 1;
	base = base % mod;
	while (exponent > 0) {
		if (exponent % 2 == 1)
			result = (result * base) % mod;
		exponent = exponent >> 1;
		base = (base * base) % mod;
	}
	return result;
}

/**
 * Deterministic miller-rabin primality test.
 * @param {Number} n Integer < 341,550,071,728,321 for which to test primality.
 * @return `true` if the number is prime, `false` otherwise.
 */
function miller(n) {
  if (n < 2) return false;
  if (n == 2 || n == 3) return true;
  if (!(n & 1) || n% 3 == 0) return false;

  // Find n-1 = 2^s * d such that d is odd
  var d = n / 2;
  var s = 1;
  while (!(d & 1)) { d /= 2; s++; }

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

  var size = witnesses.length;

  for (var i = 0; i < size; i++) {
    var a = witnesses[i];
    var x = modpow(a, d, n);
    var y = 0;
    var q = s;
    while (q) {
      y = (x * x) % n;
      if (y == 1 && x != 1 && x != n - 1) {
        return false;
      }
      x = y;
			--q;
    }
    if (y != 1) return false;
  }

	return true;
}
