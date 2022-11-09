
$(document).ready(function() {
  // --- our code goes here ---

  $('#tweet-text').on('input', function() {
    const value = $(this).val();
    const counter = $(this).parent().children()[2].children['counter'];
    $(counter).val(140 - value.length)

    if ($(counter).val() < 0) {
      $(counter).addClass('neg-remainings');
    }
    if ($(counter).val() >= 0) {
      $(counter).removeClass('neg-remainings');
    }
  });
});

