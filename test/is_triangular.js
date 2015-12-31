'use strict';

var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = require('code').expect;

var NumberTheory = require('../index');

describe('isTriangular', function() {
  var triangulars = [0, 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66, 78, 
    91, 105, 120, 136, 153, 171, 190, 210, 231, 253, 276, 300, 325, 
    351, 378, 406];
  var nonTriangulars = [5,26,363,1765,2499,655,125,2117];

  it('triangulars should return true', function(done) {
    for (var i in triangulars) {
      var numberIsTriangular = NumberTheory.isTriangular(triangulars[i]);
      expect(numberIsTriangular).to.equal(true);
    };
    done();
  });

  it('non-triangulars should return false', function(done) {
    for (var i in nonTriangulars) {
      var numberIsTriangular = NumberTheory.isTriangular(nonTriangulars[i]);
      expect(numberIsTriangular).to.equal(false);
    };
    done();
  });

})
