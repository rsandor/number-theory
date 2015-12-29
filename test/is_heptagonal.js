'use strict';

var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = require('code').expect;

var NumberTheory = require('../index');

describe('isHeptagonal', function() {
  var heptagonals = [1, 7, 18, 34, 55, 81, 112, 148, 189, 235, 
    286, 342, 403, 469, 540, 616, 697, 783, 874, 970, 1071, 
    1177, 1288, 1404, 1525, 1651, 1782];
  var nonHeptagonals = [5,100,47,107,1000,66];

  it('heptagonals should return true', function(done) {
    for (var i in heptagonals) {
      var numberIsHeptagonal = NumberTheory.isHeptagonal(heptagonals[i]);
      expect(numberIsHeptagonal).to.equal(true);
    };
    done();
  });

  it('non-heptagonals should return false', function(done) {
    for (var i in nonHeptagonals) {
      var numberIsHeptagonal = NumberTheory.isHeptagonal(nonHeptagonals[i]);
      expect(numberIsHeptagonal).to.equal(false);
    };
    done();
  });

})
