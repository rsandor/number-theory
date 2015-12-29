# number-theory

A number theory toolkit for JavaScript.

## Functions

### divisors(n)
Determines all of the [divisors](http://en.wikipedia.org/wiki/Divisor) for a
given number.

```js
var divisors = require('number-theory').divisors;
divisors(6); // Returns [1, 2, 3, 6]
```

### eulerPhi(n), totient(n)
Counts the positive integers less than a given number that are
[co-prime](http://en.wikipedia.org/wiki/Coprime_integers) with
the given number. For more information see the Wikipedia entry for
[Euler's Totient Function](http://en.wikipedia.org/wiki/Euler%27s_totient_function).

```js
var phi = require('number-theory').eulerPhi;
phi(26); // Returns 12
```

### factor(n)
Determines the prime factorization for a given integer. For more information see
Wikipedia's [Integer Factorization](http://en.wikipedia.org/wiki/Integer_factorization)
entry.

```js
var factor = require('number-theory').factor;

/*
  Returns: [
    {  prime: 2, power: 2 },
    { prime: 3, power: 1 },
    { prime: 11, power: 1 }
  ]
*/
factor(132);
```

### findDivisor(n)
Uses the [Pollard-Rho](http://en.wikipedia.org/wiki/Pollard%27s_rho_algorithm)
integer factorization algorithm to quickly find a small divisor of the given
number. Note: the divisor found need not be prime (as Pollar-Rho is a general
integer factorization algorithm).

```js
var findDivisor = require('number-theory').findDivisor;
findDivisor(152); // Returns 8
```

### gcd(a, b)
Finds the [greatest common divisor](http://en.wikipedia.org/wiki/Greatest_common_divisor)
of two integers a and b.

```js
var gcd = require('number-theory').gcd;
gcd(84, 172); // Returns 4
```

### incMixed(tuple, bases)
Given a mixed-radix number and the bases for each digit, this determines the
increment of the number. For more information, see Wikipedia's entry on
[Mixed Radix](http://en.wikipedia.org/wiki/Mixed_radix) number systems.

```js
var incMixed = require('number-theory').incMixed;

// A number representing a mixed-radix "clock" at 11:59 PM
var number = [59, 59, 23];

// The bases for each of the mixed radix digits (60 seconds to a minute,
// 60 minutes to an hour, 24 hours to a day).
var base = [60, 60, 24];

incMixed(number, base); // Returns [0, 0, 0] (or midnight the next day)
```

### inverseMod(a, m)
Given an integer this function computes the
[modular multiplicative inverse](http://en.wikipedia.org/wiki/Modular_multiplicative_inverse)
to the given modulo.

```js
var inverseMod = require('number-theory').inverseMod;
inverseMod(14, 17); // Returns 11
```

### isAbundant(n)
Given an integer, returns a Boolean indicating whether it's an [abundant number](https://en.wikipedia.org/wiki/Abundant_number).

```js
var isAbundant = require('number-theory').isAbundant;
isAbundant(36); // Returns true
isAbundant(35); // Returns false
```

### isDeficient(n)
Given an integer, returns a Boolean indicating whether it's a [deficient number](https://en.wikipedia.org/wiki/Deficient_number).

```js
var isDeficient = require('number-theory').isDeficient;
isDeficient(15); // Returns true
isDeficient(12); // Returns false
```

### isHeptagonal(n)
Given an integer, returns a Boolean indicating whether it's a [heptagonal number](https://en.wikipedia.org/wiki/Heptagonal_number).

```js
var isHeptagonal = require('number-theory').isHeptagonal;
isHeptagonal(112); // Returns true
isHeptagonal(175); // Returns false
```

### isHexagonal(n)
Given an integer, returns a Boolean indicating whether it's a [hexagonal number](https://en.wikipedia.org/wiki/Hexagonal_number).

```js
var isHexagonal = require('number-theory').isHexagonal;
isHexagonal(190); // Returns true
isHexagonal(50); // Returns false
```

### isOctagonal(n)
Given an integer, returns a Boolean indicating whether it's an [octagonal number](https://en.wikipedia.org/wiki/Octagonal_number).

```js
var isOctagonal = require('number-theory').isOctagonal;
isOctagonal(65); // Returns true
isOctaongal(50); // Returns false
```

### isPentagonal(n)
Given an integer, returns a Boolean indicating whether it's a [pentagonal number](https://en.wikipedia.org/wiki/Pentagonal_number).

```js
var isPentagonal = require('number-theory').isPentagonal;
isPentagonal(92); // Returns true
isPentagona(50); // Returns false
```

### isPerfect(n)
Given an integer, returns a Boolean indicating whether it's a [perfect number](https://en.wikipedia.org/wiki/Perfect_number).

```js
var isPerfect = require('number-theory').isPerfect;
isPerfect(496); // Returns true
isPerfect(200); // Returns false
```

### isPrime(n)
Determines if the given number is [prime](http://en.wikipedia.org/wiki/Prime_number).
Note: this is a particularly slow method that uses full prime factorization to
determine if the number is prime. For a faster method see the `miller` function
below.

```js
var isPrime = require('number-theory').isPrime;
isPrime(7); // Returns true
isPrime(48); // Returns false
```

### isSquare(n)
Given an integer, returns a Boolean indicating whether it's a [square number](https://en.wikipedia.org/wiki/Square_number).

```js
var isSquare = require('number-theory').isSquare;
isSquare(16); // Returns true
isSquare(55); // Returns false
```

### isTriangular(n)
Given an integer, returns a Boolean indicating whether it's a [triangular number](https://en.wikipedia.org/wiki/Triangular_number).

```js
var isTriangular = require('number-theory').isTriangular;
isTriangular(21); // Returns true
isTriangular(25); // Returns false
```

### jacobiSymbol(a, b)
Computes the [Jacobi Symbol](http://en.wikipedia.org/wiki/Jacobi_symbol) for the
given numbers.

```js
var jacobiSymbol = require('number-theory').jacobiSymbol;
jacobiSymbol(928, 33); // returns 1
```

### logMod(a, b, m)
Solves a discrete logarithm. For more information see the following:

* [Discrete Lograrithm](http://en.wikipedia.org/wiki/Discrete_logarithm)
* [Baby-step Giant-step algorithm](http://en.wikipedia.org/wiki/Baby-step_giant-step)

### miller(n), isProbablyPrime(n)
Uses the determinisic [Miller-Rabin Primality Test](http://en.wikipedia.org/wiki/Miller%E2%80%93Rabin_primality_test)
to determine if the given number is prime. Works for all positive integers less
than 341,550,071,728,321.

```js
var miller = require('number-theory').miller;
miller(17); // Returns true
miller(284); // Returns false
```

### multiplyMod(a, b, m)
Multiplies the two given numbers mod the given modulus. See Wikipedia's entry
on [Modular Arithmetic](http://en.wikipedia.org/wiki/Modular_arithmetic).

```js
var multiplyMod = require('number-theory').multiplyMod;
multiplyMod(928, 284, 18); // Returns 14
```

### powerMod(base, exponent, mod)
Computes the power of a base mod the given modulus. For more information see
Wikipedia's entry on [Modular Exponentiation](http://en.wikipedia.org/wiki/Modular_exponentiation).

```js
var powerMod = require('number-theory').powerMod;
powerMod(567283, 2843, 776); // Returns 299
```

### primeFactors(n)
Computes a list of all prime factors for the given integer. Note: while this
method fully computes the prime factorization of the integer, it only returns
the primes and not the powers of the factorization. For full prime factorization
please use `factor`.

```js
var primeFactors = require('number-theory').primeFactors;
primeFactors(18); // Returns [2, 3]
```

### primitiveRoot(m)
Computes the smallest primitive root for Z mod n, meaning a multiplicative
generator for the group of units of Z mod n. For more information see
Wikipedia's entry on [Primitive roots modulo n](http://en.wikipedia.org/wiki/Primitive_root_modulo_n).

```js
var primitiveRoot = require('number-theory').primitiveRoot;
primitiveRoot(1043); // Returns 7
```

### quadraticNonresidue(p)
Computes a quadratic nonresidue for the given number. For more information see
Wikipedia's entry for [Quadratic Residues](http://en.wikipedia.org/wiki/Quadratic_residue).

```js
var quadraticNonresidue = require('number-theory').quadraticNonresidue;
quadraticNonresidue(777); // Returns 5
```

### randomPrimitiveRoot(m)
Find a random primitive root for Z mod n, meaning a multiplicative generator for
the group of units of Z mod n. Unlike primitiveRoot, this function returns a
random primitive root. For more information see Wikipedia's entry on
[Primitive roots modulo n](http://en.wikipedia.org/wiki/Primitive_root_modulo_n).

### sieve(n)
Determines a list of prime numbers up to the given bound by performing the
[Sieve of Eratosthenes](http://en.wikipedia.org/wiki/Sieve_of_Eratosthenes).

```js
var sieve = require('number-theory').sieve;
sieve(10); // Returns [ 2, 3, 5, 7 ]
```

### squareRootMod(n, m)
Determines all square roots of a given number modulo the given modulus. For more
information see Wikipedia's entry on [Quadratic Residues](http://en.wikipedia.org/wiki/Quadratic_residue).

```js
var squareRootMod = require('number-theory').squareRootMod;
squareRootMod(1023, 77); // Returns [76, 1]
```

### squareRootModPrime(n, p)
Uses the [Tonelli–Shanks algorithm](http://en.wikipedia.org/wiki/Tonelli%E2%80%93Shanks_algorithm)
to determine a single square root in Z mod p.

```js
var squareRootModPrime = require('number-theory').squareRootModPrime;
squareRootModPrime(100, 19) // Returns 9
```

## Contributing

Pull requests are very welcome! If you see a function we're missing, have an
alternate algorithm implementation, or even want to add a special case function
we'd be delighted to review your code.

Try to stick to the following guidelines, as they will help get the PR merged
and published quickly:

* New functions should be added to their own file under the `lib/` directory
* Make sure to add an entry in the `module.exports` for new functions in the
  `index.js` file.
* Use two space characters per tab
* Please document your function using [jsdoc](https://github.com/jsdoc3/jsdoc)
  (see any function in `lib/` for an example on how to do this).
* Write a test for your function and place it in the `tests/` folder with the
  same name that you gave for its `lib/` counterpart.
* Add an entry to the documentation in this file (`README.md`). Also please try
  to keep the function list alphabetized for quick reference.

Thanks!

## License
MIT
