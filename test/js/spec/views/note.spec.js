var $ = require('jquery');
var NoteCollection = require('../../../../src/js/collections/notes');
var NoteView = require('../../../../src/js/views/note');

describe('App.Views.Note', function() {
  before(function() {
    this.$fixture = $("<div id='note-view-fixture'></div>");
  });
  beforeEach(function() {
    this.$fixture.empty().appendTo($('#fixtures'));
    this.view = new NoteView({
      el: this.$fixture,
      collection: new NoteCollection()
    });
  });
  afterEach(function() {
    this.view.collection.reset();
  });
  after(function() {
    $('#fixtures').empty();
  });
  it('can render an empty note', function() {
    var $ersin = $('p.ersin');
    expect($ersin.text()).to.equal('Ersin');
  });
});
