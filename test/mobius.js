'use strict';

var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var Code = require('code');
Code.settings.comparePrototypes = false;
var expect = Code.expect;

var mobius = require('../index').mobius;

describe('mobius', function () {
  // First 77 values of the mobius function:
  // See: https://oeis.org/A008683
  var values = [
    0, 1, -1, -1, 0, -1, 1, -1, 0, 0, 1, -1, 0, -1, 1, 1, 0, -1, 0, -1,
    0, 1, 1, -1, 0, 0, 1, 0, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, 1, 1,
    0, -1, -1, -1, 0, 0, 1, -1, 0, 0, 0, 1, 0, -1, 0, 1, 0, 1, 1,
    -1, 0, -1, 1, 0, 0, 1, -1, -1, 0, 1, -1, -1, 0, -1, 1, 0, 0, 1
  ];

  for (var ii = 0; ii < 78; ii++) {
    (function(i) {
      it('computes mu(' + i + ')', function (done) {
        expect(mobius(i)).to.deep.equal(values[i]);
        done();
      });
    }(ii));
  }
});
