$(function() {

  var $menu = $('.js-menu');

  $('.js-menu-toggle').on('click', function() {
    $menu.show().addClass('animated zoomIn');
    return false;
  });

  // $(document).not('.js-menu').on('click', function() {
  //   alert(1);
  //   $menu.addClass('animated zoomOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
  //     $(this).hide();
  //   });
  //   return false;
  // })

});