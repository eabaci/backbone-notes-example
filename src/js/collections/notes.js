var Backbone = require('backbone');
var LocalStorage = require('backbone.localStorage');
var NoteModels = require('../models/note');
var Config = require('../config');

var NotesCollection = Backbone.Collection.extend({
  model: NoteModels,
  localStorage: new Backbone.LocalStorage(Config.storeName)
});

module.exports = NotesCollection;
