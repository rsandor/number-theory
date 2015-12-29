'use strict';

var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = require('code').expect;

var NumberTheory = require('../index');

describe('isHexagonal', function() {
  var hexagonals = [1, 6, 15, 28, 45, 66, 91, 120, 153, 190, 231, 
    276, 325, 378, 435, 496, 561, 630, 703, 780, 861, 946];
  var nonHexagonals = [5,100,47,107,1000,67];

  it('hexagonals should return true', function(done) {
    for (var i in hexagonals) {
      var numberIsHexagonal = NumberTheory.isHexagonal(hexagonals[i]);
      expect(numberIsHexagonal).to.equal(true);
    };
    done();
  });

  it('non-hexagonals should return false', function(done) {
    for (var i in nonHexagonals) {
      var numberIsHexagonal = NumberTheory.isHexagonal(nonHexagonals[i]);
      expect(numberIsHexagonal).to.equal(false);
    };
    done();
  });

})
