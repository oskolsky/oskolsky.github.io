$(function() {

    $('.js-menu-toggle').on('click', function() {

        var $menu = $('.js-menu');

        if ($menu.is(':hidden')) {

            $(this).addClass('ui-menu-toggle__active');
            $menu.show().removeClass('zoomOut').addClass('zoomIn');

        } else {

            $(this).removeClass('ui-menu-toggle__active');

            $menu.removeClass('zoomIn').addClass('zoomOut');
            $menu.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                $(this).hide();
            });

        }

        return false;
    });

    $(document).click(function(event) {
        if (!$(event.target).closest('.js-menu').length) {

            var $menu = $('.js-menu');

            $('.js-menu-toggle').removeClass('ui-menu-toggle__active');

            $menu.removeClass('zoomIn').addClass('zoomOut');
            $menu.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                $(this).hide();
            });

        }

        return false;
    });

});