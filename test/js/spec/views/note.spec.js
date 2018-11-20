var sinon = require('sinon/lib/sinon');
var assert = require('assert');
var $ = require('jquery');
var Router = require('../../../../src/js/routers/router');
var NoteCollection = require('../../../../src/js/collections/notes');
var Note = require('../../../../src/js/views/note');
var NoteView = require('../../../../src/js/views/note-view');
var NoteEdit = require('../../../../src/js/views/note-edit');

describe('app views note', function() {
  before(function() {
    this.$fixture = $("<div id='note-fixture'></div>");
  });

  beforeEach(function() {
    this.$fixture.empty().appendTo($('#fixtures'));
    this.view = new Note({
      el: this.$fixture,
      collection: new NoteCollection(),
      router: new Router()
    });
    this.view.$el.hide = sinon.spy();
    this.view.$el.show = sinon.spy();
  });

  afterEach(function() {
    this.view.collection.reset();
  });

  after(function() {
    $('#fixtures').empty();
  });

  describe('updateHomeView call', function() {
    it('hide the view', function() {
      this.view.router.trigger('updateHomeView');
      assert(this.view.$el.hide.called);
    });
  });

  describe('updateNoteView call', function() {
    it('with data {id: 1, action: view}', function() {
      this.view.render = sinon.spy();
      this.view.update = sinon.spy();
      this.view.router.trigger('updateNoteView', { id: 1, action: 'view' });
      expect(this.view.id).to.equal(1);
      assert(this.view.render.called);
      assert(this.view.update.called);
      assert(this.view.update.calledWith('view'));
      assert(this.view.$el.show.called);
    });

    it('with data {id: 2, action: edit}', function() {
      this.view.render = sinon.spy();
      this.view.update = sinon.spy();
      this.view.router.trigger('updateNoteView', { id: 2, action: 'edit' });
      expect(this.view.id).to.equal(2);
      assert(this.view.render.called);
      assert(this.view.update.called);
      assert(this.view.update.calledWith('edit'));
      assert(this.view.$el.show.called);
    });
  });

  describe('render call', function() {
    it('with empty note', function() {
      this.view.collection.add({});

      var $view = $('.nav-item.view');
      var $edit = $('.nav-item.edit');
      var $delete = $('.nav-item.delete');

      expect($view.text()).to.equal('View');
      expect($edit.text()).to.equal('Edit');
      expect($delete.text()).to.equal('Delete');
    });

    it('with a note', function() {
      this.view.collection.add({
        title: 'Backbone Test von Ersin',
        description: 'Das ist eine Backbone Test Description',
        author: 'Ersin Abaci',
        id: 0
      });

      var $title = $('.title');
      var $description = $('.description');
      var $author = $('.author');

      expect($title.text()).to.equal('Backbone Test von Ersin');
      expect($description.text()).to.equal(
        'Das ist eine Backbone Test Description'
      );
      expect($author.text()).to.equal('Ersin Abaci');
    });
  });

  describe('update call', function() {
    this.beforeEach(function() {
      this.view.noteView = new NoteView({});
      this.view.noteView.$el.show = sinon.spy();
      this.view.noteView.$el.hide = sinon.spy();
      this.view.noteEditView = new NoteEdit({});
      this.view.noteEditView.$el.hide = sinon.spy();
      this.view.noteEditView.$el.show = sinon.spy();
    });

    it('with the view parameter', function() {
      this.view.update('view');
      assert(this.view.noteView.$el.show.called);
      assert(this.view.noteEditView.$el.hide.called);
    });

    it('with the edit parameter', function() {
      this.view.update('edit');
      assert(this.view.noteView.$el.hide.called);
      assert(this.view.noteEditView.$el.show.called);
    });
  });
});
