'use strict';

var divisors = require('./divisors');

/**
  * Determines whether an integer is 'abundant'.
  * @param {Number} an integer x to test
  * @return {Boolean} Whether or not x is abundant.
  * @module number-theory
  * @author Kelly Innes
  */

module.exports = function isAbundant(n) {
  var divisorsOfNumber = divisors(n);
  divisorsOfNumber.pop(); // to remove n and leave the 'proper divisors'
  var sumOfDivisors = divisorsOfNumber.reduce(function(a,b) { 
    return a + b
  });
  return n < sumOfDivisors;
};
