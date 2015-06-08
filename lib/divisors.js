'use strict';

var factor = require('./factor');
var incMixed = require('./inc_mixed');

/**
 * Determines all of the divisors for a given number.
 * @param {Number} n Number for which to find the factors.
 * @return {Array} A list of all divisors for the given number.
 */
module.exports = function divisors(n) {
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
};
