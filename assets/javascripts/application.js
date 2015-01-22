//****************************************************************************************************
//
// .. INIT
//
//****************************************************************************************************
//
// .. arcticModal
//
$.arcticmodal('setDefault', {
  overlay: {
    css: {
      backgroundColor: '#282828',
      opacity: 0.95
    }
  },
  openEffect: {
    speed: 200
  },
  closeEffect: {
    speed: 200
  },
  afterClose: function() {
    window.location.href = window.location.href.split('!')[0];
  }
});

//
// .. Accounting
//
accounting.settings = {
  currency: {
    decimal: '.',
    thousand: ' ',
    precision: 2
  },
  number: {
    decimal : '.',
    thousand: ' ',
    precision: 0
  }
};



//****************************************************************************************************
//
// .. FUNCTIONS
//
//****************************************************************************************************
//
// .. Accounting
//
function formatNumber() {
  $('.format-number').each(function() {
    var
      number = parseInt($(this).text().replace(new RegExp(' ', 'g'), '')),
      formatNumber = accounting.formatNumber(number);

    $(this).text(formatNumber);
  });
}

function formatMoney() {
  $('.format-money').each(function() {
    var c = accounting.settings.currency;

    if ($(this).hasClass('format-money__ru')) {
      c.format = '%v .–';
      c.precision = 0;
    } else if ($(this).hasClass('format-money__us')) {
      c.symbol = '$';
      c.format = '%s %v';
      c.precision = 2;
    } else if ($(this).hasClass('format-money__eu')) {
      c.symbol = '€';
      c.format = '%s %v';
      c.precision = 2;
    } else if ($(this).hasClass('format-money__uk')) {
      c.symbol = '₤';
      c.format = '%s %v';
      c.precision = 2;
    }

    var
      money = parseFloat($(this).text().replace(new RegExp(' ', 'g'), '')),
      formatMoney = accounting.formatMoney(money);
    
    $(this).text(formatMoney);    
  });
}



//****************************************************************************************************
//
// .. EVENTS
//
//****************************************************************************************************
//
// .. Open dialog
//
$(document).on('click touchstart', '[data-dialog="open"]', function() {
  var url = $(this).data('url');

  $.arcticmodal('close');

  $.arcticmodal({
    type: 'ajax',
    url: url
  });
  
  return false;
});

//
// .. Close dialog
//
$(document).on('click touchstart', '[data-dialog="close"]', function() {
  $.arcticmodal('close');
  return false;
});



//****************************************************************************************************
//
// .. READY
//
//****************************************************************************************************
$(function() {

  //****************************************************************************************************
  //
  // .. DOUBLE HOVER
  //
  //****************************************************************************************************
  doubleHover('.double-hover', 'hover');



  //****************************************************************************************************
  //
  // .. FORMS
  // .. $('#checkbox').customForm() to init single element; $('body').customForm() to init all elements
  //
  //****************************************************************************************************
  $('.js-form').customForm();



  //****************************************************************************************************
  //
  // .. ACCOUNTING
  //
  //****************************************************************************************************
  formatNumber();
  formatMoney();
  


  //****************************************************************************************************
  //
  // .. RESIZE
  //
  //****************************************************************************************************
  $(window).smartresize(function() {

    // $('#header').stickyHeader();
    $('#footer').stickyFooter();

  });
  
});



//****************************************************************************************************
//
// .. LOAD
//
//****************************************************************************************************
$(window).load(function() {

  // $('#header').stickyHeader();
  $('#footer').stickyFooter();

});