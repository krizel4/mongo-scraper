$(document).ready(function() {
const headlines = $('.headlines');

initPage();

function initPage() {
  headline.empty();
  $.get('api/headlines?saved=true').then(function(data) {
    if (data && data.length) {
      renderHeadlines(data);
    }
  })
}

// Button that saves articles

// Button that removes articles

// Button that allows a comment to be added

// Button that allows comment to be deleted

});