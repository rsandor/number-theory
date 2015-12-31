'use strict';

var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = require('code').expect;

var NumberTheory = require('../index');

describe('isSquare', function() {
  var squares = [0, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 
    169, 196, 225, 256, 289, 324, 361, 400, 441, 484, 529, 576, 625, 
    2401, 2500];
  var nonSquares = [5,26,363,1765,2499,655,125,2117];

  it('squares should return true', function(done) {
    for (var i in squares) {
      var numberIsSquare = NumberTheory.isSquare(squares[i]);
      expect(numberIsSquare).to.equal(true);
    };
    done();
  });

  it('non-squares should return false', function(done) {
    for (var i in nonSquares) {
      var numberIsSquare = NumberTheory.isSquare(nonSquares[i]);
      expect(numberIsSquare).to.equal(false);
    };
    done();
  });

})
