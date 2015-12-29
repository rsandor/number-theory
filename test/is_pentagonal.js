'use strict';

var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = require('code').expect;

var NumberTheory = require('../index');

describe('isPentagonal', function() {
  var pentagonals = [1, 5, 12, 22, 35, 51, 70, 92, 117, 145, 176, 
    210, 247, 287, 330, 376, 425, 477, 532, 590, 651, 715, 782, 
    852, 925, 1001];
  var nonPentagonals = [7,100,47,107,1000,67];

  it('pentagonals should return true', function(done) {
    for (var i in pentagonals) {
      var numberIsPentagonal = NumberTheory.isPentagonal(pentagonals[i]);
      expect(numberIsPentagonal).to.equal(true);
    };
    done();
  });

  it('non-pentagonals should return false', function(done) {
    for (var i in nonPentagonals) {
      var numberIsPentagonal = NumberTheory.isPentagonal(nonPentagonals[i]);
      expect(numberIsPentagonal).to.equal(false);
    };
    done();
  });

})
