'use strict';

/**
 * Number theory toolkit for JavaScript.
 * @author Ryan Sandor Richards (@rsandor)
 * @author Jim Fowler (@kisonecat)
 * @module number-theory
 */
module.exports = {
  divisors: require('./lib/divisors'),
  eulerPhi: require('./lib/euler_phi'),
  factor: require('./lib/factor'),
  findDivisor: require('./lib/find_divisor'),
  gcd: require('./lib/gcd'),
  incMixed: require('./lib/inc_mixed'),
  inverseMod: require('./lib/inverse_mod'),
  isPrime: require('./lib/is_prime'),
  isProbablyPrime: require('./lib/miller'),
  jacobiSymbol: require('./lib/jacobi_symbol'),
  logMod: require('./lib/log_mod'),
  miller: require('./lib/miller'),
  multiplyMod: require('./lib/multiply_mod'),
  powerMod: require('./lib/power_mod'),
  primeFactors: require('./lib/prime_factors'),
  primitiveRoot: require('./lib/primitive_root'),
  quadraticNonresidue: require('./lib/quadratic_nonresidue'),
  randomPrimitiveRoot: require('./lib/random_primitive_root'),
  sieve: require('./lib/sieve'),
  squareRootMod: require('./lib/square_root_mod'),
  squareRootModPrime: require('./lib/square_root_mod_prime')
};
