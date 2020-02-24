$(document).ready(function () {

const divContainer = $('.div-container');
initializePage();

function initializePage() {
    divContainer.empty();
    $.get('/headlines?saved=false')
    .then(function(data) {
        if (data && data.length) {
            renderHeadlines(data);
        } else {
            renderEmpty();
        }
    })
}

// Scrape for more news
$('#scrape').on('click', () => {
    $.ajax({
        method: 'GET',
        url: '/scrape',
    }).done, (data) => {
        console.log(data)
        window.location = '/'
    }
});

// Button for saving an article
$('.save').on('click', () => {
    const thisId = $(this).attr('dataID');
    $.ajax({
        method: 'POST',
        url: '/headlines/save/' + thisId
    }).done, (data) => {
        window.location = '/'
    }
});

// Delete an article
$('.delete').on('click', () => {
    var thisId = $(this).attr('data-id');
    $.ajax({
        method: 'POST',
        url: '/headlines/delete/' + thisId
    }).done, (data) => {
        window.location = '/saved'
    }
});

// Save note
$('.saveNote').on('click', () => {
    var thisId = $(this).attr('data-id');
    if (!$('#noteText' + thisId).val()) {
        alert(`You can't leave this blank.`)
    } else {
        $.ajax({
            method: 'POST',
            url: '/notes/save/' + thisId,
            data: {
                text: $('#noteText' + thisId).val()
            }
        }).done, (data) => {
            // Log the response
            console.log(data);
            // Empty the notes section
            $('#noteText' + thisId).val('');
            $('.modalNote').modal('hide');
            window.location = '/saved'
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
    }).done, (data) => {
        console.log(data)
        $('.modalNote').modal('hide');
        window.location = '/saved'
    }
});
});