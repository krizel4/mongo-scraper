$(document).ready(function() {
const headlines = $('.headlines');

$(document).on('click', '.btn.delete', handleHeadlineDelete);
$(document).on('click', '.btn.note', handleHeadlineNote);
$(document).on('click', '.btn.save', handleNoteSave);
$(document).on('click', '.btn.note-delete', handleNoteDelete);

initPage();

function initPage() {
  headline.empty();
  $.get('api/headlines?saved=true').then(function(data) {
    if (data && data.length) {
      renderHeadlines(data);
    }
  })
}

function handleHeadlineDelete() {
  const headlineDelete = $(this).parents.('.panel').data();
  $.ajax({
    method: DELETE

  })
}

});