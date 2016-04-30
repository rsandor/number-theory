'use strict';

var miller = require('./miller');

module.exports = function mobiusRange (n1, n2, primalityTest) {
  var i, j, i1, i2, p, k, sqrt;
  var n = n2 - n1;
  var A = new Array(n);

  primalityTest = primalityTest || miller;

  // Initialize the output array to all ones:
  for (i = 0; i < n; i++) {
    A[i] = 1;
  }

  sqrt = Math.ceil(Math.sqrt(n2));

  // Loop over 0 to ~sqrt(n2) and only act if p is prime:
  for (p = 2; p < sqrt; p++) {
    if (p < n1) {
      // If below the lower bound of our range, we're not directly
      // sieving, so use an external primality test:
      if (!primalityTest(p)) {
        continue;
      }
    } else if (A[p - n1] !== 1) {
      // If within our range, we're implicitly sieving as we go,
      // so !== 1 is sufficient to determine that p is not prime.
      continue;
    }

    // Compute the limits relative to the prime:
    i1 = Math.ceil(n1 / p);
    i2 = Math.ceil(n2 / p);

    for (i = i1; i < i2; i++) {
      k = i * p;
      if (i % p === 0) {
        A[k - n1] = 0;
      } else {
        A[k - n1] *= -p;
      }
    }
  }

  // Analyze the results and assign values:
  for (i = 0; i < n; i++) {
    if (A[i] === n1 + i) {
      A[i] = 1;
    } else if (A[i] === -n1 - i) {
      A[i] = -1;
    } else if (A[i] < 0) {
      A[i] = 1;
    } else if (A[i] > 0) {
      A[i] = -1;
    } else {
      // If the above isn't true, then this must be the case,
      // but we'll assign explicitly to avoid negative zeros:
      A[i] = 0;
    }
  }

  // Handle a boundary condition when n1 === 0:
  if (n1 === 0 && n2 > 0) {
    A[0] = 0;
  }

  return A;
}
