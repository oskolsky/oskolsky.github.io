$(document).ready(function() {

    // Mask input
    $('.js-input-phone').mask('+7 (999) 999-9999');

    // Footer toggle text
    $('#js-footer-toggle').on('click', function() {
        var $el = $('#js-footer-decription');
        var isVisibleClass = 'isVisible';
        var isToggleClass = 'isToggle';

        if ($el.hasClass(isVisibleClass)) {
            $el.removeClass(isVisibleClass);
            $(this).removeClass(isToggleClass);
        } else {
            $el.addClass(isVisibleClass);
            $(this).addClass(isToggleClass);
        }

        return false;
    });

    // Owl Carousel init
    $('.js-owl-carousel').owlCarousel({
        items: 1,
        loop: true,
        margin: 10,
        nav: true,
        navText: '',
    });

    // Filter toggle
    $('#js-filter-toggle').on('click', function() {
        var $el = $('#js-filter');
        var isToggleClass = 'isToggle';

        if ($el.hasClass(isToggleClass)) {
            $el.removeClass(isToggleClass);
        } else {
            $el.addClass(isToggleClass);
        }

        return false;
    });
});
