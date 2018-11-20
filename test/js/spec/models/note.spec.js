var chai = require('chai');
var expect = chai.expect;
var NoteModels = require('../../../../src/js/models/note');

describe('app.Models.Note', function() {
  it('has default values', function() {
    //   Create empty note model
    var model = new NoteModels({});
    expect(model).to.be.ok;
    expect(model).to.be.an('object');
    expect(model.get('title')).to.equal('');
    expect(model.get('description')).to.equal('');
    expect(model.get('author')).to.equal('');
  });

  it('sets passed attributes', function() {
    //   Create empty note model
    var model = new NoteModels({
      title: 'Unit Testing',
      description: '...',
      author: 'Narisa Abaci',
      id: 22
    });

    expect(model).to.be.ok;
    expect(model).to.be.an('object');
    expect(model.get('title')).to.equal('Unit Testing');
    expect(model.get('description')).to.contain('...');
    expect(model.get('author')).to.equal('Narisa Abaci');
    expect(model.get('id')).to.equal(22);
  });
});
