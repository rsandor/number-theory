'use strict';

/**
 * Number theoretic function library.
 * @author Ryan Sandor Richards
 * @module number-theory
 */
module.exports = {
  miller: miller,
  modpow: modpow,
  gcd: gcd,
  sieve: sieve,
  factor: factor
};

var primes = sieve(1000000);

function factor(n) {
  if (!primes || primes[primes.length - 1] < n) {
    primes = sieve(n);
  }

  var factors = [];

  for (var k = 0; k < primes.length && n > 1; k++) {
    var p = primes[k];
    if (n % p === 0) {
      var factor = { prime: p, power: 0 };
      while (n % p === 0) {
        factor.power++;
        n /= p;
      }
      factors.push(factor);
    }
  }

  return factors;
}



/**
 * Sieves primes from 1 to the given number.
 * @param {Number} n Upper bound for the sieve.
 * @return {Array} A list of primes between 1 and n.
 */
function sieve(n) {
  var numbers = new Array(n);

  for (var i = 0; i < n; i++) {
    numbers[i] = true;
  }

  for (var i = 2; i < Math.sqrt(n); i++) {
    for (var j = i*i; j < n; j += i) {
      numbers[j] = false;
    }
  }

  var primes = [];
  for (var i = 2; i < n; i++) {
    if (numbers[i]) {
      primes.push(i);
    }
  }

  return primes;
}

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
  if (!(n & 1) || n % 3 == 0) return false;

  // Find n-1 = 2^s * d such that d is odd
  var d = (n / 2)|0;
  var s = 1;
  while (!(d & 1)) { d = d >> 1; s++; }

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
    var x = modpow(a, d, n);
    var y = 0;
    var q = s;
    while (q > 0) {
      y = (x * x) % n;
      if (y === 1 && x !== 1 && x !== n - 1) {
        return false;
      }
      x = y;
			--q;
    }
    if (y !== 1) return false;
  }

	return true;
}
