//****************************************************************************************************
//
// .. READY
//
//****************************************************************************************************
$(function() {



  //****************************************************************************************************
  //
  // .. INITS
  //
  //****************************************************************************************************
  //
  // .. jQuery UI Sortable init
  //
  // $('.js-ui-nav-elements').sortable({
  //     connectWith: '.ui-section',
  //     placeholder: 'ui-placeholder',

  //     helper: function (e, li) {
  //       this.copyHelper = li.clone().insertAfter(li);
  //       $(this).data('copied', false);
  //       return li.clone();
  //     },

  //     stop: function () {
  //       var copied = $(this).data('copied');
  //       if (!copied) {
  //         this.copyHelper.remove();
  //       }
  //       this.copyHelper = null;
  //     }
  // });

  // $('.js-ui-section').sortable({
  //   placeholder: 'ui-placeholder',

  //   receive: function (e, ui) {
  //     ui.sender.data('copied', true);
  //   }
  // });

  $('.ui-toolbar div').draggable({
    helper: function(e) {
      return $('<div>').addClass('ui-block-drag').html( $(e.target).html() );
    },
    connectToSortable: ".ui-content"
  });
      
  $('.ui-content').sortable({
      placeholder: 'ui-placeholder',
      cancel: '.ui-disabled',
      update: function (event, ui) {
        
        var block = ui.item.data('block');
        var tpl = _.template($('#block-' + block).html())();

        var $item = ui.item;

        $item.html(tpl).raptor({
          bind: {
            enabling: function() {
              $item.addClass('ui-disabled');
            },
            cancel: function() {
              $item.removeClass('ui-disabled');
            }
          }
        });

      }
  });



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
  $(window).smartresize(function() {});
  
});



//****************************************************************************************************
//
// .. LOAD
//
//****************************************************************************************************
$(window).load(function() {});