'use strict';

var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = require('code').expect;

var NumberTheory = require('../index');

describe('isAbundant', function () {
  var abundants = [12, 18, 20, 24, 30, 36, 40, 42, 48, 54, 
    56, 60, 66, 70, 72, 78, 80, 84, 88, 90, 96, 100, 102, 
    104, 108, 112, 114, 120];
  var nonAbundants = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 13, 14, 15, 
    16, 17, 19, 21, 22, 23, 25, 26, 27, 29, 31, 32, 33, 34, 35, 
    37, 38, 39, 41, 43, 44, 45, 46, 47, 49, 50];

  it('abundant numbers should return true', function(done) {
    for (var i in abundants) {
      var numberIsAbundant = NumberTheory.isAbundant(abundants[i]);
      expect(numberIsAbundant).to.equal(true);
    };
    done();
  });

  it('nonabundant numbers should return false', function(done) {
    for (var i in nonAbundants) {
      var numberIsAbundant = NumberTheory.isAbundant(nonAbundants[i]);
      expect(numberIsAbundant).to.equal(false);
    };
    done();
  });

})
