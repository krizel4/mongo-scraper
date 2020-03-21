$(document).ready(function() {
  // // Grab articles as a json
  // $.getJSON('/headlines', (data) => {
  //     // for each one
  //     for (let i = 0; i < data.length; i++) {
  //         // display information on page
  //         $('#article').append(`<p data-d='${data[i]._id}'> ${data[i].title}<br /> ${data[i].link} </p>`);
  //     }
  // });

  // Pull articles

  // Notes
  $(document).on('click', '#unsave', () => {
    $('#notes').empty();
    const thisId = $(this).attr('data-id');
    // AJAX call for the article
    $.ajax({
      method: 'GET',
      url: `/unsave/${thisId}`
    }).then(function() {
      location.reload();
    })
  });

  $(document).on('click', '#note', () => {
      const thisId = $(this).attr('data-id');
      $('#modalSaveNote').attr('data-id', thisId)
      $('.notes').empty();

    $.ajax({
        type: 'GET',
        url: `/headline/${thisId}`
    }).then(function(dbHeadline){
        console.log(dbHeadline)
        const notes = dbHeadline.notes.length > 0 ? dbHeadline.notes : '';
        console.log(notes)
        if (notes !=='') {
            notes.forEach(note => {
                $('.notes').prepend(`<div>${note.text} <button class='btn'>X</button> </div><hr><br/>`);
                $('.delete').attr('data-id', note._id);
            })
        }
    })
    $('#noteMod').modal('show');
  });

// Button for saving an article
$(document).on('click', '#save', () => {
    const thisId = $(this).attr('data-id');
    $.ajax({
      type: 'PUT',
      url: `/headlines/save/${thisId}`
    }).then(function(){
      location.reload();
    });
  });

  // Delete an article
  $('.delete').on('click', () => {
    var thisId = $(this).attr('data-id');
    $.ajax({
      method: 'POST',
      url: '/headlines/delete/' + thisId
    }).done,
      data => {
        window.location = '/save';
      };
  });

  // Save note
  $('.saveNote').on('click', () => {
    var thisId = $(this).attr('data-id');
    if (!$('#noteText' + thisId).val()) {
      alert(`You can't leave this blank.`);
    } else {
      $.ajax({
        method: 'POST',
        url: '/notes/save/' + thisId,
        data: {
          text: $('#noteText' + thisId).val()
        }
      }).done,
        data => {
          // Log the response
          console.log(data);
          // Empty the notes section
          $('#noteText' + thisId).val('');
          $('.modalNote').modal('hide');
          window.location = '/save';
        };
    }
  });

  // Delete a note
  $('.deleteNote').on('click', () => {
    var noteId = $(this).attr('data-note-id');
    var articleId = $(this).attr('data-article-id');
    $.ajax({
      method: 'DELETE',
      url: '/notes/delete/' + noteId + '/' + articleId
    }).done,
      data => {
        console.log(data);
        $('.modalNote').modal('hide');
        window.location = '/save';
      };
  });
});

  // // Scrape for more news
  // $('#scrape').on('click', () => {
  //     $.ajax({
  //         method: 'GET',
  //         url: '/scrape',
  //     }).done, (data) => {
  //         console.log(data)
  //         window.location = '/'
  //     }
  // });

