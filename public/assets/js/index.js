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
$(document).on('click', 'p', () => {
    $('#notes').empty();
    const thisId = $(this).attr('data-id');

// AJAX call for the article
$.ajax({
    method: 'GET',
    url: '/headlines/' + thisId
}).then(function(data) {
    console.log(data);
    $('#notes').append(`<h2>${data.title}</h2>`);
    $('#notes').append(`<input id='titleinput' name='title>`);
    $('#notes').append(`<textarea id='bodyinput' name='body'></textarea>`);
    $('#notes').append(`<button data-id='${data._id}' id='savenote'>Save note</button>`);

    // If there's a note in the article
    if (data.note) {
        $('#titleinput').val(data.note.title);
        $('bodyinput').val(data.note.body);
    }
});
});

// When you click the savenote button
$(document).on('click', '#savenote', () => {
    const thisId = $(this).attr('data-id');

    // Run POST request to update note
    $.ajax({
        method: 'POST',
        url: `/articles/${thisId}`,
        data: {
            title: $('#titleinput').val(),
            body: $('#bodyinput').val()
        }
    }).then(function() {
        console.log(data);
        $('#notes').empty;
    });

    // Remove values entered in input and textarea for note entry
    $('#titleinput').val('');
    $('#bodyinput').val('');

})

// $(document).ready(function () {

// const divContainer = $('.div-container');
// initializePage();

// function initializePage() {
//     divContainer.empty()
//     $.get('/headlines?saved=false')
//     .then(function(data) {
//         if (data && data.length) {
//             initializePage(data);
//         } else {
//             renderEmpty();
//         }
//     })
// }

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

// // Button for saving an article
// $('.save').on('click', () => {
//     const thisId = $(this).attr('dataID');
//     $.ajax({
//         method: 'POST',
//         url: '/headlines/save/' + thisId
//     }).done, (data) => {
//         window.location = '/'
//     }
// });

// // Delete an article
// $('.delete').on('click', () => {
//     var thisId = $(this).attr('data-id');
//     $.ajax({
//         method: 'POST',
//         url: '/headlines/delete/' + thisId
//     }).done, (data) => {
//         window.location = '/saved'
//     }
// });

// // Save note
// $('.saveNote').on('click', () => {
//     var thisId = $(this).attr('data-id');
//     if (!$('#noteText' + thisId).val()) {
//         alert(`You can't leave this blank.`)
//     } else {
//         $.ajax({
//             method: 'POST',
//             url: '/notes/save/' + thisId,
//             data: {
//                 text: $('#noteText' + thisId).val()
//             }
//         }).done, (data) => {
//             // Log the response
//             console.log(data);
//             // Empty the notes section
//             $('#noteText' + thisId).val('');
//             $('.modalNote').modal('hide');
//             window.location = '/saved'
//         };
//     }
// });

// // Delete a note
// $('.deleteNote').on('click', () => {
//     var noteId = $(this).attr('data-note-id');
//     var articleId = $(this).attr('data-article-id');
//     $.ajax({
//         method: 'DELETE',
//         url: '/notes/delete/' + noteId + '/' + articleId
//     }).done, (data) => {
//         console.log(data)
//         $('.modalNote').modal('hide');
//         window.location = '/saved'
//     }
// });
// });