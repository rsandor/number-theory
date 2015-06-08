'use strict';

/**
 * Number theoretic function library.
 * @author Ryan Sandor Richards
 * @module number-theory
 */
module.exports = {
  divisors: divisors,
  eulerPhi: eulerPhi,
  factor: factor,
  primeFactors: primeFactors,
  findDivisor: findDivisor,
  gcd: gcd,
  incMixed: incMixed,
  inverseMod: inverseMod,
  isPrime: isPrime,
  jacobiSymbol: jacobiSymbol,
  logMod: logMod,
  miller: miller,
  isProbablyPrime: miller,
  multiplyMod: multiplyMod,
  powerMod: powerMod,
  modpow: powerMod,
  primitiveRoot: primitiveRoot,
  quadraticNonresidue: quadraticNonresidue,
  randomPrimitiveRoot: randomPrimitiveRoot,
  sieve: sieve,
  squareRootModPrime: squareRootModPrime,
  squareRootMod: squareRootMod,
};

var _ = require('underscore');

var primes = sieve(100000);

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
 */
function multiplyMod( a, b, m ) {
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
}

/**
 * Given composite x with a small prime factor, Pollard's rho
 * algorithm often finds the small factor quickly.
 *
 * Modified from
 * http://userpages.umbc.edu/~rcampbel/NumbThy/Class/Programming/JavaScript
 *
 * @param {Number} a number x
 * @return {Number} a number dividing x (possibly 1).
 */
function findDivisor(x) {
  var numsteps = 2 * Math.floor( Math.sqrt( Math.sqrt(x) ) );
  var slow = 2;
  var fast = slow;
  var thegcd;
  for (var i = 1; i < numsteps; i++){
    slow = (slow * slow + 1) % x;
    fast = (fast * fast + 1) % x;
    fast = (fast * fast + 1) % x;
    thegcd = gcd(fast - slow, x);
    if (thegcd != 1) {
      return thegcd;
    }
  }
  return 1;
}

/**
 * Determines the prime factors for the given integer.
 * @param {Number} n Number to factor.
 * @return {Array} A list of prime factors and the powers of those factors.
 */
