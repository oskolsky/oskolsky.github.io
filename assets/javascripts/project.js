//****************************************************************************************************
//
// .. EVENTS
//
//****************************************************************************************************
//
// .. Product page: change size
//
$(document).on('click', '.product-card_size_i', function() {
  $('.product-card_size_i').removeClass('product-card_size_i__current');
  $(this).addClass('product-card_size_i__current');
  return false;
});

//
// .. Product item: change size
//
$(document).on('click', '.item_size_i', function() {
  $(this).siblings('.item_size_i').removeClass('item_size_i__current');
  $(this).addClass('item_size_i__current');

  var sku = $(this).data('sku');
  var $btn = $(this).closest('.item').find('.js-order-now');

  $btn.attr({'data-sky': sku});

  return false;
});

//
// .. FAQ
//
$(document).on('click', '.js-faq-toggle', function() {
  var $el = $(this).closest('.product-faq_i').find('.product-faq_i_answers');
  if ($el.is(':hidden')) {
    $el.slideDown();
    $(this).html('Close');
  } else {
    $el.slideUp();
    $(this).html('Read&nbsp;more');
  }
  $(document.body).trigger("sticky_kit:recalc");
  return false;
});

//
// .. FAQ
//
$(document).on('click', '.js-reviews-toggle', function() {
  var $el = $(this).closest('.product-reviews_i').find('.product-reviews_i_more');
  if ($el.is(':hidden')) {
    $el.slideDown();
    $(this).html('Close');
  } else {
    $el.slideUp();
    $(this).html('Read&nbsp;more');
  }
  $(document.body).trigger("sticky_kit:recalc");
  return false;
});

//
// .. Checkout
//
$(document).on('click', '.shipping', function() {
  $('.shipping__current').removeClass('shipping__current');
  $(this).addClass('shipping__current');
  return false;
});

$(document).on('click', '.payment', function() {
  $('.payment__current').removeClass('payment__current');
  $(this).addClass('payment__current');
  return false;
});

//
// .. Flash hide
//
$(document).on('click', '.js-flash-close', function() {
  $('#flash').slideUp(150);
  return false;
});

//
// .. Search toggle
//
$(document).on('click', '.js-search-toggle', function() {
  var $el = $('#search');
  if ($el.is(':hidden')) {
    $el.show();
    $el.find('input[type="text"]').focus();
  } else {
    $el.hide();
  }
  return false;
});

//
// .. Nav catalog dropdown
//
$(document).on('click', '.nav_i_a', function() {
  var $el = $(this).siblings('.nav-dropdown');
  if ($el.is(':hidden')) {
    $('.nav-dropdown').hide();
    $el.show();
    $('.nav_i_a').removeClass('nav_i_a__active');
    $(this).addClass('nav_i_a__active');
  } else {
    $el.hide();
    $(this).removeClass('nav_i_a__active');
  }
});



//****************************************************************************************************
//
// .. READY
//
//****************************************************************************************************
$(function() {

  //
  // .. Router init
  // .. app.js
  //
  new App.Router();

  //
  // .. OWL Carousel init
  // .. http://www.owlcarousel.owlgraphic.com/
  //
  $('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    navText: false,
    items: 1,
    autoplay: true,
    autoplayTimeout: 5000
  });

  //
  // .. Raty init
  // .. http://wbotelhos.com/raty/
  //
  $('.raty').each(function() {
    var _this = this;
    $(this).raty({
      starOff: '/assets/images/star-off.svg',
      starOn: '/assets/images/star-on.svg',
      score: $(_this).data('score'),
      readOnly: true
    });
  });

  //
  // .. Input masket init
  //
  $('.form_tx').find('.js-phone').mask('+44 (999) 999-99-99');

  //
  // .. Flash notify show
  //
  setTimeout(function() {
    $('#flash').slideDown(150);
  }, 1000);



  //****************************************************************************************************
  //
  // .. SCROLL
  //
  //****************************************************************************************************
  $(window).scroll(function() {});



  //****************************************************************************************************
  //
  // .. RESIZE
  //
  //****************************************************************************************************
  $(window).smartresize(function() {

    $(document.body).trigger("sticky_kit:recalc");

  });
  
});



//****************************************************************************************************
//
// .. LOAD
//
//****************************************************************************************************
$(window).load(function() {

  //
  // .. Set bottom attr for item order block
  //
  $('.item.item__product').find('.item_order').css({bottom: $('.item.item__product').find('.item_caption').outerHeight()});

  //
  // .. Sticky-Kit init
  // .. http://leafo.net/sticky-kit/
  //
  $('#product-nav').stick_in_parent({
    parent: '#main'
  });
  
});