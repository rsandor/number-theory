'use strict';

var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = require('code').expect;

var NumberTheory = require('../index');

describe('isOctagonal', function() {
  var octagonals = [1, 8, 21, 40, 65, 96, 133, 176, 225, 280, 
    341, 408, 481, 560, 645, 736, 833, 936];
  var nonOctagonals = [5,100,47,107,1000,67];

  it('octagonals should return true', function(done) {
    for (var i in octagonals) {
      var numberIsOctagonal = NumberTheory.isOctagonal(octagonals[i]);
      expect(numberIsOctagonal).to.equal(true);
    };
    done();
  });

  it('non-octagonals should return false', function(done) {
    for (var i in nonOctagonals) {
      var numberIsOctagonal = NumberTheory.isOctagonal(nonOctagonals[i]);
      expect(numberIsOctagonal).to.equal(false);
    };
    done();
  });

})
