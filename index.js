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
  lcm: require('./lib/lcm'),
  incMixed: require('./lib/inc_mixed'),
  inverseMod: require('./lib/inverse_mod'),
  isAbundant: require('./lib/is_abundant'),
  isDeficient: require('./lib/is_deficient'),
  isHeptagonal: require('./lib/is_heptagonal'),
  isHexagonal: require('./lib/is_hexagonal'),
  isOctagonal: require('./lib/is_octagonal'),
  isPentagonal: require('./lib/is_pentagonal'),
  isPerfect: require('./lib/is_perfect'),
  isPrime: require('./lib/is_prime'),
  isProbablyPrime: require('./lib/miller'),
  isSquare: require('./lib/is_square'),
  isTriangular: require('./lib/is_triangular'),
  jacobiSymbol: require('./lib/jacobi_symbol'),
  logMod: require('./lib/log_mod'),
  miller: require('./lib/miller'),
  mobius: require('./lib/mobius'),
  mobiusRange: require('./lib/mobius-range'),
  multiplyMod: require('./lib/multiply_mod'),
  powerMod: require('./lib/power_mod'),
  primeFactors: require('./lib/prime_factors'),
  primitiveRoot: require('./lib/primitive_root'),
  quadraticNonresidue: require('./lib/quadratic_nonresidue'),
  randomPrimitiveRoot: require('./lib/random_primitive_root'),
  sieve: require('./lib/sieve'),
  squareRootMod: require('./lib/square_root_mod'),
  squareRootModPrime: require('./lib/square_root_mod_prime'),
  totient: require('./lib/euler_phi'),
};
