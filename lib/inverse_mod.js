'use strict';

/**
 * Find an inverse for a modulo n.
 * See: http://en.wikipedia.org/wiki/Modular_multiplicative_inverse
 * @param {Number} a Integer relatively prime to n
 * @param {Number} n Integer modulus
 * @return an integer b so that a * b equv 1 mod n
 */
module.exports = function inverseMod(a, n) {
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
};
