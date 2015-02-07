$(document).on('click', '.js-form-submit', function() {
  var validURL = $(this).closest('.js-form').data('url-valid');

  $.getJSON(validURL, function(data) {
    var items = [];

    $.each(data, function(key, val) {
      var $el = $('[name="' + key + '"]'); 


      $el.attr({'data-valid': 'false'});
      $el.closest('.js-form_el').after('<p class="form_el form_error">' + val + '</p>');


      $('.js-form').customForm();

    });
   
  });

  return false;
});