$(function() {

  $('.js-feed-load').click(function() {

    var _this = this;

    $.ajax({
      url: '/data/catalog.html',
      data: {},
      success: function(response) {
        var $response = $(response);
        
        if ($response.length > 0) {
        
          $('.js-feed').append($response);
          $('.item.item__product').find('.item_order').css({bottom: $('.item.item__product').find('.item_caption').outerHeight()});  
        
        } else {
        
          $(_this).remove();
        
        }

      },
      error: function() {
        alert('Error load materials');
      }
    });

    return false;
  });

});