'use strict';

var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var Code = require('code');
Code.settings.comparePrototypes = false;
var expect = Code.expect;

var mobiusRange = require('../index').mobiusRange;

describe('mobiusRange', function () {
  // First fifty values of the mobius function:
  // See: https://oeis.org/A008683
  var values = [
    0, 1, -1, -1, 0, -1, 1, -1, 0, 0, 1, -1, 0, -1, 1, 1, 0, -1, 0, -1,
    0, 1, 1, -1, 0, 0, 1, 0, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, 1, 1,
    0, -1, -1, -1, 0, 0, 1, -1, 0, 0, 0, 1, 0, -1, 0, 1, 0, 1, 1,
    -1, 0, -1, 1, 0, 0, 1, -1, -1, 0, 1, -1, -1, 0, -1, 1, 0, 0, 1
  ];

  describe('over all possible ranges in [0, 78]', function () {
    for (var jj = 0; jj < 78; jj++) {
      for (var ii = 0; ii <= jj; ii++) {
        (function(i, j) {
          it('computes the mobius function from ' + i + ' to ' + j, function (done) {
            expect(mobiusRange(i, j)).to.deep.equal(values.slice(i, j));
            done();
          });
        }(ii, jj));
      }
    }
  });

  // Computed from wolfram alpha:
  it('computes mobius from 1000000 to 1000005', function (done) {
    expect(mobiusRange(1000000, 1000005)).to.deep.equal([0, 1, -1, -1, 0])
    done();
  });

});
