var $ = require('jquery');
var sinon = require('sinon/lib/sinon');
var assert = require('assert');
var NoteEdit = require('../../../../src/js/views/note-edit');
var NoteModels = require('../../../../src/js/models/note');
describe('app views note edit', function() {
  before(function() {
    this.$fixture = $('<div id="note-edit-fixture"></div>');
  });
  beforeEach(function() {
    this.$fixture.empty().appendTo($('#fixtures'));
    this.model = new NoteModels({
      title: 'Unit Test Practis',
      description: 'How to write clean code.',
      author: 'Ersin Abaci',
      id: 1
    });
    this.view = new NoteEdit({
      el: this.$fixture,
      model: this.model
    });
  });
  afterEach(function() {
    this.view.model.destroy();
  });
  after(function() {
    $('#fixtures').empty();
  });
  it('initialize call', function() {
    this.view.render = sinon.spy();
    this.view.initialize({
      model: this.model
    });
    expect(this.view.model).to.be.equal(this.model);
    expect(this.view.model.get('title')).to.be.equal(this.model.get('title'));
    expect(this.view.model.get('description')).to.be.equal(
      this.model.get('description')
    );
    expect(this.view.model.get('author')).to.be.equal(this.model.get('author'));
    expect(this.view.model.get('id')).to.be.equal(this.model.get('id'));
    assert(this.view.render.called);
  });
  it('render call', function() {});
  it('saveTitle call', function() {
    this.view.$el.find('input').trigger('change');
  });
  it('saveDescription call', function() {
    this.view.$el.find('textarea').trigger('change');
  });
});
