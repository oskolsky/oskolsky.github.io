$(document).ready(function() {

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
});
