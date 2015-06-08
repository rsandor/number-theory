'use strict';

var gcd = require('./gcd');

/**
 * Given composite x with a small prime factor, Pollard's rho
 * algorithm often finds the small factor quickly.
 *
 * Modified from
 * http://userpages.umbc.edu/~rcampbel/NumbThy/Class/Programming/JavaScript
 *
 * @param {Number} a number x
 * @return {Number} a number dividing x (possibly 1).
 * @module number-theory
 * @author Jim Fowler
 */
module.exports = function findDivisor(x) {
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
};
