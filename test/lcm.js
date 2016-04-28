'use strict';

var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = require('code').expect;

var lcm = require('../index').lcm;

describe('lcm', function () {
  var pairs = [
    { a: 5, b: 2, l: 10 },
    { a: 4, b: 6, l: 12 },
    { a: 21, b: 6, l: 42 },
    { a: 12345, b: 67890, l: 55873470 },
  ];

  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i];
    expect(lcm(pair.a, pair.b)).to.equal(pair.l);
  }
});
