var Backbone = require('backbone');
var NotesCollection = require('./collections/notes');
var Note = require('./views/note');
var Router = require('./routers/router');
var NotesList = require('./views/notes');
var app = require('./namespace');

Backbone.$(function() {
  app.collection = new NotesCollection();
  app.router = new Router({});
  app.noteslistView = new NotesList({});
  app.noteView = new Note({});

  app.collection.once('reset', function() {
    Backbone.history.start();
  });

  app.collection.fetch({ reset: true });
});
