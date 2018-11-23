var sinon = require('sinon/lib/sinon');
var assert = require('assert');
var $ = require('jquery');
var NotesNavView = require('../../../../src/js/views/note-nav');
var Router = require('../../../../src/js/routers/router');
var NoteModels = require('../../../../src/js/models/note');

describe('app views note nav', function() {
  before(function() {
    this.$fixture = $("<div id='note-nav-fixture'></div>");
  });
  beforeEach(function() {
    this.router = new Router();
    this.model = new NoteModels({
      title: 'Unit Test Practis',
      description: 'How to write clean code.',
      author: 'Ersin Abaci',
      id: 22
    });
    this.view = new NotesNavView({
      el: this.$fixture,
      router: this.router,
      model: this.model
    });
    this.view.router.navigate = sinon.spy();
    this.view.model.destroy = sinon.spy();
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
      router: this.router,
      model: this.model
    });
    expect(this.view.router).to.be.equal(this.router);
    expect(this.view.model).to.be.equal(this.model);
    assert(this.view.render.called);
  });

  it('render call', function() {
    this.view.$el.html = sinon.spy();
    this.view.render();
    assert(this.view.$el.html.called);
  });

  it('trigger the click event on the back element', function() {
    this.view.$el.find('.back').trigger('click');
    assert(this.view.router.navigate.called);
    assert(this.view.router.navigate.calledWith('', { trigger: true }));
  });

  it('trigger the click event on the view element', function() {
    this.view.$el.find('.view').trigger('click');
    assert(this.view.router.navigate.called);
    assert(
      this.view.router.navigate.calledWith(
        'note/' + this.view.model.get('id') + '/view',
        { trigger: true }
      )
    );
  });

  it('trigger the click event on the edit element', function() {
    this.view.$el.find('.edit').trigger('click');
    assert(this.view.router.navigate.called);
    assert(
      this.view.router.navigate.calledWith(
        'note/' + this.view.model.get('id') + '/edit',
        { trigger: true }
      )
    );
  });

  it('trigger the click event on the delete element', function() {
    this.view.$el.find('.delete').trigger('click');
    assert(this.view.router.navigate.called);
    assert(this.view.router.navigate.calledWith('', { trigger: true }));
    expect(this.view.model).to.be.an('object');
    assert(this.view.model.destroy.called);
  });
});
