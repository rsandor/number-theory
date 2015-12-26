'use strict';

var divisors = require('./divisors');

/**
  * Determines whether an integer is 'perfect'.
  * @param {Number} an integer x to test
  * @return {Boolean} Whether or not x is perfect.
  * @module number-theory
  * @author Kelly Innes
  */

module.exports = function isDeficient(n) {
  var divisorsOfNumber = divisors(n);
  divisorsOfNumber.pop(); // to remove n and leave the 'proper divisors'
  var sumOfDivisors = divisorsOfNumber.reduce(function(a,b) { 
    return a + b
  });
  console.log(sumOfDivisors)
  return n === sumOfDivisors;
};
