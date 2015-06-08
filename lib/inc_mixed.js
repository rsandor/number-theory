'use strict';

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
module.exports = function incMixed(tuple, bases) {
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
};
