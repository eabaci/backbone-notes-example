var app = require('../../../src/js/namespace');
var chai = require('chai');
var expect = chai.expect;
describe('Namespace', function() {
  it('provides the app object', function() {
    expect(app).to.be.an('object');
  });
});