function factor(n) {
  if ((!primes) || (primes[primes.length - 1] < n)) {
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

  if (n > 1) {
    // Whatever remains, if it is not 1, must be prime
    factors.push( { prime: n, power: 1 } );
  }
  return factors;
}

/**
 * Returns the prime factors for a given number.
 * @param {Number} n Number for which to find the prime factors.
 * @return {Array} The prime factors of n.
 */
function primeFactors(n) {
  return factor(n).map(function (f) { return f.prime });
}

/**
 * Determines whether an integer is prime. Note this is a very slow method that
 * uses direct factoring from a sieve. For a faster primality check use the
 * `miller` method.
 * @param {Number} an integer x to test
 * @return {Boolean} Whether or not the x is prime.
 */
function isPrime(p) {
  var factors = factor(p);
  if (factors.length != 1) {
    return false;
  }
  return (factors[0].power === 1);
}

/**
 * Determines all of the divisors for a given number.
 * @param {Number} n Number for which to find the factors.
 * @return {Array} A list of all divisors for the given number.
 */
function divisors(n) {
  var factors = factor(n);
  var powers = factors.map(function (factor) {
    return 0;
  });
  var maxPowers = factors.map(function (factor) {
    return factor.power;
  });

  var divisors = [1];
  while (true) {
    powers = incMixed(powers, maxPowers);
    var d = powers.map(function (m, i) {
      return Math.pow(factors[i].prime, m);
    }).reduce(function (memo, curr) {
      return memo * curr;
    }, 1);
    if (d === 1) break;
    divisors.push(d);
  }

  divisors.sort(function (a, b) {
    return parseInt(a) - parseInt(b);
  });
  return divisors;
}

/**
 * Increment an n-dimensional tuple of integers representing a number with
 * mixed digit bases.
 *
 * @example
 * incMixed([0, 0], [1, 2]) // Returns [1, 0]
 * incMixed([1, 0], [1, 2]) // Returns [0, 1]
 * incMixed([0, 1], [1, 2]) // Returns [1, 1]
 * incMixed([1, 1], [1, 2]) // Returns [0, 2]
 * incMixed([0, 2], [1, 2]) // Returns [1, 2]
 * incMixed([1, 2], [1, 2]) // Returns [0, 0]
 *
 * @param {array} tuple A mixed base number.
 * @param {array} bases The bases for each of the "digit" entries in the tuple.
 * @return {array} The next number in the sequence.
 */
function incMixed(tuple, bases) {
  var result = tuple.map(function (value) { return value; });
  result[0]++;
  for (var k = 0; k < tuple.length; k++) {
    if (result[k] <= bases[k]) {
      break;
    }
    else if (k !== tuple.length - 1){
      result[k] = 0;
      result[k+1]++;
    }
    else {
      result[k] = 0;
    }
  }
  return result;
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
  if (a < 0) { a = -a; }
  if (b < 0) { b = -b; }
  while (true) {
    if (b === 0) { return a; }
    a %= b;
    if (a === 0) { return b; }
    b %= a;
  }
}

/**
 * Performs a power modulo some integer.
 * @param {Number} base Base for the power.
 * @param {Number} exponent Exponent of the power.
 * @param {Number} mod Modulus.
 * @return The base raised to the exponent power modulo the mod.
 */
function powerMod(base, exponent, mod) {
  if (exponent < 0) {
    return inverseMod(powerMod(base,-exponent,mod),mod);
  }

  var result = 1;
  base = base % mod;

  while (exponent > 0) {
    if (exponent % 2 == 1) {
      // Use modulus multiplication to avoid overflow
      result = multiplyMod(result, base, mod);
      exponent -= 1;
    }

    // using /2 instead of >>1 to work with numbers up to 2^52
    exponent /= 2;

    // Use modulus multiplication to avoid overflow
    base = multiplyMod(base, base, mod);
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
}

/**
 * Find an inverse for a modulo n.
 * See: http://en.wikipedia.org/wiki/Modular_multiplicative_inverse
 * @param {Number} a Integer relatively prime to n
 * @param {Number} n Integer modulus
 * @return an integer b so that a * b equv 1 mod n
 */
function inverseMod(a, n) {
  if (a < 0) {
    a = (a % n) + n;
  }

  var t = 0;
  var newt = 1;
  var r = n;
  var newr = a;

  while(newr !== 0) {
    var quotient = Math.floor(r/newr);
    var oldt = t;
    t = newt;
    newt = oldt - quotient * newt;

    var oldr = r;
    r = newr;
    newr = oldr - quotient * newr;
  }

  if(r > 1) { return NaN };

  return (t > 0) ? t : (t+n);
}

/**
 * Compute Euler's totient function phi. Computed via Euler's product formula,
 * see: http://en.wikipedia.org/wiki/Euler%27s_totient_function
 * @param {Number} n Integer for which to return the totient.
 * @return the number of positive integers less than or equal to n that are
 *   relatively prime to n.
 */
function eulerPhi(n) {
  var product = function (list) {
    return list.reduce(function (memo, number) {
      return memo * number;
    }, 1);
  };
  var factors = primeFactors(n);

  // Product{p-1} for all prime factors p
  var N = product(factors.map(function (p) { return p - 1; }))

  // Product{p} for all prime factors p
  var D = product(factors);

  // Compose the product formula and return
  return n * N / D;
}


/**
 * Find the smallest primitive root for Z mod n, meaning a multiplicative
 * generator for the group of units of Z mod n.
 *
 * See: http://en.wikipedia.org/wiki/Primitive_root_modulo_n
 *
 * @param {Number} modulus An integer > 2
 * @return an integer g so that every integer coprime to n is congruent to a
 *   power of g, modulo n.
 */
function primitiveRoot(modulus) {
  var phi_m = eulerPhi(modulus);
  var factors = primeFactors(phi_m);
  for (var x = 2; x < modulus; x++) {
    var check = _.every(factors, function(p) {
      return powerMod( x, phi_m / p, modulus ) != 1;
    })
    if (check) { return x; }
  }
  return NaN;
}

/**
 * Find a random primitive root for Z mod n, meaning a multiplicative generator
 * for the group of units of Z mod n. Unlike primitiveRoot, this function
 * returns a random primitive root.
 * @param {Number} modulus Integer for which to find the random primitive root.
 * @return {Number} An integer g so that every integer coprime to n is congruent
 *   to a power of g, modulo n.
 */
function randomPrimitiveRoot(modulus) {
  var g = primitiveRoot(modulus);
  var eulerPhiModulus = eulerPhi(modulus);
  for (var trials = 0; trials < 100; trials++) {
    var i = Math.floor( Math.random() * eulerPhiModulus );
    if (gcd(i, eulerPhiModulus) == 1) {
      return powerMod( g, i, modulus );
    }
  }
  return g;
}

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
function jacobiSymbol(a,b) {
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
}

/**
 * Find a quadratic nonresidue.
 * See: http://en.wikipedia.org/wiki/Quadratic_residue
 * @param {Number} p A prime number.
 * @return {Number} A number b so that there is no c with c^2 = b mod p
 */
function quadraticNonresidue(p) {
  for(var x = 2; x < p; x++) {
    if (jacobiSymbol(x, p) == -1) { return x; }
  }
  return NaN;
}

/**
 * Find a single square root in Z mod p using the Tonelli–Shanks algorithm.
 *
 * See: http://en.wikipedia.org/wiki/Tonelli%E2%80%93Shanks_algorithm
 *
 * @param {Number} m A quadratic residue
 * @param {Number} p A prime number
 * @return {Number} A number b so b^2 = n mod p.
 */
function squareRootModPrime(n,p) {
  if (jacobiSymbol(n,p) != 1) { return NaN; }

  var Q = p - 1;
  var S = 0;
  while( (Q % 2) === 0 ) {
    Q /= 2;
    S++;
  }

  // Now p - 1 = Q 2^S and Q is odd.
  if ((p % 4) == 3) {
  	return powerMod( n, (p+1)/4, p );
  }

  // So S != 1 (since in that case, p equiv 3 mod 4
  var z = quadraticNonresidue(p);
  var c = powerMod(z, Q, p);
  var R = powerMod(n, (Q+1)/2, p);
  var t = powerMod(n, Q, p);
  var M = S;

  while(true) {
    if ((t % p) == 1) return R;

    // Find the smallest i (0 < i < M) such that t^{2^i} = 1
    var u = t;
    for(var i = 1; i < M; i++) {
	    u = (u * u) % p;
	    if (u == 1) break;
    }

    var minimum_i = i;
    i++;

    // Set b = c^{2^{M-i-1}}
    var b = c;
    while( i < M ) {
	    b = (b * b) % p;
	    i++;
    }

  	M = minimum_i;
  	R = (R * b) % p;
  	t = (t * b * b) % p;
  	c = (b * b) % p;
  }

  return NaN;
};

/**
 * Find all square roots of a given number n modulo m.
 * @param {Number} n A quadratic residue
 * @param {Number} modulus A modulus
 * @return {Array} Representatives of all square roots of n modulo m.
 */
function squareRootMod(n, modulus) {
  var m = 1;
  var results = [0];

  factor(modulus).forEach(function (f) {
    var p = f.prime;
  	var exponent = f.power;
  	var s = squareRootModPrime( n, p );

  	// Chinese remainder theorem
  	var combined = [];
  	if (jacobiSymbol(n, p) != 1) { return []; }

    results.forEach(function (r) {
      // find a lift of r mod m and s mod p
      combined.unshift( r * p * inverseMod(p, m) + s * m * inverseMod(m, p) );
      combined.unshift( r * p * inverseMod(p, m) - s * m * inverseMod(m, p) );
    });

  	combined.sort();
  	results = _.unique(combined);

  	m = m * p;
  	var soFar = 1;
  	exponent--;

  	while (exponent > 0) {
      var q = Math.pow( p, Math.min( soFar, exponent ) );
      exponent -= Math.min( soFar, exponent );

      // Hensel's lemma
      // see: http://en.wikipedia.org/wiki/Hensel%27s_lemma
      results = results.map(function (r) {
        var A = -((r*r - n) / m);
        var B = inverseMod(2 * r, q);
        return r + m * multiplyMod(A, B, q);
      });

      m = m * q;
  	}
  });

  return results.map(function (r) {
    return ((r % modulus) + modulus) % modulus;
  });
};

var babyStepGiantStepTables = {}; // to cache the discrete log tables

/**
 * Solve the discrete log problem.
 * @param {Number} x An integer
 * @param {Number} generator A generator g of the group of units in Z mod
 *   modulus
 * @param {Number} modulus A modulus m
 * @return {Number} An integer k so that g^k equiv x mod m.
 */
function logMod(x, generator, modulus) {
  // normalize x to be positive
  x = ((x % modulus) + modulus) % modulus;

  var m = Math.ceil( Math.sqrt(modulus) );
  var hash = {};

  if (babyStepGiantStepTables[modulus] === undefined) {
    babyStepGiantStepTables[modulus] = {};
  }

  if (babyStepGiantStepTables[modulus][generator] === undefined) {
    babyStepGiantStepTables[modulus][generator] = {};
    hash = babyStepGiantStepTables[modulus][generator];
    for (var j = 0; j < m; j++) {
      // Compute generator^j and store the pair (j, generator^j) in the hash
      // table.
	    hash[powerMod( generator, j, modulus )] = j;
    }
  }
  else {
    hash = babyStepGiantStepTables[modulus][generator];
  }

  var generatorInverseM = powerMod( generator, -m, modulus );
  var location = x;

  for (var i = 0; i < m; i++) {
    // Check to see if location is the second component (generator^j) of any
    // pair in the table.
    if (hash[location] !== undefined) {
      // If so, return i*m + j.
	    return ( multiplyMod(i, m, modulus) + hash[location] ) % modulus;
	  }
    else {
      // If not, update location.
	    location = multiplyMod( location, generatorInverseM, modulus );
    }
  }

  return NaN;
}
