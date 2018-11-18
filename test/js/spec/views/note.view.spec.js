var $ = require('jquery');
var NoteModels = require('../../../../src/js/models/note');
var NoteView = require('../../../../src/js/views/note-view');

describe('App.Views.Note2', function() {
  before(function() {
    this.$fixture = $("<div id='note-view-fixture'></div>");
  });
  beforeEach(function() {
    this.$fixture.empty().appendTo($('#fixtures'));
    this.view = new NoteView({
      el: this.$fixture,
      model: new NoteModels()
    });
  });
  afterEach(function() {
    this.view.model.clear();
  });
  after(function() {
    $('#fixtures').empty();
  });
  it('can render an empty note', function() {
    var $title = this.$fixture.find('.title');
    var $author = this.$fixture.find('.author');
    var $description = this.$fixture.find('.description');

    expect($title.text()).to.equal('Backbone Test');
    expect($author.text()).to.equal('Ersin Abaci');
    expect($description.text()).to.equal(
      'Das ist eine Backbone Test Description'
    );
  });

  it('can render more complicated markdown', function() {});
});
